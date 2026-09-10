import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Activity, ShieldCheck, AlertCircle, Flame } from "lucide-react";
import { healthChartData } from "./dashboardData";

interface HealthChartProps {
  timeRange: "24H" | "7D" | "30D" | "90D";
  onTimeRangeChange: (r: "24H" | "7D" | "30D" | "90D") => void;
}

export function HealthChart({
  timeRange,
  onTimeRangeChange,
}: HealthChartProps) {
  const data = healthChartData[timeRange];

  return (
    <div className="rounded-2xl border border-border/80 bg-card/70 p-4 sm:p-6 shadow-xs backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan" />
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Asset Health & Degradation Trajectory
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Continuous health telemetry index aggregated across vibration, acoustic, and thermal sensor arrays.
          </p>
        </div>

        {/* Legend and Time Range Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-cyan" />
              Healthy
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber" />
              Warning
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-coral" />
              Critical
            </span>
          </div>

          <div className="flex items-center rounded-lg border border-border/70 bg-surface/50 p-0.5">
            {(["24H", "7D", "30D", "90D"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onTimeRangeChange(r)}
                className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold transition-colors ${
                  timeRange === r
                    ? "bg-cyan text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="mt-5 h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="healthyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#666e52" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#666e52" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ae8466" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ae8466" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#75553c" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#75553c" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(102, 110, 82, 0.15)"
              vertical={false}
            />

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
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl font-mono text-xs">
                      <div className="font-bold text-foreground border-b border-border/50 pb-1.5 mb-1.5">
                        Timestamp: {label}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4 text-cyan">
                          <span>Healthy Nodes:</span>
                          <span className="font-bold">{payload[0]?.value}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-amber">
                          <span>Warning Threshold:</span>
                          <span className="font-bold">{payload[1]?.value}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-coral">
                          <span>Critical Degradation:</span>
                          <span className="font-bold">{payload[2]?.value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="healthy"
              stroke="#666e52"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#healthyGradient)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="warning"
              stroke="#ae8466"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#warningGradient)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="critical"
              stroke="#75553c"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#criticalGradient)"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan" />
          <span>Nominal Stability: 94.2% Fleet-wide</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-3.5 w-3.5 text-amber" />
          <span>Pre-emptive Service: 7 Units</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="h-3.5 w-3.5 text-coral" />
          <span>Spindle Overheating: AST-042 (86°C)</span>
        </div>
      </div>
    </div>
  );
}
