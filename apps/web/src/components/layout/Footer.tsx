import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig, type NavLink } from "@/config/site";
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

          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-2">
            <FooterColumn
              heading={t("columns.explore")}
              links={siteConfig.footerLinks.explore}
            />
            <FooterColumn
              heading={t("columns.company")}
              links={siteConfig.footerLinks.company}
            />
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
