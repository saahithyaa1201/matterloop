import { useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  Search,
  UserPlus,
  ArrowRight,
  X,
  Radio,
} from "lucide-react";
import { OperationalAlert, initialAlerts } from "./dashboardData";

interface AlertsPanelProps {
  onSelectAssetById: (assetId: string) => void;
  onAskAiAboutAlert?: (alertDescription: string) => void;
}

export function AlertsPanel({
  onSelectAssetById,
  onAskAiAboutAlert,
}: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<OperationalAlert[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<OperationalAlert | null>(null);

  const handleAcknowledge = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Acknowledged" } : a))
    );
    if (selectedAlert?.id === id) {
      setSelectedAlert((prev) => (prev ? { ...prev, status: "Acknowledged" } : null));
    }
  };

  const handleAssign = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Assigned" } : a))
    );
    alert(`Alert ${id} assigned to Plant Alpha Lead Reliability Technician.`);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card/70 p-3.5 sm:p-6 shadow-xs backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-coral" />
          <h3 className="font-bold text-sm sm:text-base text-foreground">
            Live Operational Alerts & Anomaly Stream
          </h3>
          <span className="flex h-2 w-2 rounded-full bg-coral animate-ping ml-1" />
        </div>

        <span className="font-mono text-[10px] text-muted-foreground">
          {alerts.filter((a) => a.status === "Active").length} Active Alerts
        </span>
      </div>

      {/* Alerts Feed */}
      <div className="mt-4 space-y-2.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => setSelectedAlert(alert)}
            className={`group rounded-xl border p-3.5 transition-all cursor-pointer ${
              alert.severity === "Critical"
                ? "border-coral/40 bg-coral/5 hover:border-coral"
                : alert.severity === "Warning"
                ? "border-amber/40 bg-amber/5 hover:border-amber"
                : "border-border/70 bg-surface/30 hover:border-cyan/40"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">
                  {alert.severity === "Critical" ? (
                    <AlertTriangle className="h-4 w-4 text-coral" />
                  ) : alert.severity === "Warning" ? (
                    <AlertCircle className="h-4 w-4 text-amber" />
                  ) : (
                    <Info className="h-4 w-4 text-cyan" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-foreground">
                      {alert.title}
                    </span>
                    <span className="font-mono text-[10px] text-cyan font-semibold">
                      {alert.assetName} ({alert.assetId})
                    </span>
                    <span
                      className={`rounded-sm px-1.5 py-0.2 font-mono text-[9px] uppercase font-bold ${
                        alert.status === "Active"
                          ? "bg-coral/20 text-coral"
                          : alert.status === "Assigned"
                          ? "bg-cyan/20 text-cyan"
                          : "bg-surface-2 text-foreground"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 font-mono text-[10px]">
                <span className="text-muted-foreground mr-1">{alert.timestamp}</span>

                {alert.status === "Active" && (
                  <button
                    type="button"
                    onClick={(e) => handleAcknowledge(alert.id, e)}
                    className="rounded-md border border-border/80 bg-surface/60 px-2 py-1 hover:border-green hover:text-green transition-colors"
                  >
                    Acknowledge
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAssetById(alert.assetId);
                  }}
                  className="rounded-md border border-cyan/40 bg-cyan/10 px-2 py-1 text-cyan hover:bg-cyan hover:text-primary-foreground transition-colors"
                >
                  View Asset
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-start justify-between border-b border-border/70 pb-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase text-coral">
                  {selectedAlert.severity} Severity Alert • {selectedAlert.id}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  {selectedAlert.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Asset: {selectedAlert.assetName} ({selectedAlert.assetId}) • Time: {selectedAlert.timestamp}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="rounded-xl border border-border p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-xl border border-border/70 bg-surface/40 p-3.5">
                <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                  Incident Telemetry Summary
                </span>
                <p className="text-foreground leading-relaxed">
                  {selectedAlert.description}
                </p>
              </div>

              <div className="rounded-xl border border-cyan/30 bg-cyan/5 p-3.5">
                <span className="font-mono text-[10px] uppercase text-cyan block mb-1">
                  Prescriptive Investigation Step
                </span>
                <p className="text-foreground leading-relaxed">
                  {selectedAlert.recommendedAction}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={() => {
                  onSelectAssetById(selectedAlert.assetId);
                  setSelectedAlert(null);
                }}
                className="font-mono text-xs font-semibold text-cyan hover:underline"
              >
                Open Equipment Drawer &rarr;
              </button>

              <div className="flex items-center gap-2">
                {selectedAlert.status === "Active" && (
                  <button
                    type="button"
                    onClick={() => handleAcknowledge(selectedAlert.id)}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground hover:border-green hover:text-green"
                  >
                    Acknowledge
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    handleAssign(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="rounded-xl border border-cyan/50 bg-cyan/15 px-3 py-2 text-xs font-semibold text-cyan hover:bg-cyan hover:text-primary-foreground"
                >
                  Assign Tech
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onAskAiAboutAlert?.(selectedAlert.description);
                    setSelectedAlert(null);
                  }}
                  className="rounded-xl bg-cyan px-3 py-2 text-xs font-bold text-primary-foreground hover:brightness-110"
                >
                  Investigate with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
