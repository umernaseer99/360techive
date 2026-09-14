import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                {t("product")}
              </h3>
              <ul className="space-y-3">
                {siteConfig.footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                {t("company")}
              </h3>
              <ul className="space-y-3">
                {siteConfig.footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                {t("legal")}
              </h3>
              <ul className="space-y-3">
                {siteConfig.footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/10 pt-6">
          <p className="text-xs text-muted">
            &copy; {currentYear} {siteConfig.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
