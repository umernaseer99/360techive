import type { routing } from "./routing";
import type messages from "../../messages/en.json";

// Type-checks every translation key against the English messages.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
