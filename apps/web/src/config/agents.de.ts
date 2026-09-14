import type { AgentProfile } from "@ai-software-house/shared-types";

/** German twin of agents.ts. Same slugs, order and structural fields. */
export const agentsDe: AgentProfile[] = [
  {
    slug: "support",
    name: "Support Agent",
    department: "customer-support",
    tagline: "Tickets lösen, bevor sie eskalieren",
    description:
      "Ein autonomer Helpdesk-Agent, der eingehende Anfragen einordnet, häufige Fragen aus Ihrer Wissensdatenbank beantwortet und nur dann eskaliert, wenn menschliches Urteilsvermögen gefragt ist. Er lernt aus gelösten Tickets und wird dadurch mit der Zeit immer genauer.",
    icon: "Headphones",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Ticket-Triage und Kategorisierung",
      "Automatische Antworten aus der Wissensdatenbank",
      "Weiterleitung bei Eskalationen",
      "Stimmungsbewusste Antworten",
    ],
    responsibilities: [
      "Kundenfragen anhand Ihrer Dokumentation und FAQs beantworten",
      "Supporttickets über ihren gesamten Lebenszyklus verfolgen und aktualisieren",
      "Komplexe oder sensible Anliegen an das richtige Team eskalieren",
      "Wiederkehrende Probleme sichtbar machen, damit Ihr Produktteam die Ursachen beheben kann",
    ],
    businessBenefits: [
      "Kunden in Sekunden statt Stunden antworten",
      "Das Ticketaufkommen um 40 bis 60 % senken",
      "Erfahrene Fachkräfte vom First-Level-Support entlasten",
    ],
    useCases: [
      "Ein SaaS-Unternehmen leitet alle First-Level-Fragen zu Abrechnung und Konto an den Support Agent weiter und senkt die durchschnittliche Zeit bis zur ersten Antwort von 4 Stunden auf 30 Sekunden.",
      "Eine E-Commerce-Marke setzt den Agenten in ihrem Hilfecenter ein, um Bestellstatus-Abfragen und Rücksendeanträge rund um die Uhr zu bearbeiten.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "sales",
    name: "Sales Agent",
    department: "sales",
    tagline: "Leads qualifizieren und Termine buchen",
    description:
      "Ein KI-Vertriebsmitarbeiter, der Website-Besucher anspricht, Produktfragen beantwortet, eingehende Leads anhand Ihres idealen Kundenprofils qualifiziert und Demos vereinbart. Ein Mensch kommt erst ins Spiel, wenn das Meeting beginnt.",
    icon: "TrendingUp",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Lead-Qualifizierung und Scoring",
      "Mehrkanalige Outreach-Sequenzen",
      "Terminbuchung und Umplanung",
      "CRM-Synchronisierung (HubSpot, Salesforce)",
    ],
    responsibilities: [
      "Ihre Leistungen erklären und jedem Interessenten die passende Lösung empfehlen",
      "Leads anhand Ihres idealen Kundenprofils qualifizieren",
      "Meetings und Demos mit dem richtigen Ansprechpartner im Vertrieb vereinbaren",
      "Ins Stocken geratene Gespräche automatisch nachfassen",
    ],
    businessBenefits: [
      "Mehr eingehenden Traffic in qualifizierte Termine verwandeln",
      "Den Vertriebszyklus mit sofortigen, fundierten Antworten verkürzen",
      "Ihre Abschlussprofis konzentrieren sich auf das letzte Gespräch, nicht auf die ersten fünfzig",
    ],
    useCases: [
      "Eine B2B-Agentur setzt den Sales Agent auf ihrer Preisseite ein. Er beantwortet technische Fragen und bucht 15-minütige Erstgespräche und verdoppelt so die monatliche Terminpipeline.",
      "Ein Softwareunternehmen nutzt den Agenten, um Testnutzer zu begleiten, Fragen zu Funktionen zu beantworten und sie in zahlende Abonnenten umzuwandeln.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "finance",
    name: "Finance Agent",
    department: "finance",
    tagline: "Abstimmen, berichten, prognostizieren",
    description:
      "Ein KI-Finanzanalyst, der sich mit Ihrer Buchhaltungssoftware verbindet, Ausgabenübersichten und Umsatzberichte erstellt, Auffälligkeiten meldet und Fragen zu Ihren Finanzdaten in natürlicher Sprache beantwortet.",
    icon: "Wallet",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Kategorisierung und Übersicht von Ausgaben",
      "Umsatzberichte und Abweichungsanalyse",
      "Rechnungssuche und Zahlungserinnerungen",
      "Erkennung auffälliger Transaktionen",
    ],
    responsibilities: [
      "Ausgaben nach Kategorie, Abteilung oder Projekt zusammenfassen",
      "Wöchentliche und monatliche Umsatzberichte mit Vergleichen erstellen",
      "Rechnungen, Zahlungsstatus und Lieferantenhistorie nachschlagen",
      "Automatische Zahlungserinnerungen an säumige Konten senden",
    ],
    businessBenefits: [
      "Schnellere Abschlüsse, ohne auf manuell zusammengeführte Tabellen zu warten",
      "Sofortige Antworten auf Finanzfragen, ohne einen Bericht ziehen zu müssen",
      "Unregelmäßigkeiten in der Abrechnung erkennen, bevor sie sich summieren",
    ],
    useCases: [
      "Eine mittelständische Agentur fragt den Finance Agent nach den Werbeausgaben des letzten Monats nach Kanal und erhält die Aufschlüsselung in Sekunden, statt auf die Buchhaltung zu warten.",
      "Eine Beratungsgesellschaft automatisiert den wöchentlichen Umsatzabgleich: Der Agent prüft jeden Montagmorgen Stripe, Bankeingänge und Rechnungen gegeneinander.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "research",
    name: "Research Agent",
    department: "research",
    tagline: "Tiefgehende Recherche in Maschinengeschwindigkeit",
    description:
      "Ein KI-Rechercheassistent, der Informationen aus dem Web, aus Dokumenten und Datenbanken sammelt, verdichtet und zusammenfasst. Er liefert strukturierte Briefings, Wettbewerbsanalysen und Trendberichte auf Abruf oder nach Zeitplan.",
    icon: "Search",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Webrecherche aus mehreren Quellen mit Belegen",
      "Wettbewerbs- und Marktanalysen",
      "Erkennung und Zusammenfassung von Trends",
      "Automatisch wiederkehrende Berichte",
    ],
    responsibilities: [
      "Marktforschung zu Branchen, Wettbewerbern und neuen Trends betreiben",
      "Wettbewerbsanalysen mit Preisen, Positionierung und Funktionsvergleichen erstellen",
      "Trends aus Nachrichten, Berichten und sozialen Signalen erkennen",
      "Kompakte Business Insights für die Geschäftsführung aufbereiten",
    ],
    businessBenefits: [
      "Recherche-Briefings in Minuten statt Tagen",
      "Wettbewerber kontinuierlich statt quartalsweise beobachten",
      "Ihr Strategieteam von stundenlangem Lesen und Mitschreiben befreien",
    ],
    useCases: [
      "Eine Managementberatung bittet den Research Agent, KI-Compliance-Rahmenwerke in der EU, den USA und Großbritannien zu vergleichen, und erhält innerhalb von fünf Minuten ein strukturiertes Briefing mit Quellen.",
      "Eine Investmentgesellschaft plant wöchentliche Berichte zu Wettbewerbsbewegungen. Der Agent überwacht Nachrichten, Pflichtveröffentlichungen und Pressemitteilungen automatisch.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "document",
    name: "Document Agent",
    department: "documents",
    tagline: "Entwerfen, prüfen, verteilen",
    description:
      "Ein KI-Dokumentenspezialist, der Angebote, Berichte und Verträge aus Vorlagen und strukturierten Daten entwirft. Er fasst lange Dokumente zusammen, extrahiert wichtige Klauseln und führt eine Versionshistorie über Ihr gesamtes Dokumentenarchiv.",
    icon: "FileText",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Dokumenterstellung auf Basis von Vorlagen",
      "Zusammenfassung langer Dokumente",
      "Extraktion und Vergleich wichtiger Klauseln",
      "Versionsverfolgung und Änderungsprotokolle",
    ],
    responsibilities: [
      "Angebote, Kostenvoranschläge und Rechnungen aus strukturierten Daten erstellen",
      "Lange Berichte, Verträge und Artikel zusammenfassen",
      "Wichtige Klauseln und Pflichten aus juristischen Dokumenten extrahieren",
      "Eine versionierte Bibliothek aller erstellten Dokumente führen",
    ],
    businessBenefits: [
      "Die Zeit für Dokumententwürfe um 70 % verkürzen",
      "Copy-and-Paste-Fehler in Angeboten und Verträgen vermeiden",
      "Automatisch eine durchsuchbare, versionierte Dokumentenhistorie führen",
    ],
    useCases: [
      "Eine Beratungsgesellschaft erstellt Kundenangebote aus standardisierten Bausteinen. Der Agent übernimmt Preise, Leistungsumfang und Zeitplan in weniger als einer Minute aus dem CRM.",
      "Eine Rechtsabteilung übergibt eingehende Verträge an den Document Agent, der Kündigungsklauseln, Verlängerungsfristen und Haftungsgrenzen in eine Vergleichstabelle überträgt.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "executive-assistant",
    name: "Executive Assistant Agent",
    department: "executive",
    tagline: "Ihr KI-Stabschef",
    description:
      "Ein KI-Assistent für die Geschäftsführung, der Termine koordiniert, Korrespondenz entwirft, Erinnerungen setzt und über Kalender, E-Mail und Aufgabentools hinweg zeigt, was Ihre Aufmerksamkeit braucht. So konzentrieren Sie sich auf Entscheidungen statt auf Logistik.",
    icon: "Crown",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Kalenderübergreifende Terminplanung und Konfliktlösung",
      "E-Mail-Entwürfe und Erinnerungen zum Nachfassen",
      "Priorisierung über Posteingang und Aufgaben",
      "Vorbereitungsunterlagen und Zusammenfassungen für Meetings",
    ],
    responsibilities: [
      "Termine verwalten, freie Zeiten aller Teilnehmer finden und Zeit blocken",
      "E-Mails, Tagesordnungen und Follow-up Nachrichten entwerfen",
      "Erinnerungen für Fristen, Reviews und Rückmeldungen anlegen und verfolgen",
      "Meetings organisieren, inklusive Agenda und Versand der Notizen",
    ],
    businessBenefits: [
      "Jede Woche Stunden zurückgewinnen, die sonst in der Kalenderplanung verloren gehen",
      "Nie wieder ein Follow-up oder eine Frist verpassen",
      "In jedes Meeting mit einem bereits geschriebenen Briefing gehen",
    ],
    useCases: [
      "Eine Führungskraft bittet den Agenten, nächste Woche 30 Minuten mit jeder Abteilungsleitung zu finden. Er gleicht die Kalender ab und bucht fünf Termine mit einer einzigen Anfrage.",
      "Ein beschäftigter Gründer lässt den Agenten wöchentliche Status-E-Mails an den Beirat entwerfen, inklusive automatisch übernommener Projektupdates aus dem Aufgabentool.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
];
