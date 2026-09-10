import { useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Thermometer,
  Activity,
  Layers,
} from "lucide-react";
import { AssetRecord } from "./dashboardData";

interface AssetTableProps {
  assets: AssetRecord[];
  onSelectAsset: (asset: AssetRecord) => void;
}

type SortField = "name" | "health" | "utilization" | "risk" | "type";

export function AssetTable({ assets, onSelectAsset }: AssetTableProps) {
  const [sortField, setSortField] = useState<SortField>("health");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let result = 0;
    if (sortField === "name") result = a.name.localeCompare(b.name);
    else if (sortField === "type") result = a.type.localeCompare(b.type);
    else if (sortField === "health") result = a.health - b.health;
    else if (sortField === "utilization") result = a.utilization - b.utilization;
    else if (sortField === "risk") {
      const riskWeight = { Low: 1, Moderate: 2, Elevated: 3, Critical: 4 };
      result = riskWeight[a.risk] - riskWeight[b.risk];
    }
    return sortDirection === "asc" ? result : -result;
  });

  const totalPages = Math.ceil(sortedAssets.length / pageSize) || 1;
  const paginatedAssets = sortedAssets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getHealthBadge = (health: number) => {
    if (health >= 85) {
      return "border-green/40 bg-green/10 text-green";
    }
    if (health >= 65) {
      return "border-amber/40 bg-amber/10 text-amber";
    }
    return "border-coral/40 bg-coral/10 text-coral";
  };

  const getRiskBadge = (risk: AssetRecord["risk"]) => {
    switch (risk) {
      case "Critical":
        return "border-coral/50 bg-coral/15 text-coral font-bold";
      case "Elevated":
        return "border-amber/50 bg-amber/15 text-amber font-semibold";
      case "Moderate":
        return "border-cyan/40 bg-cyan/10 text-cyan";
      default:
        return "border-border bg-surface text-muted-foreground";
    }
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card/70 shadow-xs backdrop-blur-md overflow-hidden">
      {/* Table Header */}
      <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan" />
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Equipment Fleet & Telemetry Register
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time status register for active machinery, robots, and connected transport assets. Click any row to inspect deep telemetry.
          </p>
        </div>

        <div className="text-xs font-mono text-muted-foreground self-end sm:self-auto">
          {sortedAssets.length} Assets Registered
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border/60 bg-surface/50 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="py-3 px-4 cursor-pointer hover:text-foreground"
              >
                <div className="flex items-center gap-1.5">
                  Asset
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort("type")}
                className="py-3 px-4 cursor-pointer hover:text-foreground hidden sm:table-cell"
              >
                <div className="flex items-center gap-1.5">
                  Type
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 hidden md:table-cell">Location</th>
              <th
                onClick={() => handleSort("health")}
                className="py-3 px-4 cursor-pointer hover:text-foreground"
              >
                <div className="flex items-center gap-1.5">
                  Health
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort("utilization")}
                className="py-3 px-4 cursor-pointer hover:text-foreground hidden sm:table-cell"
              >
                <div className="flex items-center gap-1.5">
                  Utilization
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 hidden lg:table-cell">Lifecycle Stage</th>
              <th className="py-3 px-4 hidden xl:table-cell">Maintenance</th>
              <th
                onClick={() => handleSort("risk")}
                className="py-3 px-4 cursor-pointer hover:text-foreground"
              >
                <div className="flex items-center gap-1.5">
                  Risk
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {paginatedAssets.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-muted-foreground">
                  No assets match the selected filter criteria.
                </td>
              </tr>
            ) : (
              paginatedAssets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className="group hover:bg-surface/60 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-foreground group-hover:text-cyan transition-colors">
                      {asset.name}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {asset.id}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 hidden sm:table-cell text-muted-foreground">
                    {asset.type}
                  </td>

                  <td className="py-3.5 px-4 hidden md:table-cell text-muted-foreground">
                    {asset.location}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${getHealthBadge(
                          asset.health
                        )}`}
                      >
                        <Activity className="h-3 w-3" />
                        {asset.health}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-surface-2 overflow-hidden">
                        <div
                          className="h-full bg-cyan rounded-full"
                          style={{ width: `${asset.utilization}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {asset.utilization}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 hidden lg:table-cell">
                    <span className="rounded-md border border-border/70 bg-surface/40 px-2 py-0.5 font-mono text-[10px] text-foreground">
                      {asset.lifecycleStage}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 hidden xl:table-cell">
                    <span
                      className={`font-mono text-[10px] ${
                        asset.maintenanceStatus === "Overdue"
                          ? "text-coral font-bold"
                          : asset.maintenanceStatus === "Due Soon"
                          ? "text-amber font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {asset.maintenanceStatus} ({asset.nextMaintenance})
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase ${getRiskBadge(
                        asset.risk
                      )}`}
                    >
                      {asset.risk}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAsset(asset);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface/50 px-2 py-1 font-mono text-[10px] text-muted-foreground group-hover:border-cyan group-hover:text-cyan transition-colors"
                    >
                      Inspect
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-border/60 bg-surface/30 px-4 py-3">
        <div className="text-xs text-muted-foreground font-mono">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
