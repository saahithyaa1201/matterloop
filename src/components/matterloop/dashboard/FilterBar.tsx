import { Filter, X, RotateCcw } from "lucide-react";
import { LifecycleStage, HealthStatus, RiskLevel, MaintenanceStatus } from "./dashboardData";

export interface FilterState {
  type: string;
  health: HealthStatus | "All";
  lifecycle: LifecycleStage | "All";
  maintenance: MaintenanceStatus | "All";
  risk: RiskLevel | "All";
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalAvailable: number;
  assetTypes: string[];
}

export function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalAvailable,
  assetTypes,
}: FilterBarProps) {
  const hasActiveFilters =
    filters.type !== "All" ||
    filters.health !== "All" ||
    filters.lifecycle !== "All" ||
    filters.maintenance !== "All" ||
    filters.risk !== "All";

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 p-3.5 sm:p-4 shadow-xs backdrop-blur-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Title / Active filter indicator */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan/40 bg-cyan/15 text-cyan shrink-0">
            <Filter className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              Fleet Filters
            </span>
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              Showing {totalFiltered} of {totalAvailable} assets
            </span>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Asset Type */}
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="w-full min-[440px]:w-auto min-w-0 max-w-full rounded-xl border border-border/80 bg-surface/60 px-2.5 py-1.5 text-xs text-foreground focus:border-cyan focus:outline-hidden"
          >
            <option value="All">All Asset Types</option>
            {assetTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Health */}
          <select
            value={filters.health}
            onChange={(e) =>
              onFilterChange({ ...filters, health: e.target.value as HealthStatus | "All" })
            }
            className="w-full min-[440px]:w-auto min-w-0 max-w-full rounded-xl border border-border/80 bg-surface/60 px-2.5 py-1.5 text-xs text-foreground focus:border-cyan focus:outline-hidden"
          >
            <option value="All">All Health States</option>
            <option value="Healthy">Healthy (≥ 80%)</option>
            <option value="Warning">Warning (60-79%)</option>
            <option value="Critical">Critical (&lt; 60%)</option>
          </select>

          {/* Lifecycle Stage */}
          <select
            value={filters.lifecycle}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                lifecycle: e.target.value as LifecycleStage | "All",
              })
            }
            className="w-full min-[440px]:w-auto min-w-0 max-w-full rounded-xl border border-border/80 bg-surface/60 px-2.5 py-1.5 text-xs text-foreground focus:border-cyan focus:outline-hidden"
          >
            <option value="All">All Lifecycle Stages</option>
            <option value="Deployment">Deployment</option>
            <option value="Operation">Operation</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Optimization">Optimization</option>
            <option value="Retirement">Retirement</option>
          </select>

          {/* Maintenance Status */}
          <select
            value={filters.maintenance}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maintenance: e.target.value as MaintenanceStatus | "All",
              })
            }
            className="w-full min-[440px]:w-auto min-w-0 max-w-full rounded-xl border border-border/80 bg-surface/60 px-2.5 py-1.5 text-xs text-foreground focus:border-cyan focus:outline-hidden"
          >
            <option value="All">All Maintenance</option>
            <option value="Nominal">Nominal</option>
            <option value="Due Soon">Due Soon</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Overdue">Overdue</option>
          </select>

          {/* Risk Level */}
          <select
            value={filters.risk}
            onChange={(e) =>
              onFilterChange({ ...filters, risk: e.target.value as RiskLevel | "All" })
            }
            className="w-full min-[440px]:w-auto min-w-0 max-w-full rounded-xl border border-border/80 bg-surface/60 px-2.5 py-1.5 text-xs text-foreground focus:border-cyan focus:outline-hidden"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Moderate">Moderate Risk</option>
            <option value="Elevated">Elevated Risk</option>
            <option value="Critical">Critical Risk</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 rounded-xl border border-coral/40 bg-coral/10 px-3 py-1.5 text-xs font-bold text-coral hover:bg-coral hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="mt-3 pt-2.5 border-t border-border/40 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase text-muted-foreground mr-1">
            Active:
          </span>
          {filters.type !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
              Type: {filters.type}
              <X
                className="h-2.5 w-2.5 cursor-pointer"
                onClick={() => onFilterChange({ ...filters, type: "All" })}
              />
            </span>
          )}
          {filters.health !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
              Health: {filters.health}
              <X
                className="h-2.5 w-2.5 cursor-pointer"
                onClick={() => onFilterChange({ ...filters, health: "All" })}
              />
            </span>
          )}
          {filters.lifecycle !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
              Stage: {filters.lifecycle}
              <X
                className="h-2.5 w-2.5 cursor-pointer"
                onClick={() => onFilterChange({ ...filters, lifecycle: "All" })}
              />
            </span>
          )}
          {filters.maintenance !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
              Maint: {filters.maintenance}
              <X
                className="h-2.5 w-2.5 cursor-pointer"
                onClick={() => onFilterChange({ ...filters, maintenance: "All" })}
              />
            </span>
          )}
          {filters.risk !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
              Risk: {filters.risk}
              <X
                className="h-2.5 w-2.5 cursor-pointer"
                onClick={() => onFilterChange({ ...filters, risk: "All" })}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
