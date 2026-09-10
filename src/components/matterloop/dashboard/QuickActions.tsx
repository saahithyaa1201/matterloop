import { useState } from "react";
import {
  Plus,
  Wrench,
  AlertTriangle,
  Download,
  Sparkles,
  CheckCircle,
  X,
} from "lucide-react";

interface QuickActionsProps {
  onOpenAiAssistant: () => void;
  onOpenAlertsView: () => void;
  onOpenMaintenanceView: () => void;
}

export function QuickActions({
  onOpenAiAssistant,
  onOpenAlertsView,
  onOpenMaintenanceView,
}: QuickActionsProps) {
  const [activeModal, setActiveModal] = useState<"add-asset" | "export-report" | null>(
    null
  );
  const [exportSuccess, setExportSuccess] = useState(false);
  const [assetSuccess, setAssetSuccess] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border/80 bg-card/60 p-4 shadow-xs backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              Command Quick Actions
            </span>
            <span className="ml-2 font-mono text-[10px] text-muted-foreground hidden md:inline">
              Instant operational dispatch triggers
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Add Asset */}
            <button
              type="button"
              onClick={() => {
                setAssetSuccess(false);
                setActiveModal("add-asset");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-cyan/50 hover:text-cyan hover:bg-surface transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-cyan" />
              Add Asset
            </button>

            {/* Schedule Maintenance */}
            <button
              type="button"
              onClick={onOpenMaintenanceView}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-amber/50 hover:text-amber hover:bg-surface transition-all cursor-pointer"
            >
              <Wrench className="h-3.5 w-3.5 text-amber" />
              Schedule Maintenance
            </button>

            {/* Investigate Alert */}
            <button
              type="button"
              onClick={onOpenAlertsView}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-coral/50 hover:text-coral hover:bg-surface transition-all cursor-pointer"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-coral" />
              Investigate Alert
            </button>

            {/* Export Report */}
            <button
              type="button"
              onClick={() => {
                setExportSuccess(false);
                setActiveModal("export-report");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-cyan/50 hover:text-cyan hover:bg-surface transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-muted-foreground" />
              Export Report
            </button>

            {/* Ask AI */}
            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="inline-flex items-center gap-1.5 rounded-xl bg-cyan px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:brightness-110 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask MatterLoop AI
            </button>
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      {activeModal === "add-asset" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-sm text-foreground">
                Provision New Asset Node
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {assetSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-green/15 text-green">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="font-bold text-sm text-foreground">
                  Asset Successfully Provisioned
                </div>
                <p className="text-xs text-muted-foreground">
                  Edge telemetry gateway paired and baseline vibration calibration started.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl bg-cyan px-4 py-1.5 text-xs font-bold text-primary-foreground"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAssetSuccess(true);
                }}
                className="mt-4 space-y-3 text-xs"
              >
                <div>
                  <label className="block font-mono text-[10px] text-muted-foreground uppercase mb-1">
                    Asset Identifier / Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Injection Molder M-09"
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[10px] text-muted-foreground uppercase mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hydraulic Press"
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-muted-foreground uppercase mb-1">
                      Bay / Line
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Line 4B"
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground hover:border-cyan/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan px-4 py-2 text-xs font-bold text-primary-foreground hover:brightness-110"
                  >
                    Register Node
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {activeModal === "export-report" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-sm text-foreground">
                Generate Asset Lifecycle Intelligence Report
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {exportSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-green/15 text-green">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="font-bold text-sm text-foreground">
                  Report Generated Successfully
                </div>
                <p className="text-xs text-muted-foreground">
                  Downloaded <code>matterloop-fleet-audit-report.pdf</code> (2.4 MB).
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl bg-cyan px-4 py-1.5 text-xs font-bold text-primary-foreground"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-xs">
                <p className="text-muted-foreground">
                  Select report scope and telemetry aggregation level for executive distribution:
                </p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-foreground font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-cyan" />
                    Fleet OEE & Utilization Heatmaps
                  </label>
                  <label className="flex items-center gap-2 text-foreground font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-cyan" />
                    Predictive Failure Model Forecasts (72h / 14d)
                  </label>
                  <label className="flex items-center gap-2 text-foreground font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-cyan" />
                    Asset Maintenance Ledgers & MTTR Audits
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground hover:border-cyan/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportSuccess(true)}
                    className="rounded-xl bg-cyan px-4 py-2 text-xs font-bold text-primary-foreground hover:brightness-110 flex items-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
