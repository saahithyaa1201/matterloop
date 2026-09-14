import { useState } from "react";
import {
  Building2,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  User,
  Clock,
  Check,
} from "lucide-react";
import { facilities, FacilityId } from "./dashboardData";

interface DashboardHeaderProps {
  selectedFacility: FacilityId;
  onFacilityChange: (id: FacilityId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  timeRange: "24H" | "7D" | "30D" | "90D";
  onTimeRangeChange: (r: "24H" | "7D" | "30D" | "90D") => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenAiAssistant: () => void;
}

export function DashboardHeader({
  selectedFacility,
  onFacilityChange,
  searchQuery,
  onSearchChange,
  timeRange,
  onTimeRangeChange,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenAiAssistant,
}: DashboardHeaderProps) {
  const [facilityDropdownOpen, setFacilityDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const currentFacility = facilities[selectedFacility];

  return (
    <header className="border-b border-border/80 bg-card/90 px-4 py-3 sm:px-6 backdrop-blur-xl">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Brand / Facility selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/40 bg-cyan/15 text-cyan font-bold font-mono text-sm">
              ML
            </div>
            <div>
              <span className="font-mono text-xs font-extrabold tracking-wider uppercase text-foreground">
                MatterLoop
              </span>
              <span className="ml-1.5 rounded-sm border border-cyan/40 bg-cyan/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-cyan">
                INTERACTIVE DEMO
              </span>
            </div>
          </div>

          <span className="h-4 w-px bg-border/80 hidden sm:block" />

          {/* Facility Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFacilityDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-cyan/50 hover:bg-surface focus:outline-hidden"
            >
              <Building2 className="h-3.5 w-3.5 text-cyan shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {currentFacility.name}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5 shrink-0" />
            </button>

            {facilityDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setFacilityDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-2xl border border-border bg-card p-2 shadow-xl backdrop-blur-2xl">
                  <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border/60">
                    Select Facility Workspace
                  </div>
                  {(Object.keys(facilities) as FacilityId[]).map((fId) => {
                    const f = facilities[fId];
                    const isSelected = fId === selectedFacility;
                    return (
                      <button
                        key={fId}
                        type="button"
                        onClick={() => {
                          onFacilityChange(fId);
                          setFacilityDropdownOpen(false);
                        }}
                        className={`mt-1 flex w-full items-start justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-cyan/15 text-cyan font-bold"
                            : "text-foreground hover:bg-surface/70"
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{f.name}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {f.location}
                          </div>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-cyan mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="relative flex-1 w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets, telemetry, tags (e.g. CNC, Spindle, AST-042)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-border/80 bg-surface/50 py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground hover:text-foreground"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Right: Date range, AI button, Notifications, Profile */}
        <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 w-full lg:w-auto">
          {/* Time range selector */}
          <div className="flex items-center rounded-xl border border-border/80 bg-surface/50 p-0.5 text-xs font-mono">
            <Clock className="ml-2 mr-1 h-3 w-3 text-muted-foreground hidden sm:inline-block" />
            {(["24H", "7D", "30D", "90D"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onTimeRangeChange(r)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  timeRange === r
                    ? "bg-cyan text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* AI Assistant Button */}
          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="group relative flex items-center gap-1.5 rounded-xl border border-cyan/50 bg-cyan/15 px-3 py-1.5 text-xs font-bold text-cyan transition-all duration-200 hover:bg-cyan hover:text-primary-foreground hover:shadow-md hover:shadow-cyan/25"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="hidden sm:inline">Ask</span> MatterLoop AI
          </button>

          {/* Notification Bell */}
          <button
            type="button"
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-border/80 bg-surface/60 text-foreground transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 font-mono text-[9px] font-bold text-white shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface/80 text-muted-foreground hover:border-cyan/50 hover:text-foreground"
            >
              <User className="h-4 w-4" />
            </button>

            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-1.5 w-56 rounded-2xl border border-border bg-card p-3 shadow-xl backdrop-blur-2xl">
                  <div className="font-semibold text-xs text-foreground">
                    Plant Operations Engineer
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    role: lead_reliability_eng
                  </div>
                  <div className="mt-2 pt-2 border-t border-border/60 text-[11px] space-y-1 text-muted-foreground">
                    <div>Facility: {currentFacility.name}</div>
                    <div>Telemetry Sync: Nominal (100ms)</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
