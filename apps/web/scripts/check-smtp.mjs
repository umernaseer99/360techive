/**
 * Checks SMTP credentials without sending anything, then optionally sends one
 * test message.
 *
 *   node scripts/check-smtp.mjs              # connect and authenticate only
 *   node scripts/check-smtp.mjs --send       # also send one real message
 *
 * Run it on the server, in the same shell the app runs in, so it reads exactly
 * the environment the app will read. Guessing at credentials through the
 * contact form tells you only that something failed; this tells you what.
 */
import nodemailer from "nodemailer";
import { readFileSync } from "node:fs";

// Load a .env sitting next to the app, if there is one. Values already in the
// environment win, since that is what the running process would see.
try {
  for (const line of readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // no .env, environment only
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Not configured. Missing: ${missing.join(", ")}`);
  process.exit(1);
}

const port = Number(SMTP_PORT ?? 587);
const secure = port === 465;

console.log(`host   ${SMTP_HOST}:${port} ${secure ? "(implicit TLS)" : "(STARTTLS)"}`);
console.log(`user   ${SMTP_USER}`);
console.log(`from   ${CONTACT_FROM || SMTP_USER}`);
console.log(`to     ${CONTACT_TO || SMTP_USER}\n`);

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transport.verify();
  console.log("connection and login: OK");
} catch (error) {
  console.error("connection or login FAILED:", error.message);
  // The common causes, so the message is actionable rather than just a code.
  if (/invalid login|535|authentication/i.test(error.message)) {
    console.error(
      "\nThe server rejected the credentials. With Gmail this normally means an\n" +
        "account password was used instead of an App Password. With other providers\n" +
        "check whether the username is the full address or just the local part."
    );
  }
  if (/ECONNREFUSED|ETIMEDOUT|ENOTFOUND/i.test(error.message)) {
    console.error(
      "\nCould not reach the server. Check the hostname and port, and whether the\n" +
        "host firewall allows outbound SMTP: many providers block port 25, and some\n" +
        "block 465 and 587 until you ask them to open it."
    );
  }
  if (/self signed|certificate/i.test(error.message)) {
    console.error(
      "\nThe server's TLS certificate did not validate. Use the hostname the\n" +
        "certificate is issued for rather than an IP address or an alias."
    );
  }
  process.exit(1);
}

if (process.argv.includes("--send")) {
  const info = await transport.sendMail({
    from: CONTACT_FROM || SMTP_USER,
    to: CONTACT_TO || SMTP_USER,
    subject: "360 Techive contact form test",
    text: "If you are reading this, the contact form can send mail.\n",
  });
  console.log(`test message sent: ${info.messageId}`);
  console.log("Check the inbox, and the spam folder if it is not there.");
} else {
  console.log("\nCredentials work. Add --send to put one real message through.");
}
