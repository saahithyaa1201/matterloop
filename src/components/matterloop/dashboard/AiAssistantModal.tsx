import { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import {
  aiSuggestedQuestions,
  aiKnowledgeResponses,
  AssetRecord,
} from "./dashboardData";

interface Message {
  sender: "user" | "ai";
  text: string;
  targetAssetId?: string | undefined;
  followUps?:
    | Array<{
        label: string;
        action: "viewAsset" | "viewMaintenance" | "filterRisk";
      }>
    | undefined;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssetById: (id: string) => void;
  onOpenMaintenance: () => void;
  onFilterRiskCritical: () => void;
  initialPrompt?: string | undefined;
}

export function AiAssistantModal({
  isOpen,
  onClose,
  onSelectAssetById,
  onOpenMaintenance,
  onFilterRiskCritical,
  initialPrompt,
}: AiAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text:
        "Hello. I'm MatterLoop Industrial Intelligence Assistant. I monitor real-time telemetry across your machinery, robotic cells, and logistical nodes. How can I assist your plant reliability operations today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendQuestion = (question: string) => {
    if (!question.trim()) return;

    const userMsg: Message = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const match = aiKnowledgeResponses[question] || {
        answer: `Analysis for "${question}": Sensor telemetry across monitored assets shows normal vibration harmonics with isolated thermal drift on Milling Array AST-042. All other cells are operating within nominal tolerance.`,
        targetAssetId: "AST-042",
        followUps: [
          { label: "Inspect CNC Machine 042", action: "viewAsset" },
          { label: "Review Maintenance Queue", action: "viewMaintenance" },
        ],
      };

      const aiMsg: Message = {
        sender: "ai",
        text: match.answer,
        targetAssetId: match.targetAssetId,
        followUps: match.followUps,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleFollowUpAction = (
    action: "viewAsset" | "viewMaintenance" | "filterRisk",
    targetAssetId?: string
  ) => {
    if (action === "viewAsset" && targetAssetId) {
      onSelectAssetById(targetAssetId);
      onClose();
    } else if (action === "viewMaintenance") {
      onOpenMaintenance();
      onClose();
    } else if (action === "filterRisk") {
      onFilterRiskCritical();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative flex h-[620px] w-full max-w-2xl flex-col rounded-3xl border border-cyan/40 bg-card p-6 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/15 text-cyan">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-foreground">
                  MatterLoop Industrial Intelligence AI
                </h3>
                <span className="rounded-sm border border-cyan/40 bg-cyan/10 px-1.5 py-0.2 font-mono text-[9px] font-bold text-cyan">
                  EDGE CO-PILOT
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Inquires against live plant telemetry, lifecycle ledgers, and vibration models.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border/80 p-1.5 text-muted-foreground hover:border-cyan/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-cyan text-primary-foreground font-medium"
                    : "border border-border/70 bg-surface/50 text-foreground"
                }`}
              >
                <p>{msg.text}</p>

                {/* Follow up action pills */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap gap-1.5">
                    {msg.followUps.map((action, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          handleFollowUpAction(action.action, msg.targetAssetId)
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-cyan/50 bg-card px-2.5 py-1 font-mono text-[10px] font-bold text-cyan hover:bg-cyan hover:text-primary-foreground transition-all cursor-pointer"
                      >
                        {action.label}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground mt-0.5">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan">
              <Bot className="h-4 w-4 animate-spin" />
              <span>Querying edge telemetry models…</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="border-t border-border/60 pt-3">
          <div className="font-mono text-[10px] uppercase text-muted-foreground mb-2">
            Suggested Operational Inquiries:
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {aiSuggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSendQuestion(q)}
                className="rounded-lg border border-border/70 bg-surface/40 px-2.5 py-1 text-[11px] text-foreground hover:border-cyan/50 hover:bg-surface transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuestion(inputValue);
          }}
          className="mt-3 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about asset health, anomalies, or maintenance schedules..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-xl border border-border/80 bg-surface/50 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan text-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
