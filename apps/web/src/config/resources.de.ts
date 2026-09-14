import {
  Bot,
  Cpu,
  Shield,
  DollarSign,
  BookOpen,
  Scale,
  Library,
  ChartNoAxesColumn,
  ClipboardCheck,
} from "lucide-react";
import type { ResourceTopic } from "./resources";

/** German twin of resourceTopics in resources.ts. Same slugs and order. */
export const resourceTopicsDe: ResourceTopic[] = [
  {
    slug: "what-is-an-ai-employee",
    title: "Was ist ein KI-Mitarbeiter?",
    description:
      "Anders als ein Chatbot, der Fragen beantwortet, ist ein KI-Mitarbeiter ein dauerhaft aktiver, autonomer Agent, der in Ihren Tools handelt: Tickets anlegen, Datensätze aktualisieren, Berichte erstellen und mehr.",
    icon: Bot,
  },
  {
    slug: "how-we-build-agents",
    title: "Wie wir Agenten bauen",
    description:
      "Jeder Agent wird für eine Abteilung gebaut, mit modularer Architektur: Wahrnehmungsschicht, Reasoning-Engine, Tool-Integrationen und eine Eskalationsstufe zu menschlichen Prüfern.",
    icon: Cpu,
  },
  {
    slug: "data-security-and-compliance",
    title: "Datensicherheit und Compliance",
    description:
      "Agenten laufen in dedizierten Virtual Private Clouds mit Verschlüsselung im Ruhezustand und bei der Übertragung. Wir trainieren niemals Basismodelle mit Ihren Daten, und Sie bestimmen die Aufbewahrungsregeln.",
    icon: Shield,
  },
  {
    slug: "costs-and-roi",
    title: "Kosten und ROI",
    description:
      "Die Preise gelten pro Agent und Monat, mit Mengenrabatten. Die meisten Kunden sehen bereits im ersten Quartal eine positive Rendite durch geringere Personalkosten und höheren Durchsatz.",
    icon: DollarSign,
  },
  {
    slug: "ai-employee-vs-chatbot",
    title: "KI-Mitarbeiter oder Chatbot?",
    description:
      "Ein Chatbot wartet auf Fragen. Ein KI-Mitarbeiter verantwortet Ergebnisse: Er überwacht Systeme, stößt Aktionen an, eskaliert mit Bedacht und lernt aus Feedback, ohne von Grund auf neu trainiert zu werden.",
    icon: Scale,
  },
  {
    slug: "glossary",
    title: "Glossar",
    description:
      "Von Retrieval-Augmented Generation (RAG) und Tool-Calling bis zu Eskalationsstufen und Konfidenzschwellen: verständliche Erklärungen der Konzepte hinter autonomen Agenten.",
    icon: Library,
  },
  {
    slug: "build-vs-buy",
    title: "Selbst bauen oder einkaufen?",
    description:
      "Einen eigenen KI-Agenten zu bauen heißt, ML-Engineers einzustellen, Infrastruktur zu betreiben und monatelang zu iterieren. Unsere Agenten sind in Wochen einsatzbereit und werden laufend besser.",
    icon: BookOpen,
  },
  {
    slug: "roi-calculator",
    title: "ROI verstehen",
    description:
      "So schätzen Sie Einsparungen durch Abteilungsautomatisierung: zurückgewonnene Stunden, weniger Eskalationen, schnellere Reaktionszeiten und weniger Fehler. Alles ab der ersten Woche messbar.",
    icon: ChartNoAxesColumn,
  },
  {
    slug: "readiness-check",
    title: "Sind Sie bereit für einen KI-Mitarbeiter?",
    description:
      "Die besten Kandidaten haben dokumentierte Abläufe, strukturierte Datenquellen, wiederkehrende, regelbasierte Aufgaben und einen klaren Punkt, an dem menschliches Urteilsvermögen gefragt ist.",
    icon: ClipboardCheck,
  },
];
