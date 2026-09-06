import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeMetadata } from "@/i18n/metadata";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LineReveal } from "@/components/ui/TextReveal";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { siteConfig } from "@/config/site";
import {
  engagements,
  conversationSteps,
  contactFaqs,
  contactNotes,
} from "@/config/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return localeMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * The contact page is a sales conversation with a senior reader, so it
 * answers the questions that decide whether an enquiry gets written at all:
 * who reads this, what happens next, can you work with our team, who owns the
 * code, how is confidentiality handled. The form stays at the top because
 * that is the point of the page. Everything beneath it exists to make sending
 * it feel like a considered decision rather than a risk.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations("contact");

  return (
    <>
      <Section className="pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow tone="primary">{t("hero.eyebrow")}</Eyebrow>

            <h1 className="text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-foreground md:text-[3.4rem]">
              <LineReveal trigger="mount">{t("hero.title")}</LineReveal>
              <LineReveal trigger="mount" delay={0.1}>
                <span className="font-serif font-normal italic text-primary">
                  {t("hero.accent")}
                </span>
              </LineReveal>
            </h1>

            <Reveal tier="quiet" delay={0.12}>
              <p className="max-w-md text-pretty text-base leading-relaxed text-muted md:text-lg">
                {t("hero.body")}
              </p>
            </Reveal>

            <Reveal tier="quiet" delay={0.18}>
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-[11px] uppercase tracking-[0.15em] text-muted">
                  {t("hero.emailLabel")}
                </span>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="group inline-flex w-fit items-center gap-3 text-lg font-medium text-foreground"
                >
                  <span className="relative">
                    {siteConfig.contactEmail}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-px origin-left bg-primary transition-transform duration-300 group-hover:scale-x-0 motion-reduce:transition-none"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-primary transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal tier="quiet" delay={0.24}>
              <ul className="mt-4 flex flex-col gap-3 border-t border-border/10 pt-6">
                {contactNotes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted"
                  >
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-primary" />
                    {t("notes." + note)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* The three places client work begins, each arriving already labelled */}
      <Section tone="tinted">
        <div className="flex flex-col gap-3">
          <Eyebrow>{t("engagements.eyebrow")}</Eyebrow>
          <h2 className="max-w-2xl text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.1rem]">
            <LineReveal>
              {t("engagements.title")}{" "}
              <span className="font-serif font-normal italic text-primary">
                {t("engagements.accent")}
              </span>
            </LineReveal>
          </h2>
          <Reveal tier="quiet" delay={0.08}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
              {t("engagements.body")}
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10 md:grid-cols-3"
          stagger={0.07}
        >
          {engagements.map((route) => (
            <RevealItem key={route} className="bg-background">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                  t("engagements.items." + route + ".subject")
                )}`}
                className="group flex h-full flex-col gap-3 p-7 transition-colors duration-300 hover:bg-surface/60 md:p-9"
              >
                <span className="h-px w-6 bg-primary transition-all duration-300 group-hover:w-10" />

                <span className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  {t("engagements.items." + route + ".label")}
                </span>

                <span className="text-pretty text-sm leading-relaxed text-muted">
                  {t("engagements.items." + route + ".description")}
                </span>

                <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-primary">
                  {t("engagements.startHere")}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    &rarr;
                  </span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* What happens after send, in order */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{t("conversation.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.1rem]">
              <LineReveal>{t("conversation.title")}</LineReveal>
              <LineReveal delay={0.08}>
                {t("conversation.subtitle")}{" "}
                <span className="font-serif font-normal italic text-primary">
                  {t("conversation.accent")}
                </span>
              </LineReveal>
            </h2>
            <Reveal tier="quiet" delay={0.12}>
              <p className="mt-5 max-w-sm text-pretty text-base leading-relaxed text-muted">
                {t("conversation.body")}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="flex flex-col" stagger={0.06}>
            {conversationSteps.map((item, i) => (
              <RevealItem key={item}>
                <div className="group flex gap-6 border-t border-border/10 py-7 last:border-b">
                  <span className="text-[11px] font-medium tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {t("conversation.steps." + item + ".title")}
                    </h3>
                    <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-muted">
                      {t("conversation.steps." + item + ".body")}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* The objections that stop a brand from writing at all */}
      <Section tone="tinted">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{t("faq.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.1rem]">
              <LineReveal>{t("faq.title")}</LineReveal>
              <LineReveal delay={0.08}>
                {t("faq.subtitle")}{" "}
                <span className="font-serif font-normal italic text-primary">
                  {t("faq.accent")}
                </span>
              </LineReveal>
            </h2>
            <Reveal tier="quiet" delay={0.12}>
              <p className="mt-5 max-w-sm text-pretty text-base leading-relaxed text-muted">
                {t("faq.body")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <Accordion
              items={contactFaqs.map((key) => ({
                label: t("faq.items." + key + ".label"),
                content: t("faq.items." + key + ".content"),
              }))}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
