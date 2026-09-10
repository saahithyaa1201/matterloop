import { useState } from "react";
import {
  Wrench,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  MaintenanceRecommendation,
  initialMaintenanceRecs,
  AssetRecord,
} from "./dashboardData";

interface MaintenancePanelProps {
  onSelectAssetById: (assetId: string) => void;
}

export function MaintenancePanel({ onSelectAssetById }: MaintenancePanelProps) {
  const [recs, setRecs] = useState<MaintenanceRecommendation[]>(initialMaintenanceRecs);
  const [selectedRec, setSelectedRec] = useState<MaintenanceRecommendation | null>(null);
  const [activeTab, setActiveTab] = useState<"All" | "Due" | "Overdue" | "Scheduled">("All");

  const filteredRecs = recs.filter((r) => {
    if (activeTab === "All") return true;
    return r.status === activeTab;
  });

  return (
    <div className="rounded-2xl border border-border/80 bg-card/70 p-4 sm:p-6 shadow-xs backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-amber" />
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Maintenance Intelligence & Prescriptive Scheduling
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            AI-modeled component degradation curves recommending targeted pre-emptive maintenance.
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center rounded-lg border border-border/70 bg-surface/50 p-0.5 font-mono text-[10px]">
          {(["All", "Overdue", "Due", "Scheduled"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-amber text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations List */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className="group flex flex-col justify-between rounded-xl border border-border/70 bg-surface/40 p-4 transition-all hover:border-amber/50 hover:bg-surface/70"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-xs text-foreground group-hover:text-amber transition-colors">
                    {rec.assetName}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {rec.assetId} • {rec.workOrderType}
                  </div>
                </div>

                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${
                    rec.status === "Overdue"
                      ? "border-coral/50 bg-coral/15 text-coral"
                      : rec.status === "Due"
                      ? "border-amber/50 bg-amber/15 text-amber"
                      : "border-cyan/50 bg-cyan/15 text-cyan"
                  }`}
                >
                  {rec.status}
                </span>
              </div>

              <div className="mt-2.5 space-y-1 text-xs">
                <div className="text-muted-foreground text-[11px]">
                  <span className="text-foreground font-medium">Condition: </span>
                  {rec.detectedCondition}
                </div>
                <div className="text-muted-foreground text-[11px]">
                  <span className="text-foreground font-medium">Window: </span>
                  <span className="font-mono text-amber font-semibold">
                    {rec.suggestedWindow}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectAssetById(rec.assetId)}
                className="font-mono text-[10px] text-cyan hover:underline"
              >
                Inspect Telemetry
              </button>

              <button
                type="button"
                onClick={() => setSelectedRec(rec)}
                className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber hover:text-foreground transition-colors cursor-pointer"
              >
                Review Recommendation
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Review Modal */}
      {selectedRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-start justify-between border-b border-border/70 pb-4">
              <div>
                <div className="font-mono text-xs font-bold text-amber">
                  PREDICTIVE WORK ORDER: {selectedRec.id}
                </div>
                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {selectedRec.assetName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Asset ID: {selectedRec.assetId} • Risk Level: {selectedRec.riskLevel}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRec(null)}
                className="rounded-xl border border-border p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3.5 text-xs">
              <div className="rounded-xl border border-border/70 bg-surface/40 p-3.5 space-y-2">
                <div>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                    Detected Degradation Pattern
                  </span>
                  <div className="font-semibold text-foreground mt-0.5">
                    {selectedRec.detectedCondition}
                  </div>
                </div>
                <div className="pt-2 border-t border-border/40">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                    Prescriptive Action Required
                  </span>
                  <div className="text-foreground mt-0.5">
                    {selectedRec.recommendedAction}
                  </div>
                </div>
                <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    Recommended Execution Window
                  </span>
                  <span className="font-mono font-bold text-amber">
                    {selectedRec.suggestedWindow}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={() => {
                  onSelectAssetById(selectedRec.assetId);
                  setSelectedRec(null);
                }}
                className="font-mono text-xs text-cyan hover:underline"
              >
                Open Asset File &rarr;
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRec(null)}
                  className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:border-cyan/50"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Work order confirmed for ${selectedRec.assetName}. Dispatched to field maintenance.`);
                    setSelectedRec(null);
                  }}
                  className="rounded-xl bg-amber px-4 py-2 text-xs font-bold text-primary-foreground hover:brightness-110"
                >
                  Authorize Work Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
