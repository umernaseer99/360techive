import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form endpoint.
 *
 * The form used to build a `mailto:` link and hand it to the browser, which
 * meant the message only ever left the building if the visitor had a mail
 * client configured and then pressed send themselves. In practice it opened
 * webmail with a half encoded draft and most enquiries were lost. This sends
 * the mail from the server instead.
 *
 * Configuration comes from the environment, so no credentials live in the
 * repository:
 *
 *   SMTP_HOST      mail server hostname
 *   SMTP_PORT      465 for implicit TLS, 587 for STARTTLS (default 587)
 *   SMTP_USER      mailbox login
 *   SMTP_PASS      mailbox password
 *   CONTACT_TO     where enquiries are delivered (defaults to SMTP_USER)
 *   CONTACT_FROM   envelope sender (defaults to SMTP_USER)
 *
 * The From address must be a mailbox the SMTP server is allowed to send as.
 * The visitor's address goes in Reply-To instead, so hitting reply answers
 * them while SPF and DKIM still pass.
 */

export const runtime = "nodejs";

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  company: 160,
  projectType: 80,
  timeline: 80,
  message: 5000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Crude per address rate limit. One process holds this, so it resets on
 * deploy and does not coordinate across instances. That is acceptable: it
 * exists to blunt a script hammering the endpoint, not as a security control.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see. Answer 200 so
  // a bot cannot tell it was rejected.
  if (clean(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: clean(payload.name, MAX_LENGTHS.name),
    email: clean(payload.email, MAX_LENGTHS.email),
    company: clean(payload.company, MAX_LENGTHS.company),
    projectType: clean(payload.projectType, MAX_LENGTHS.projectType),
    timeline: clean(payload.timeline, MAX_LENGTHS.timeline),
    message: clean(payload.message, MAX_LENGTHS.message),
  };

  if (!data.name || !EMAIL.test(data.email) || data.message.length < 20) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  if (rateLimited(forwarded.split(",")[0].trim() || data.email)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Told apart from a send failure so the form can say something accurate.
    console.error("[contact] SMTP is not configured; enquiry not sent");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT ?? 587);

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Project type", data.projectType],
    ["Timeline", data.timeline],
  ];
  const details = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const text = `${details}\n\nAbout the project\n\n${data.message}\n`;

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `${data.name} <${data.email}>`,
      subject: `New project enquiry from ${data.name}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // The reason stays in the server log. The visitor gets a fallback address,
    // never an SMTP error containing host or account detail.
    console.error("[contact] send failed:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
