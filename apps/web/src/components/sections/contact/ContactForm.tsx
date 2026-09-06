"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";
import { siteConfig } from "@/config/site";
import { projectTypes, timelines } from "@/config/contact";

/**
 * The enquiry form.
 *
 * There is no mail backend in this repo and no SMTP credentials, so a form
 * that posted to an endpoint would drop every message on the floor. Instead
 * submitting composes a structured message to the company inbox and hands it
 * to the visitor's mail client, which means nothing is ever silently lost and
 * the reply thread starts in a real inbox.
 *
 * To move this to a real endpoint later, replace the body of `handleSubmit`
 * with a fetch to your API and keep everything else: the fields, the
 * validation and the sent state are all endpoint agnostic.
 */

interface Values {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  message: string;
}

const empty: Values = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  message: "",
};

type Errors = Partial<Record<keyof Values, string>>;

/** Deliberately permissive. The mail client and the reply are the real check. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validation messages come from the catalogue, so they translate too. */
function validate(
  values: Values,
  messages: Record<"name" | "emailMissing" | "emailInvalid" | "message", string>
): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = messages.name;
  if (!values.email.trim()) errors.email = messages.emailMissing;
  else if (!EMAIL.test(values.email.trim()))
    errors.email = messages.emailInvalid;
  if (values.message.trim().length < 20) errors.message = messages.message;
  return errors;
}

/** Builds the message body. Blank optional fields are left out entirely. */
function composeBody(
  values: Values,
  labels: Record<"name" | "email" | "company" | "projectType" | "timeline" | "about", string>
): string {
  const rows: [string, string][] = [
    [labels.name, values.name.trim()],
    [labels.email, values.email.trim()],
    [labels.company, values.company.trim()],
    [labels.projectType, values.projectType],
    [labels.timeline, values.timeline],
  ];

  const details = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `${details}\n\n${labels.about}\n\n${values.message.trim()}\n`;
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const reduced = useSafeReducedMotion();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  // Kept so the fallback link can retry with the message intact rather than
  // opening an empty draft.
  const [mailtoHref, setMailtoHref] = useState("");

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values, {
      name: t("errors.name"),
      emailMissing: t("errors.emailMissing"),
      emailInvalid: t("errors.emailInvalid"),
      message: t("errors.message"),
    });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }

    const subject = t("mailSubject", { name: values.name.trim() });
    const href =
      `mailto:${siteConfig.contactEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(
        composeBody(values, {
          name: t("fields.name.label"),
          email: t("fields.email.label"),
          company: t("fields.company.label"),
          projectType: t("fields.projectType.label"),
          timeline: t("fields.timeline.label"),
          about: t("fields.message.label"),
        })
      )}`;

    setMailtoHref(href);
    setSent(true);
    window.location.href = href;
  }

  return (
    <div className="rounded-2xl border border-border/10 bg-surface/40 p-6 md:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-4 py-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <svg viewBox="0 0 20 20" className="size-5 text-primary" fill="none">
                <path
                  d="M4.5 10.5 8 14l7.5-8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {t("sent.title")}
            </h3>

            <p className="text-pretty text-[15px] leading-relaxed text-muted">
              {t("sent.body", { email: siteConfig.contactEmail })}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a href={mailtoHref} data-testid="mailto-fallback">
                <Button size="md" variant="secondary">
                  {t("sent.retry")}
                </Button>
              </a>
              <Button
                size="md"
                variant="ghost"
                type="button"
                onClick={() => {
                  setSent(false);
                  setValues(empty);
                  setMailtoHref("");
                }}
              >
                {t("sent.again")}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("fields.name.label")}
                id="name"
                value={values.name}
                error={errors.name}
                onChange={(v) => update("name", v)}
                autoComplete="name"
                required
              />
              <Field
                label={t("fields.email.label")}
                id="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
                autoComplete="email"
                required
              />
            </div>

            <Field
              label={t("fields.company.label")}
              id="company"
              optional
              optionalLabel={t("optional")}
              value={values.company}
              onChange={(v) => update("company", v)}
              autoComplete="organization"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label={t("fields.projectType.label")}
                id="projectType"
                optional
                optionalLabel={t("optional")}
                placeholder={t("choose")}
                value={values.projectType}
                options={projectTypes.map((key) => t("projectTypes." + key))}
                onChange={(v) => update("projectType", v)}
              />
              <SelectField
                label={t("fields.timeline.label")}
                id="timeline"
                optional
                optionalLabel={t("optional")}
                placeholder={t("choose")}
                value={values.timeline}
                options={timelines.map((key) => t("timelines." + key))}
                onChange={(v) => update("timeline", v)}
              />
            </div>

            <Field
              label={t("fields.message.label")}
              id="message"
              value={values.message}
              error={errors.message}
              onChange={(v) => update("message", v)}
              textarea
              required
              hint={t("fields.message.hint")}
            />

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <Button size="lg" variant="primary" type="submit" className="w-full sm:w-auto">
                {t("submit")}
              </Button>
              <p className="text-[13px] leading-relaxed text-muted/70">
                {t("directTo", { email: siteConfig.contactEmail })}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const controlClass =
  "w-full rounded-xl border bg-background/40 px-4 py-3 text-[15px] text-foreground placeholder:text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-0";

function Label({
  htmlFor,
  children,
  optional,
  optionalLabel,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
  optionalLabel?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline gap-2 text-[11px] uppercase tracking-[0.15em] text-muted"
    >
      {children}
      {optional && (
        <span className="text-[10px] normal-case tracking-normal text-muted/50">
          {optionalLabel}
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="text-[13px] text-primary"
    >
      {children}
    </motion.p>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  required = false,
  optional = false,
  hint,
  autoComplete,
  optionalLabel,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  autoComplete?: string;
  optionalLabel?: string;
}) {
  const invalid = Boolean(error);
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    name: id,
    value,
    required,
    autoComplete,
    "data-invalid": invalid ? ("true" as const) : undefined,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy || undefined,
    className: `${controlClass} ${
      invalid ? "border-primary/60" : "border-border/15 focus:border-primary/40"
    }`,
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} optional={optional} optionalLabel={optionalLabel}>
        {label}
      </Label>

      {textarea ? (
        <textarea
          {...shared}
          rows={6}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared.className} resize-y`}
        />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-[13px] leading-relaxed text-muted/70">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function SelectField({
  label,
  id,
  value,
  options,
  onChange,
  optional = false,
  optionalLabel,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  optional?: boolean;
  optionalLabel?: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} optional={optional} optionalLabel={optionalLabel}>
        {label}
      </Label>

      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} appearance-none border-border/15 pr-10 focus:border-primary/40 ${
            value ? "text-foreground" : "text-muted/60"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-foreground">
              {option}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        >
          <svg viewBox="0 0 12 12" className="size-3" fill="none">
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
