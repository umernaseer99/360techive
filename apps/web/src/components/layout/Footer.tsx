import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig, type NavLink } from "@/config/site";
import { Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/10">
      <div className="px-4 py-16 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center text-foreground focus-visible:outline-none"
            >
              <BrandLogo height={52} />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <FooterColumn
              heading={t("columns.explore")}
              links={siteConfig.footerLinks.explore}
            />
            <FooterColumn
              heading={t("columns.company")}
              links={siteConfig.footerLinks.company}
            />
            <ContactColumn />
          </div>
        </div>

        <div className="mt-12 border-t border-border/10 pt-6">
          <p className="text-xs text-muted">
            &copy; {currentYear} {siteConfig.name}. {t("rights")}
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Contact details. The email is a real mailto rather than plain text, and the
 * offices come from config so they are not buried in a translation file: they
 * are the same in every language.
 */
function ContactColumn() {
  const t = useTranslations("footer.contact");

  return (
    <div className="col-span-2 md:col-span-1">
      <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted/60">
        {t("heading")}
      </h3>

      <div className="flex flex-col gap-2">
        {siteConfig.contactEmails.map((address, i) => (
          <a
            key={address}
            href={`mailto:${address}`}
            className="group inline-flex items-start gap-2.5 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            {/* the icon marks the pair, so it is drawn once and the second
                address lines up under the first rather than repeating it */}
            {i === 0 ? (
              <Mail
                className="mt-0.5 size-4 shrink-0 text-primary"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            ) : (
              <span className="size-4 shrink-0" aria-hidden="true" />
            )}
            <span className="relative">
              {address}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <MapPin
          className="mt-0.5 size-4 shrink-0 text-primary"
          strokeWidth={1.7}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted">
            {siteConfig.locations.join(" · ")}
          </span>
          <span className="text-[13px] text-muted/70">{t("global")}</span>
        </div>
      </div>
    </div>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly NavLink[];
}) {
  const t = useTranslations("footer.links");

  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
