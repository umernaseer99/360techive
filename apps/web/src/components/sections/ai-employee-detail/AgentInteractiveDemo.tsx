"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useAgentDemo } from "@/hooks/useAgentDemo";
import type { AgentMeta } from "@/config/agents";

interface AgentInteractiveDemoProps {
  agent: AgentMeta;
}

export function AgentInteractiveDemo({ agent }: AgentInteractiveDemoProps) {
  const t = useTranslations("agentDetail.demo");
  const tAgents = useTranslations("agents");
  const agentName = tAgents(agent.slug + ".name");
  const { messages, isTyping, sendMessage } = useAgentDemo(agent.slug);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;
    sendMessage(text);
    setInput("");
  };

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionHeading
            align="center"
            title={t("title")}
            accent={t("accent")}
          />
          <p className="mt-4 text-xs text-muted/60">{t("disclaimer")}</p>
        </div>

        <GlassPanel className="mx-auto max-w-2xl p-0">
          <div className="flex flex-col" style={{ minHeight: 400 }}>
            <div className="flex items-center gap-3 border-b border-border/10 px-5 py-4">
              <Bot className="size-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {t("panelTitle", { name: agentName })}
              </span>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-4"
              style={{ maxHeight: 360 }}
            >
              {messages.length === 0 && (
                <p className="py-8 text-center text-sm text-muted/50">
                  {t("empty", { name: agentName })}
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.role === "agent" && (
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="size-4 text-primary" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "border border-border/15 bg-surface/60 text-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                      <User className="size-4 text-muted" />
                    </span>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="size-4 text-primary" />
                  </span>
                  <div className="flex items-center gap-1 rounded-xl border border-border/15 bg-surface/60 px-4 py-3">
                    <span className="size-1.5 animate-pulse rounded-full bg-muted" />
                    <span className="size-1.5 animate-pulse rounded-full bg-muted" style={{ animationDelay: "0.2s" }} />
                    <span className="size-1.5 animate-pulse rounded-full bg-muted" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border/10 px-5 py-4"
            >
              <label htmlFor="demo-input" className="sr-only">
                {t("inputLabel")}
              </label>
              <input
                id="demo-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                disabled={isTyping}
                className="flex-1 rounded-xl border border-border/15 bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex size-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
                aria-label={t("send")}
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
