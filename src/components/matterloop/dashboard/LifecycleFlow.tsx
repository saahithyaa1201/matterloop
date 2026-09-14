import {
  Rocket,
  Play,
  Activity,
  Wrench,
  TrendingUp,
  Archive,
  ArrowRight,
  Info,
} from "lucide-react";
import { LifecycleStage, lifecycleStageMeta } from "./dashboardData";

interface LifecycleFlowProps {
  selectedStage: LifecycleStage;
  onSelectStage: (stage: LifecycleStage) => void;
  onFilterByLifecycle?: (stage: LifecycleStage) => void;
}

const stageIcons = {
  Deployment: Rocket,
  Operation: Play,
  Monitoring: Activity,
  Maintenance: Wrench,
  Optimization: TrendingUp,
  Retirement: Archive,
};

const stages: LifecycleStage[] = [
  "Deployment",
  "Operation",
  "Monitoring",
  "Maintenance",
  "Optimization",
  "Retirement",
];

export function LifecycleFlow({
  selectedStage,
  onSelectStage,
  onFilterByLifecycle,
}: LifecycleFlowProps) {
  const currentMeta = lifecycleStageMeta[selectedStage];

  return (
    <div className="rounded-2xl border border-border/80 bg-card/70 p-3.5 sm:p-6 shadow-xs backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Continuous Physical Asset Lifecycle Intelligence
            </h3>
            <span className="rounded-md border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan">
              INTERACTIVE FLOW
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Click any stage to inspect active fleet cohorts, key lifecycle performance vectors, and operational milestones.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onFilterByLifecycle?.(selectedStage)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-cyan/40 bg-cyan/10 px-3 py-1.5 text-xs font-bold text-cyan hover:bg-cyan hover:text-primary-foreground transition-all"
        >
          Filter Table by {selectedStage}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* 6-Stage Flow Pipeline */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((stage, idx) => {
          const Icon = stageIcons[stage];
          const isSelected = selectedStage === stage;
          const meta = lifecycleStageMeta[stage];

          return (
            <button
              key={stage}
              type="button"
              onClick={() => onSelectStage(stage)}
              className={`group relative flex flex-col justify-between rounded-xl border p-2.5 sm:p-3.5 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-cyan bg-cyan/15 shadow-md shadow-cyan/10 ring-1 ring-cyan"
                  : "border-border/70 bg-surface/40 hover:border-cyan/40 hover:bg-surface/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isSelected ? "text-cyan" : "text-muted-foreground"
                    }`}
                  >
                    STAGE 0{idx + 1}
                  </span>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors ${
                      isSelected
                        ? "border-cyan/50 bg-cyan text-primary-foreground"
                        : "border-border/80 bg-surface text-muted-foreground group-hover:border-cyan/40 group-hover:text-cyan"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                </div>

                <div className="mt-3 font-bold text-xs text-foreground tracking-tight">
                  {stage}
                </div>
                <div className="mt-1 font-mono text-lg font-black text-foreground">
                  {meta.count}
                  <span className="font-normal text-[10px] text-muted-foreground ml-1">
                    nodes
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-2.5 h-1 w-full rounded-full bg-cyan" />
              )}
            </button>
          );
        })}
      </div>

      {/* Contextual Information Panel */}
      <div className="mt-4 rounded-xl border border-cyan/30 bg-surface/50 p-4 backdrop-blur-md">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan">
                {selectedStage} Intelligence Context
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            </div>
            <p className="text-xs text-foreground/90 max-w-2xl leading-relaxed">
              {currentMeta.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-border/50">
            <div className="rounded-lg border border-border/80 bg-card px-3 py-1.5 font-mono text-xs">
              <span className="text-muted-foreground text-[10px] block uppercase">
                Stage Metrics
              </span>
              <span className="font-semibold text-foreground">
                {currentMeta.metrics}
              </span>
            </div>

            <div className="rounded-lg border border-border/80 bg-card px-3 py-1.5 font-mono text-xs">
              <span className="text-muted-foreground text-[10px] block uppercase">
                Sample Cohort
              </span>
              <span className="font-semibold text-cyan">
                {currentMeta.exampleAssets.join(", ")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
          <Info className="h-3 w-3 text-cyan" />
          <span>Operational Focus: {currentMeta.focus}</span>
        </div>
      </div>
    </div>
  );
}
