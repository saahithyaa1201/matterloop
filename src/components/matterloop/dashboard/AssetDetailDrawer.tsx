import { useState } from "react";
import {
  X,
  Activity,
  Thermometer,
  Gauge,
  Clock,
  Calendar,
  ShieldAlert,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { AssetRecord } from "./dashboardData";

interface AssetDetailDrawerProps {
  asset: AssetRecord | null;
  onClose: () => void;
  onAskAiAboutAsset?: (assetName: string) => void;
  onViewLifecycleStage?: (stage: AssetRecord["lifecycleStage"]) => void;
}

export function AssetDetailDrawer({
  asset,
  onClose,
  onAskAiAboutAsset,
  onViewLifecycleStage,
}: AssetDetailDrawerProps) {
  const [activeActionModal, setActiveActionModal] = useState<string | null>(null);

  if (!asset) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        {/* Backdrop click */}
        <div className="flex-1" onClick={onClose} />

        {/* Drawer panel */}
        <div className="relative h-full w-full max-w-xl overflow-y-auto border-l border-border bg-card p-6 shadow-2xl backdrop-blur-2xl sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border/70 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan">
                  {asset.id}
                </span>
                <span className="rounded-md border border-border/80 bg-surface/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
                  {asset.type}
                </span>
              </div>
              <h2 className="mt-1.5 text-xl font-bold text-foreground">
                {asset.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                Location: {asset.location}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border/80 p-2 text-muted-foreground hover:border-cyan/50 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl border border-border/70 bg-surface/40 p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Health Score
              </span>
              <div
                className={`mt-1 font-mono text-xl font-bold ${
                  asset.health >= 85
                    ? "text-green"
                    : asset.health >= 65
                    ? "text-amber"
                    : "text-coral"
                }`}
              >
                {asset.health}%
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                {asset.healthStatus}
              </span>
            </div>

            <div className="rounded-xl border border-border/70 bg-surface/40 p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Utilization
              </span>
              <div className="mt-1 font-mono text-xl font-bold text-foreground">
                {asset.utilization}%
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                Run-time Index
              </span>
            </div>

            <div className="rounded-xl border border-border/70 bg-surface/40 p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Operating Hours
              </span>
              <div className="mt-1 font-mono text-xl font-bold text-foreground">
                {asset.operatingHours.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                Cumulative
              </span>
            </div>

            <div className="rounded-xl border border-border/70 bg-surface/40 p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Risk Status
              </span>
              <div
                className={`mt-1 font-mono text-xl font-bold ${
                  asset.risk === "Critical"
                    ? "text-coral"
                    : asset.risk === "Elevated"
                    ? "text-amber"
                    : "text-cyan"
                }`}
              >
                {asset.risk}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                Failure Risk
              </span>
            </div>
          </div>

          {/* Historical Performance Chart */}
          <div className="mt-6 rounded-xl border border-border/80 bg-surface/40 p-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                7-Day Health & Utilization Trend
              </span>
              <span className="font-mono text-[10px] text-cyan">
                Telemetry Log
              </span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={asset.history} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="time"
                    stroke="rgba(102, 110, 82, 0.4)"
                    fontSize={10}
                    tickLine={false}
                    fontFamily="JetBrains Mono, monospace"
                  />
                  <YAxis
                    stroke="rgba(102, 110, 82, 0.4)"
                    fontSize={10}
                    tickLine={false}
                    fontFamily="JetBrains Mono, monospace"
                    domain={[30, 100]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-card p-2 text-xs font-mono shadow-md">
                            <div className="font-bold text-foreground">{label}</div>
                            <div className="text-cyan">
                              Health: {payload[0]?.value}%
                            </div>
                            <div className="text-muted-foreground">
                              Utilization: {payload[1]?.value}%
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="health"
                    stroke="#666e52"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="utilization"
                    stroke="#ae8466"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Sensor Telemetry */}
          <div className="mt-6 rounded-xl border border-border/80 bg-surface/40 p-4">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Live Sensor Ingestion Telemetry
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg border border-border/60 bg-card p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                  <Activity className="h-3.5 w-3.5 text-coral" />
                  Vibration
                </div>
                <div className="mt-1 font-mono text-base font-bold text-foreground">
                  {asset.telemetry.vibration} <span className="text-[10px] font-normal">mm/s</span>
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-card p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                  <Thermometer className="h-3.5 w-3.5 text-amber" />
                  Temperature
                </div>
                <div className="mt-1 font-mono text-base font-bold text-foreground">
                  {asset.telemetry.temp}°C
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-card p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                  <Gauge className="h-3.5 w-3.5 text-cyan" />
                  Motor Load
                </div>
                <div className="mt-1 font-mono text-base font-bold text-foreground">
                  {asset.telemetry.load}%
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-card p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                  <Cpu className="h-3.5 w-3.5 text-green" />
                  Efficiency
                </div>
                <div className="mt-1 font-mono text-base font-bold text-foreground">
                  {asset.telemetry.efficiency}%
                </div>
              </div>
            </div>
          </div>

          {/* Lifecycle & Maintenance Overview */}
          <div className="mt-6 space-y-3 rounded-xl border border-border/80 bg-surface/30 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Lifecycle Stage:</span>
              <span className="font-bold text-cyan font-mono">
                {asset.lifecycleStage}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Maintenance:</span>
              <span className="font-mono text-foreground">{asset.lastMaintenance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next Scheduled Window:</span>
              <span className="font-mono font-semibold text-amber">
                {asset.nextMaintenance} ({asset.maintenanceStatus})
              </span>
            </div>
            {asset.recommendedAction && (
              <div className="mt-2 pt-2 border-t border-border/50">
                <span className="text-[11px] font-bold text-foreground block mb-1">
                  AI Prescriptive Recommendation:
                </span>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {asset.recommendedAction}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 pt-4 border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                onViewLifecycleStage?.(asset.lifecycleStage);
                onClose();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-bold text-foreground hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              <Layers className="h-3.5 w-3.5" />
              View Lifecycle
            </button>

            <button
              type="button"
              onClick={() => setActiveActionModal("maint-history")}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-bold text-foreground hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              <Calendar className="h-3.5 w-3.5" />
              Maintenance History
            </button>

            <button
              type="button"
              onClick={() => setActiveActionModal("signals")}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-bold text-foreground hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              <Activity className="h-3.5 w-3.5" />
              View Signals
            </button>

            <button
              type="button"
              onClick={() => setActiveActionModal("create-task")}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan px-3 py-2.5 text-xs font-bold text-primary-foreground hover:brightness-110 shadow-sm transition-all"
            >
              <Wrench className="h-3.5 w-3.5" />
              Create Task
            </button>
          </div>

          {/* Ask AI Contextual Shortcut */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                onAskAiAboutAsset?.(asset.name);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 py-2.5 text-xs font-bold text-cyan hover:bg-cyan hover:text-primary-foreground transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask MatterLoop AI about {asset.name}
            </button>
          </div>
        </div>
      </div>

      {/* Action Sub-Modals */}
      {activeActionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-sm text-foreground">
                {activeActionModal === "maint-history"
                  ? `Maintenance Log — ${asset.name}`
                  : activeActionModal === "signals"
                  ? `Raw Edge Signals — ${asset.name}`
                  : `Schedule Maintenance — ${asset.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setActiveActionModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 text-xs text-muted-foreground space-y-2">
              {activeActionModal === "maint-history" && (
                <div className="space-y-2">
                  <div className="rounded-lg border border-border/70 bg-surface/40 p-2.5">
                    <div className="font-bold text-foreground">2026-07-15: Spindle Alignment</div>
                    <div className="text-[11px]">Completed by Technician Vance • Replaced seal rings.</div>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-surface/40 p-2.5">
                    <div className="font-bold text-foreground">2026-05-10: 5000h Overhaul</div>
                    <div className="text-[11px]">Full calibration and electrical resistance test passed.</div>
                  </div>
                </div>
              )}

              {activeActionModal === "signals" && (
                <div className="font-mono text-[11px] space-y-1 bg-surface/50 p-3 rounded-xl border border-border/60">
                  <div>VIB_AXIS_X: {asset.telemetry.vibration} mm/s (HIGH)</div>
                  <div>THERM_PROBE_01: {asset.telemetry.temp} °C</div>
                  <div>MOTOR_AMPS_RMS: 34.2 A</div>
                  <div>PRESSURE_PSI: {asset.telemetry.pressure ?? 48} psi</div>
                  <div>SAMPLE_FREQ: 1000 Hz / Edge FFT Active</div>
                </div>
              )}

              {activeActionModal === "create-task" && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-foreground mb-1">
                      Work Order Description
                    </label>
                    <input
                      type="text"
                      defaultValue={`Urgent inspection for ${asset.name} (${asset.id})`}
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-green font-mono text-xs">
                    <CheckCircle className="h-4 w-4" />
                    <span>Work order dispatched to Plant Alpha mechanical crew.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end pt-3 border-t border-border/60">
              <button
                type="button"
                onClick={() => setActiveActionModal(null)}
                className="rounded-xl bg-cyan px-4 py-1.5 text-xs font-bold text-primary-foreground hover:brightness-110"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
