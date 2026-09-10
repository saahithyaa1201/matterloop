import { useState, useMemo } from "react";
import { Reveal, Section, SectionHeading } from "./primitives";
import {
  facilities,
  FacilityId,
  initialAssets,
  initialNotifications,
  AssetRecord,
  LifecycleStage,
  NotificationItem,
} from "./dashboard/dashboardData";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { KpiCards } from "./dashboard/KpiCards";
import { HealthChart } from "./dashboard/HealthChart";
import { LifecycleFlow } from "./dashboard/LifecycleFlow";
import { FilterBar, FilterState } from "./dashboard/FilterBar";
import { AssetTable } from "./dashboard/AssetTable";
import { AssetDetailDrawer } from "./dashboard/AssetDetailDrawer";
import { MaintenancePanel } from "./dashboard/MaintenancePanel";
import { AlertsPanel } from "./dashboard/AlertsPanel";
import { AiAssistantModal } from "./dashboard/AiAssistantModal";
import { NotificationsDrawer } from "./dashboard/NotificationsDrawer";
import { QuickActions } from "./dashboard/QuickActions";

export function Dashboard() {
  // Master Dashboard State
  const [selectedFacility, setSelectedFacility] = useState<FacilityId>("colombo");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<"24H" | "7D" | "30D" | "90D">("7D");
  const [selectedStage, setSelectedStage] = useState<LifecycleStage>("Monitoring");
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    type: "All",
    health: "All",
    lifecycle: "All",
    maintenance: "All",
    risk: "All",
  });

  // Modal / Drawer states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string | undefined>(undefined);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Asset Dataset filtered by Facility
  const facilityAssets = useMemo(() => {
    return initialAssets.filter(
      (a) => a.facilityId === selectedFacility || selectedFacility === "colombo"
    );
  }, [selectedFacility]);

  // Unique Asset Types for dropdown
  const assetTypes = useMemo(() => {
    return Array.from(new Set(initialAssets.map((a) => a.type)));
  }, []);

  // Filtered Assets based on search & all filter dropdowns
  const filteredAssets = useMemo(() => {
    return facilityAssets.filter((asset) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          asset.name.toLowerCase().includes(q) ||
          asset.id.toLowerCase().includes(q) ||
          asset.type.toLowerCase().includes(q) ||
          asset.location.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Type filter
      if (filters.type !== "All" && asset.type !== filters.type) {
        return false;
      }

      // Health filter
      if (filters.health !== "All" && asset.healthStatus !== filters.health) {
        return false;
      }

      // Lifecycle filter
      if (filters.lifecycle !== "All" && asset.lifecycleStage !== filters.lifecycle) {
        return false;
      }

      // Maintenance filter
      if (filters.maintenance !== "All" && asset.maintenanceStatus !== filters.maintenance) {
        return false;
      }

      // Risk filter
      if (filters.risk !== "All" && asset.risk !== filters.risk) {
        return false;
      }

      return true;
    });
  }, [facilityAssets, searchQuery, filters]);

  // Cross-component handlers
  const handleSelectAssetById = (assetId: string) => {
    const found = initialAssets.find((a) => a.id === assetId);
    if (found) {
      setSelectedAsset(found);
    }
  };

  const handleAskAiAboutAsset = (assetName: string) => {
    setAiPrompt(`Provide deep telemetry breakdown and risk assessment for ${assetName}.`);
    setIsAiAssistantOpen(true);
  };

  const handleAskAiAboutAlert = (alertDesc: string) => {
    setAiPrompt(`Analyze root cause for anomaly: ${alertDesc}`);
    setIsAiAssistantOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      type: "All",
      health: "All",
      lifecycle: "All",
      maintenance: "All",
      risk: "All",
    });
    setSearchQuery("");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <Section id="dashboard" className="relative py-16 md:py-24">
      <SectionHeading
        eyebrow="Interactive Operations Command Center"
        title="Explore MatterLoop in Action."
        subtitle="Simulate real-time telemetry, predictive health vectors, and asset lifecycle decisions across connected industrial facilities."
      />

      {/* Main Dashboard Container */}
      <Reveal delay={0.1} className="mt-10">
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-2xl backdrop-blur-2xl">
          {/* 1. Dashboard Header */}
          <DashboardHeader
            selectedFacility={selectedFacility}
            onFacilityChange={setSelectedFacility}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            unreadNotificationsCount={unreadNotificationsCount}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenAiAssistant={() => {
              setAiPrompt(undefined);
              setIsAiAssistantOpen(true);
            }}
          />

          {/* 2. Interactive KPI Cards */}
          <KpiCards
            facility={facilities[selectedFacility]}
            assets={filteredAssets}
            onSelectAsset={setSelectedAsset}
            onFilterByHealth={(health) =>
              setFilters((prev) => ({ ...prev, health: health as FilterState["health"] }))
            }
          />

          {/* 3. Operational Body Grid */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Quick Actions Bar */}
            <QuickActions
              onOpenAiAssistant={() => {
                setAiPrompt(undefined);
                setIsAiAssistantOpen(true);
              }}
              onOpenAlertsView={() => {
                const alertsEl = document.getElementById("dashboard-alerts-section");
                alertsEl?.scrollIntoView({ behavior: "smooth" });
              }}
              onOpenMaintenanceView={() => {
                const maintEl = document.getElementById("dashboard-maint-section");
                maintEl?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* 4. Asset Lifecycle Visualization */}
            <LifecycleFlow
              selectedStage={selectedStage}
              onSelectStage={setSelectedStage}
              onFilterByLifecycle={(stage) =>
                setFilters((prev) => ({ ...prev, lifecycle: stage }))
              }
            />

            {/* 5. Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-12">
                <HealthChart
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                />
              </div>
            </div>

            {/* 6. Filter Controls */}
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              totalFiltered={filteredAssets.length}
              totalAvailable={facilityAssets.length}
              assetTypes={assetTypes}
            />

            {/* 7. Equipment Fleet Register Table */}
            <AssetTable
              assets={filteredAssets}
              onSelectAsset={setSelectedAsset}
            />

            {/* 8. Intelligence & Operational Panels */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div id="dashboard-maint-section">
                <MaintenancePanel onSelectAssetById={handleSelectAssetById} />
              </div>
              <div id="dashboard-alerts-section">
                <AlertsPanel
                  onSelectAssetById={handleSelectAssetById}
                  onAskAiAboutAlert={handleAskAiAboutAlert}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Slide-over Asset Detail Drawer */}
      <AssetDetailDrawer
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onAskAiAboutAsset={handleAskAiAboutAsset}
        onViewLifecycleStage={(stage) => {
          setSelectedStage(stage);
          setFilters((prev) => ({ ...prev, lifecycle: stage }));
        }}
      />

      {/* AI Assistant Chatbot Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onSelectAssetById={handleSelectAssetById}
        onOpenMaintenance={() => {
          const el = document.getElementById("dashboard-maint-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onFilterRiskCritical={() => {
          setFilters((prev) => ({ ...prev, risk: "Critical" }));
        }}
        initialPrompt={aiPrompt}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onSelectAssetById={handleSelectAssetById}
      />
    </Section>
  );
}
