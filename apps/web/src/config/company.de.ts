import type { CompanyContent } from "./company";

/**
 * German twin of company.ts. Same shape, same order, same copy rule: plain
 * sentences, no dashes. Ids, statuses and technology names stay as they are.
 */
export const companyDe: CompanyContent = {
  capabilities: [
    {
      id: "web-apps",
      name: "Webanwendungen",
      description:
        "Leistungsstarke Webanwendungen, gebaut um echte Geschäftsanforderungen herum. Vom ersten internen Tool bis zur Plattform, auf der Ihr ganzes Unternehmen läuft.",
      detail: ["Dashboards", "Workflows", "Rollen"],
    },
    {
      id: "mobile",
      name: "Mobile Apps",
      description:
        "Mobile Anwendungen für Kunden, Teams und den Arbeitsalltag, auf iOS und Android.",
      detail: ["iOS", "Android", "Offline"],
    },
    {
      id: "web",
      name: "Webentwicklung",
      description:
        "Schnelle, moderne und skalierbare Websites und digitale Plattformen, die auch bei wachsenden Inhalten und steigendem Traffic schnell bleiben.",
      detail: ["Marketing", "CMS", "Commerce"],
    },
    {
      id: "design",
      name: "UI- und UX-Design",
      description:
        "Oberflächen, die leicht zu verstehen sind und Freude bei der Nutzung machen. Gestaltet, bevor die erste Zeile Code entsteht.",
      detail: ["Research", "Prototypen", "Designsysteme"],
    },
    {
      id: "agents",
      name: "KI-Agenten und Chatbots",
      description:
        "Intelligente Systeme, die Gespräche führen, mit Ihren Informationen arbeiten und die wiederkehrenden Teile einer Aufgabe übernehmen.",
      detail: ["Assistenten", "Retrieval", "Aktionen"],
    },
    {
      id: "automation",
      name: "Prozessautomatisierung",
      description:
        "Wir verbinden die Systeme, die Sie bereits nutzen, entfernen wiederholte Handarbeit und machen aus einem Prozess etwas, das von selbst läuft.",
      detail: ["Integrationen", "Trigger", "Reporting"],
    },
  ],

  stages: [
    {
      name: "Problem",
      line: "Das Geschäft und das eigentliche Problem verstehen.",
      note: "Wir beginnen damit, wie die Arbeit heute abläuft, wer sie erledigt und wo es hakt.",
    },
    {
      name: "Design",
      line: "Aus der Idee ein klares Erlebnis machen.",
      note: "Abläufe, Screens und die Form des Produkts werden abgestimmt, bevor der Code beginnt.",
    },
    {
      name: "Entwicklung",
      line: "Die Software und die Technologie bauen.",
      note: "Gebaut in funktionierenden Etappen, die Sie nutzen und bewerten können, statt monatelanger Funkstille.",
    },
    {
      name: "Launch",
      line: "Das Produkt in die Hände echter Nutzer geben.",
      note: "Veröffentlichen, beobachten, wie es genutzt wird, und es nach dem ersten Tag weiter verbessern.",
    },
  ],

  products: [
    {
      name: "Deskline",
      category: "Interne Tools",
      status: "building",
      description:
        "Ein gemeinsames Postfach und Aufgabenboard für kleine Teams, die noch den Großteil ihrer Arbeit per E-Mail erledigen. Jede Nachricht wird zu etwas, das jemand verantwortet.",
    },
    {
      name: "Handoff",
      category: "Kundenprozesse",
      status: "beta",
      description:
        "Kunden-Onboarding ohne ständiges Hin und Her. Dokumente, Freigaben und nächste Schritte an einem Ort, damit beide Seiten sehen, was noch offen ist.",
    },
    {
      name: "Cadence",
      category: "Reporting",
      status: "research",
      description:
        "Macht aus den Zahlen, die ein Unternehmen ohnehin erhebt, jede Woche ein kurzes schriftliches Update in einer Sprache, die das ganze Team versteht.",
    },
    {
      name: "Fieldmark",
      category: "Außendienst",
      status: "research",
      description:
        "Einsatzplanung und Baustellenberichte für Teams, die nicht am Schreibtisch arbeiten. Gebaut, um auch ohne Netz weiterzulaufen.",
    },
  ],

  labAreas: [
    { name: "KI-Agenten", note: "Systeme, die eine Aufgabe bis zum Ende erledigen." },
    { name: "Prozessautomatisierung", note: "Schritte entfernen, die niemand zweimal machen sollte." },
    { name: "Webanwendungen", note: "Plattformen, in denen Teams den ganzen Tag arbeiten." },
    { name: "Mobile Produkte", note: "Software, die mit der Arbeit unterwegs ist." },
    { name: "Interne Business-Tools", note: "Die unscheinbare Software, die ein Unternehmen am Laufen hält." },
    { name: "KI-gestützte Kundenerlebnisse", note: "Support und Vertrieb, die richtig antworten." },
    { name: "Intelligente Workflows", note: "Prozesse, die entscheiden, statt nur weiterzuleiten." },
    { name: "Digitale Plattformen", note: "Produkte mit mehr als einer Art von Nutzer." },
  ],

  projects: [
    {
      title: "Betriebsplattform für einen Dienstleister",
      sector: "Außendienst",
      problem:
        "Aufträge wurden in einem System gebucht, in einer Tabelle geplant und an einem dritten Ort abgerechnet. Niemand konnte sagen, wo ein Auftrag gerade stand.",
      built:
        "Eine Webanwendung für Buchungen, Einsatzplanung, Auftragshistorie und Abrechnung, mit einer mobilen Ansicht für das Team vor Ort.",
      approach: "Next.js, TypeScript, PostgreSQL",
      outcome:
        "Ein einziger Ort, an dem der Stand jedes Auftrags sichtbar ist, und ein Büroteam, das dieselben Daten nicht mehr dreimal eintippt.",
    },
    {
      title: "Assistent für den Kundensupport",
      sector: "E-Commerce",
      problem:
        "Jeden Tag kamen dieselben Fragen zu Lieferung, Rücksendungen und Größen, und das kleine Supportteam beantwortete jede davon von Hand.",
      built:
        "Ein Assistent, trainiert auf die eigenen Richtlinien und Produktdaten des Unternehmens, der alles Ungewöhnliche mit dem vollständigen Verlauf an einen Menschen übergibt.",
      approach: "KI-APIs, Retrieval, Node.js",
      outcome:
        "Routinefragen werden sofort beantwortet, und das Supportteam kümmert sich jetzt um die Fälle, die Urteilsvermögen brauchen.",
    },
    {
      title: "Interner Freigabeprozess",
      sector: "Professionelle Dienstleistungen",
      problem:
        "Freigaben steckten in E-Mail-Verläufen. Anfragen gingen unter, und niemand konnte nachvollziehen, wer was genehmigt hatte.",
      built:
        "Ein Workflow-Tool mit strukturierten Anfragen, klarer Verantwortung in jedem Schritt und einer dauerhaften Dokumentation jeder Entscheidung.",
      approach: "Laravel, MySQL, Integrationen",
      outcome:
        "Anfragen, die von selbst weiterlaufen, und ein Prüfpfad, der existiert, ohne dass ihn jemand pflegen muss.",
    },
  ],

  technology: {
    build: ["React", "Next.js", "TypeScript", "Node.js", "React Native"],
    platform: ["Laravel", "WordPress", "PostgreSQL", "MySQL"],
    intelligence: ["KI-APIs", "Vektorsuche", "Cloud-Infrastruktur"],
  },

  principles: [
    {
      title: "Wir verstehen zuerst das Geschäft",
      body: "Bevor irgendetwas gestaltet wird, wollen wir wissen, wie die Arbeit heute abläuft, wer daran beteiligt ist und was tatsächlich schiefgeht.",
    },
    {
      title: "Wir gestalten, bevor wir bauen",
      body: "Zu entscheiden, wie etwas funktionieren soll, ist auf dem Bildschirm günstiger als im Code. Im Design werden die wichtigen Diskussionen geführt.",
    },
    {
      title: "Wir bauen Systeme, die wachsen können",
      body: "Die erste Version sollte nicht die sein, die man wegwerfen muss. Wir bauen so, dass das zweite Jahr leichter wird als das erste.",
    },
    {
      title: "Wir automatisieren, wo es sinnvoll ist",
      body: "Automatisierung lohnt sich, wenn ein Prozess wiederkehrend und gut verstanden ist. Wenn nicht, verdeckt KI nur das eigentliche Problem.",
    },
    {
      title: "Wir schreiben Software, die andere pflegen können",
      body: "Sie sollten uns nicht für immer brauchen. Klare Struktur, sinnvolle Benennung und Dokumentation gehören zur Arbeit und sind kein Gefallen.",
    },
    {
      title: "Wir arbeiten eng mit Ihnen zusammen",
      body: "Kurze Feedbackschleifen, früh funktionierende Software und ehrliche Antworten darauf, was schwierig ist. Keine langen Funkstillen.",
    },
  ],
};
