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

// Read .env exactly as the app does.
//
// This used to parse the file itself, which was worse than useless: dotenv
// treats an unquoted # as the start of a comment and cuts the value there, so
// a password containing one was whole here and truncated in the app. The check
// passed while the site failed. Using Next's own loader means what this
// reports is what the route will see.
try {
  // createRequire because @next/env is CommonJS and ships no ESM entry.
  const { createRequire } = await import("node:module");
  const { loadEnvConfig } = createRequire(import.meta.url)("@next/env");
  loadEnvConfig(process.cwd(), false, { info: () => {}, error: console.error });
} catch (error) {
  console.error(
    `Could not load @next/env (${error.message}).\n` +
      "Run this from apps/web, after npm install.\n"
  );
  process.exit(1);
}

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  CONTACT_TO,
  CONTACT_FROM,
} = process.env;

// Same aliases the route accepts, so the check reflects what will actually run.
const sender = CONTACT_FROM || SMTP_FROM || SMTP_USER;

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Not configured. Missing: ${missing.join(", ")}`);
  process.exit(1);
}

const port = Number(SMTP_PORT ?? 587);
const secure =
  SMTP_SECURE === undefined ? port === 465 : SMTP_SECURE === "true";

console.log(`host   ${SMTP_HOST}:${port} ${secure ? "(implicit TLS)" : "(STARTTLS)"}`);
console.log(`user   ${SMTP_USER}`);
console.log(`pass   ${SMTP_PASS.length} characters`);
console.log(`from   ${sender}`);
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
    from: sender,
    to: CONTACT_TO || SMTP_USER,
    subject: "360 Techive contact form test",
    text: "If you are reading this, the contact form can send mail.\n",
  });
  console.log(`test message sent: ${info.messageId}`);
  console.log("Check the inbox, and the spam folder if it is not there.");
} else {
  console.log("\nCredentials work. Add --send to put one real message through.");
}
