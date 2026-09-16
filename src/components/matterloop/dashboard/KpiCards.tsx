import { useState } from "react";
import {
  Activity,
  Cpu,
  Gauge,
  Wrench,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  X,
  ShieldAlert,
} from "lucide-react";
import { Facility, AssetRecord } from "./dashboardData";

interface KpiCardsProps {
  facility: Facility;
  assets: AssetRecord[];
  onSelectAsset: (asset: AssetRecord) => void;
  onFilterByRisk?: (risk: string) => void;
  onFilterByHealth?: (health: string) => void;
}

export function KpiCards({
  facility,
  assets,
  onSelectAsset,
  onFilterByHealth,
}: KpiCardsProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Dynamic counts based on current assets
  const healthyCount = assets.filter((a) => a.healthStatus === "Healthy").length;
  const warningCount = assets.filter((a) => a.healthStatus === "Warning").length;
  const criticalCount = assets.filter((a) => a.healthStatus === "Critical").length;
  const overdueCount = assets.filter((a) => a.maintenanceStatus === "Overdue").length;

  const kpis = [
    {
      id: "assets",
      label: "Active Assets",
      value: facility.totalAssets.toLocaleString(),
      sub: "Connected Nodes",
      trend: "+2.4% vs last mo",
      trendPositive: true,
      icon: Cpu,
      tone: "text-cyan",
      badge: "Fleet Online",
      description: "Total telemetry nodes transmitting live machine state vectors.",
    },
    {
      id: "health",
      label: "Asset Health",
      value: `${facility.healthScore}%`,
      sub: `${criticalCount} Critical • ${warningCount} Warning`,
      trend: "+0.8% nominal",
      trendPositive: true,
      icon: Activity,
      tone: "text-green",
      badge: "Nominal Index",
      description: "Synthetic health index aggregating vibration, thermal & electrical stability.",
    },
    {
      id: "utilization",
      label: "Utilization",
      value: `${facility.utilization}%`,
      sub: "Fleet Operating Capacity",
      trend: "+1.6% efficiency",
      trendPositive: true,
      icon: Gauge,
      tone: "text-cyan",
      badge: "Optimal Range",
      description: "Calculated operational run-time against target production shift quotas.",
    },
    {
      id: "maintenance",
      label: "Maintenance Due",
      value: `${facility.maintenanceDueCount}`,
      sub: `${overdueCount} Overdue Interventions`,
      trend: "Action Required",
      trendPositive: false,
      icon: Wrench,
      tone: "text-amber",
      badge: "Active Queue",
      description: "Automated work orders flagged by predictive condition degradation models.",
    },
    {
      id: "downtime",
      label: "Downtime",
      value: `${facility.downtimeHours}h`,
      sub: "Past 30d Cumulative",
      trend: "-18% MTTR",
      trendPositive: true,
      icon: Clock,
      tone: "text-green",
      badge: "0.2% Line Loss",
      description: "Total unplanned stoppage across all manufacturing cells.",
    },
    {
      id: "risk",
      label: "Operational Risk",
      value: `${facility.criticalRiskCount} High Risk`,
      sub: "Failure Probability > 0.70",
      trend: "Immediate Review",
      trendPositive: false,
      icon: AlertTriangle,
      tone: "text-coral",
      badge: "Priority",
      description: "Assets with imminent component failure risks within the next 72 hours.",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 p-4 border-b sm:gap-4 sm:p-6 lg:grid-cols-6 border-border/80 bg-surface/30">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <button
              key={kpi.id}
              type="button"
              onClick={() => setActiveModal(kpi.id)}
              className="group flex flex-col justify-between text-left rounded-2xl border border-border/80 bg-card/75 p-3.5 sm:p-4 transition-all duration-200 hover:border-cyan/50 hover:bg-card hover:shadow-lg hover:shadow-cyan/10 hover:-translate-y-0.5 focus:outline-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {kpi.label}
                  </span>
                  <div className="flex items-center justify-center w-6 h-6 transition-colors border rounded-lg border-border/80 bg-surface/60 text-muted-foreground group-hover:border-cyan/40 group-hover:text-cyan">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mt-2.5 font-mono text-xl sm:text-2xl font-black tracking-tight text-foreground">
                  {kpi.value}
                </div>

                <div className="mt-1 text-[11px] text-muted-foreground truncate">
                  {kpi.sub}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono">
                <span
                  className={`inline-flex items-center gap-0.5 font-semibold ${
                    kpi.trendPositive ? "text-green" : "text-amber"
                  }`}
                >
                  {kpi.trendPositive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {kpi.trend}
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-cyan group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </div>

      {/* KPI Detail Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl p-6 border shadow-2xl rounded-3xl border-border bg-card backdrop-blur-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-border/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 border rounded-xl border-cyan/40 bg-cyan/15 text-cyan">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {activeModal === "health"
                      ? "Asset Health Overview & Diagnostics"
                      : activeModal === "risk"
                      ? "Operational Risk Analysis"
                      : activeModal === "maintenance"
                      ? "Maintenance Schedule & Work Orders"
                      : "Fleet Metric Deep Dive"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Facility: {facility.name} • Live Sensor Ingestion Active
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-xl border border-border/80 p-1.5 text-muted-foreground hover:border-cyan/50 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Health Overview Breakdown */}
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div
                  onClick={() => {
                    onFilterByHealth?.("Healthy");
                    setActiveModal(null);
                  }}
                  className="p-3 transition-colors border cursor-pointer rounded-xl border-green/30 bg-green/10 hover:border-green"
                >
                  <div className="font-mono text-2xl font-bold text-green">
                    {healthyCount}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-green font-bold">
                    Healthy Assets
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Nominal telemetry
                  </div>
                </div>

                <div
                  onClick={() => {
                    onFilterByHealth?.("Warning");
                    setActiveModal(null);
                  }}
                  className="p-3 transition-colors border cursor-pointer rounded-xl border-amber/30 bg-amber/10 hover:border-amber"
                >
                  <div className="font-mono text-2xl font-bold text-amber">
                    {warningCount}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-amber font-bold">
                    Warning Assets
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Early drift detected
                  </div>
                </div>

                <div
                  onClick={() => {
                    onFilterByHealth?.("Critical");
                    setActiveModal(null);
                  }}
                  className="p-3 transition-colors border cursor-pointer rounded-xl border-coral/30 bg-coral/10 hover:border-coral"
                >
                  <div className="font-mono text-2xl font-bold text-coral">
                    {criticalCount}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-coral font-bold">
                    Critical Assets
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Imminent risk
                  </div>
                </div>
              </div>

              {/* Highest Risk Asset Quick List */}
              <div className="mt-4">
                <div className="mb-2 font-mono text-xs font-bold tracking-wider uppercase text-muted-foreground">
                  Highest-Risk Equipment Requiring Attention
                </div>
                <div className="space-y-2">
                  {assets.slice(0, 3).map((a) => (
                    <div
                      key={a.id}
                      onClick={() => {
                        onSelectAsset(a);
                        setActiveModal(null);
                      }}
                      className="flex items-center justify-between p-3 transition-all border cursor-pointer rounded-xl border-border/80 bg-surface/50 hover:border-cyan/50 hover:bg-surface"
                    >
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          {a.name}{" "}
                          <span className="font-mono text-[10px] text-muted-foreground">
                            ({a.id})
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {a.location} • Stage: {a.lifecycleStage}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                            a.health < 60
                              ? "bg-coral/15 text-coral border border-coral/40"
                              : a.health < 80
                              ? "bg-amber/15 text-amber border border-amber/40"
                              : "bg-green/15 text-green border border-green/40"
                          }`}
                        >
                          {a.health}% Health
                        </span>
                        <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                          Inspect &rarr;
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 mt-6 border-t border-border/60">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold border rounded-xl border-border bg-surface text-foreground hover:border-cyan/50"
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
