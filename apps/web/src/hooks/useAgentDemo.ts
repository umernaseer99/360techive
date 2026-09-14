"use client";

import { useState, useCallback } from "react";
import type { AgentSlug } from "@ai-software-house/shared-types";
import type { Locale } from "@/i18n/routing";

interface Message {
  role: "user" | "agent";
  content: string;
}

interface UseAgentDemoReturn {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
  reset: () => void;
}

type Exchanges = Record<AgentSlug, { user: string; agent: string }[]>;

const cannedResponsesEn: Exchanges = {
  support: [
    {
      user: "I need a refund for my subscription",
      agent:
        "I'd be happy to help with a refund. Can you provide your account email or order number so I can look up your subscription details?",
    },
    {
      user: "My account is locked and I can't log in",
      agent:
        "I can help unlock your account. First, let me verify your identity — could you confirm the email address associated with your account?",
    },
  ],
  sales: [
    {
      user: "How much does the Enterprise plan cost?",
      agent:
        "The Enterprise plan starts at $2,500/month and includes all six AI Employees plus dedicated support. I can schedule a quick call with our team to walk through the specifics for your use case.",
    },
    {
      user: "Can I try the Support Agent before committing?",
      agent:
        "Absolutely. We offer a 14-day free trial with full access to any single AI Employee. Would you like me to set that up for the Support Agent?",
    },
  ],
  finance: [
    {
      user: "Show me last quarter's expenses by department",
      agent:
        "Let me pull that report. Here's a summary: Engineering spent $124K, Marketing $89K, Sales $67K, and Operations $43K. I can break this down further by category if you'd like.",
    },
    {
      user: "Are there any unusual transactions this month?",
      agent:
        "I've scanned the transaction log. There's one flagged: a $12,500 payment to a new vendor 'DataSync Pro' that doesn't match any existing contract on file. Would you like me to flag this for your finance team?",
    },
  ],
  research: [
    {
      user: "What are the top AI trends in healthcare right now?",
      agent:
        "I've scanned recent reports. Three trends stand out: (1) AI-assisted medical imaging for radiology, (2) LLM-powered clinical documentation, and (3) predictive analytics for patient readmission. I can generate a full brief with sources if that's useful.",
    },
    {
      user: "Compare our main competitor's pricing",
      agent:
        "Based on the latest available data, Competitor A charges $299/month for their basic plan with 3 user seats. Competitor B offers a free tier but caps at 1,000 queries/month. I can compile a detailed comparison table if you'd like.",
    },
  ],
  document: [
    {
      user: "Draft a proposal for a new client",
      agent:
        "I can generate a proposal draft. I'll need the client's name, the services you're offering, the proposed timeline, and the pricing structure. Do you have these details ready, or should I pull from a recent template?",
    },
    {
      user: "Summarize the Q3 shareholder report",
      agent:
        "The Q3 report is 47 pages. Key takeaways: revenue grew 18% YoY to $4.2M, operating costs decreased 5%, and the company expanded into two new markets. I can provide a detailed section-by-section summary if needed.",
    },
  ],
  "executive-assistant": [
    {
      user: "Schedule a team standup for tomorrow at 9 AM",
      agent:
        "Let me check everyone's availability. I see that the conference room is free and all team members show as available at 9 AM tomorrow. I've sent the calendar invite with the usual Zoom link. Shall I set a recurring event?",
    },
    {
      user: "What's on my schedule for today?",
      agent:
        "Here's your day: 9:30 AM — Product review (30 min), 11:00 AM — Client call with Acme Corp (45 min), 1:00 PM — Lunch, 2:30 PM — Team sync (1 hr). You also have two pending reminder flags about the budget review due Friday.",
    },
  ],
};

const cannedResponsesDe: Exchanges = {
  support: [
    {
      user: "Ich möchte eine Rückerstattung für mein Abo",
      agent:
        "Gerne helfe ich Ihnen bei der Rückerstattung. Können Sie mir die E-Mail-Adresse Ihres Kontos oder Ihre Bestellnummer nennen, damit ich Ihr Abo finde?",
    },
    {
      user: "Mein Konto ist gesperrt und ich kann mich nicht anmelden",
      agent:
        "Ich helfe Ihnen, Ihr Konto zu entsperren. Zuerst muss ich Ihre Identität prüfen. Können Sie die E-Mail-Adresse bestätigen, die mit Ihrem Konto verknüpft ist?",
    },
  ],
  sales: [
    {
      user: "Was kostet der Enterprise-Tarif?",
      agent:
        "Der Enterprise-Tarif beginnt bei 2.500 € pro Monat und umfasst alle sechs KI-Mitarbeiter sowie dedizierten Support. Gerne vereinbare ich ein kurzes Gespräch mit unserem Team, um die Details für Ihren Anwendungsfall durchzugehen.",
    },
    {
      user: "Kann ich den Support Agent vorher testen?",
      agent:
        "Selbstverständlich. Wir bieten eine kostenlose 14-tägige Testphase mit vollem Zugriff auf einen KI-Mitarbeiter Ihrer Wahl. Soll ich das für den Support Agent einrichten?",
    },
  ],
  finance: [
    {
      user: "Zeig mir die Ausgaben des letzten Quartals nach Abteilung",
      agent:
        "Ich rufe den Bericht ab. Hier die Übersicht: Entwicklung 124.000 €, Marketing 89.000 €, Vertrieb 67.000 € und Betrieb 43.000 €. Auf Wunsch schlüssele ich das weiter nach Kategorien auf.",
    },
    {
      user: "Gibt es diesen Monat ungewöhnliche Transaktionen?",
      agent:
        "Ich habe das Transaktionsprotokoll geprüft. Eine Zahlung ist auffällig: 12.500 € an einen neuen Lieferanten namens DataSync Pro, zu dem kein bestehender Vertrag hinterlegt ist. Soll ich das an Ihr Finanzteam melden?",
    },
  ],
  research: [
    {
      user: "Was sind aktuell die wichtigsten KI-Trends im Gesundheitswesen?",
      agent:
        "Ich habe aktuelle Berichte ausgewertet. Drei Trends stechen heraus: (1) KI-gestützte Bildgebung in der Radiologie, (2) klinische Dokumentation mit Sprachmodellen und (3) prädiktive Analysen zu Wiederaufnahmen von Patienten. Auf Wunsch erstelle ich ein vollständiges Briefing mit Quellen.",
    },
    {
      user: "Vergleiche die Preise unseres wichtigsten Wettbewerbers",
      agent:
        "Nach den neuesten verfügbaren Daten verlangt Wettbewerber A 299 € pro Monat für den Basistarif mit 3 Nutzerplätzen. Wettbewerber B bietet einen kostenlosen Tarif, begrenzt auf 1.000 Anfragen pro Monat. Gerne stelle ich eine detaillierte Vergleichstabelle zusammen.",
    },
  ],
  document: [
    {
      user: "Erstelle ein Angebot für einen neuen Kunden",
      agent:
        "Ich kann einen Angebotsentwurf erstellen. Dafür brauche ich den Namen des Kunden, die angebotenen Leistungen, den geplanten Zeitrahmen und die Preisstruktur. Haben Sie diese Angaben zur Hand, oder soll ich eine aktuelle Vorlage verwenden?",
    },
    {
      user: "Fasse den Aktionärsbericht für Q3 zusammen",
      agent:
        "Der Q3-Bericht umfasst 47 Seiten. Die wichtigsten Punkte: Der Umsatz stieg im Jahresvergleich um 18 % auf 4,2 Mio. €, die Betriebskosten sanken um 5 %, und das Unternehmen ist in zwei neue Märkte eingetreten. Auf Wunsch fasse ich den Bericht Abschnitt für Abschnitt zusammen.",
    },
  ],
  "executive-assistant": [
    {
      user: "Plane morgen um 9 Uhr ein Team-Standup",
      agent:
        "Ich prüfe die Verfügbarkeit aller Beteiligten. Der Besprechungsraum ist frei, und alle Teammitglieder sind morgen um 9 Uhr verfügbar. Die Kalendereinladung mit dem üblichen Zoom-Link ist verschickt. Soll ich daraus einen wiederkehrenden Termin machen?",
    },
    {
      user: "Was steht heute in meinem Kalender?",
      agent:
        "Ihr Tag: 9:30 Uhr Produktreview (30 Min.), 11:00 Uhr Kundengespräch mit Acme Corp (45 Min.), 13:00 Uhr Mittagspause, 14:30 Uhr Team-Sync (1 Std.). Außerdem haben Sie zwei offene Erinnerungen zum Budgetreview, das am Freitag fällig ist.",
    },
  ],
};

const fallbackResponsesDe: Record<AgentSlug, string> = {
  support:
    "Danke für Ihre Nachricht. Ich habe Ihr Anliegen notiert und helfe Ihnen, es zu lösen. Können Sie mir etwas mehr Details geben, damit ich Sie besser unterstützen kann?",
  sales:
    "Schön, dass Sie sich melden. Gerne zeige ich Ihnen, wie unsere KI-Mitarbeiter Ihr Team unterstützen können. Welcher Bereich interessiert Sie besonders?",
  finance:
    "Verstanden. Ich kümmere mich sofort darum. Können Sie relevante Details oder Kontoinformationen nennen, damit ich das Richtige finde?",
  research:
    "Ich beginne mit der Recherche. Damit die Ergebnisse möglichst relevant sind: Können Sie den Umfang oder den Zeitraum eingrenzen?",
  document:
    "Dabei helfe ich gerne. Nennen Sie mir die Details, und ich bereite das Dokument zur Prüfung vor.",
  "executive-assistant":
    "Wird erledigt. Ich prüfe Ihre Kalender, Aufgaben und Prioritäten. Sagen Sie mir Bescheid, falls etwas Bestimmtes Vorrang haben soll.",
};

function getCannedReply(
  slug: AgentSlug,
  userMessage: string,
  locale: Locale
): string | null {
  const exchanges = (locale === "de" ? cannedResponsesDe : cannedResponsesEn)[slug];
  if (!exchanges) return null;

  const lower = userMessage.toLowerCase();

  for (const exchange of exchanges) {
    if (lower.includes(exchange.user.toLowerCase().slice(0, 15))) {
      return exchange.agent;
    }
  }

  return null;
}

const fallbackResponsesEn: Record<AgentSlug, string> = {
  support:
    "Thanks for your message. I've noted your request and will help resolve it. Could you provide a bit more detail so I can assist better?",
  sales:
    "I appreciate you reaching out. I'd be happy to discuss how our AI Employees can help your team. What specific area are you interested in?",
  finance:
    "Got it. I'll look into your request right away. Can you share any relevant details or account information to help me find what you need?",
  research:
    "I'll start looking into that for you. To give you the most relevant results, could you narrow down the scope or time frame?",
  document:
    "I can help with that. Let me know the specifics and I'll prepare the document for your review.",
  "executive-assistant":
    "On it. I'll check your calendars, tasks, and priorities. Let me know if there's anything specific you'd like me to prioritize.",
};

export function useAgentDemo(
  agentSlug: AgentSlug,
  locale: Locale
): UseAgentDemoReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(
    (text: string) => {
      const userMsg: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // Simulated delay — swap this for a real apiRequest() call later
      const delay = 600 + Math.random() * 400;
      setTimeout(() => {
        const fallback =
          locale === "de" ? fallbackResponsesDe : fallbackResponsesEn;
        const reply =
          getCannedReply(agentSlug, text, locale) ?? fallback[agentSlug];
        const agentMsg: Message = { role: "agent", content: reply };
        setMessages((prev) => [...prev, agentMsg]);
        setIsTyping(false);
      }, delay);
    },
    [agentSlug, locale]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  return { messages, isTyping, sendMessage, reset };
}
