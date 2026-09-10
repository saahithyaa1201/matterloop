export type FacilityId = "colombo" | "newyork" | "regional";

export interface Facility {
  id: FacilityId;
  name: string;
  location: string;
  timezone: string;
  totalAssets: number;
  healthScore: number;
  utilization: number;
  downtimeHours: number;
  maintenanceDueCount: number;
  criticalRiskCount: number;
}

export type LifecycleStage =
  | "Deployment"
  | "Operation"
  | "Monitoring"
  | "Maintenance"
  | "Optimization"
  | "Retirement";

export type HealthStatus = "Healthy" | "Warning" | "Critical";
export type RiskLevel = "Low" | "Moderate" | "Elevated" | "Critical";
export type MaintenanceStatus = "Nominal" | "Due Soon" | "Scheduled" | "Overdue";

export interface AssetRecord {
  id: string;
  name: string;
  type: string;
  facilityId: FacilityId;
  location: string;
  health: number;
  healthStatus: HealthStatus;
  utilization: number;
  operatingHours: number;
  lifecycleStage: LifecycleStage;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceStatus: MaintenanceStatus;
  risk: RiskLevel;
  telemetry: {
    temp: number; // °C
    vibration: number; // mm/s
    load: number; // %
    pressure?: number; // bar
    efficiency: number; // %
  };
  history: Array<{ time: string; health: number; utilization: number }>;
  recommendedAction?: string;
}

export interface OperationalAlert {
  id: string;
  severity: "Critical" | "Warning" | "Info";
  title: string;
  assetId: string;
  assetName: string;
  timestamp: string;
  description: string;
  status: "Active" | "Acknowledged" | "Assigned";
  recommendedAction: string;
}

export interface MaintenanceRecommendation {
  id: string;
  assetId: string;
  assetName: string;
  detectedCondition: string;
  riskLevel: RiskLevel;
  recommendedAction: string;
  suggestedWindow: string;
  workOrderType: "Predictive Inspection" | "Bearing Replacement" | "Calibration" | "Overhaul";
  status: "Due" | "Scheduled" | "Predicted" | "Overdue";
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: "Alert" | "Maintenance" | "Lifecycle" | "System";
  timestamp: string;
  read: boolean;
  assetId?: string;
}

export const facilities: Record<FacilityId, Facility> = {
  colombo: {
    id: "colombo",
    name: "Colombo Manufacturing Hub",
    location: "Plant Alpha, Western Industrial Zone",
    timezone: "UTC+05:30",
    totalAssets: 482,
    healthScore: 94.2,
    utilization: 88.6,
    downtimeHours: 1.8,
    maintenanceDueCount: 7,
    criticalRiskCount: 3,
  },
  newyork: {
    id: "newyork",
    name: "New York Operations Center",
    location: "Facility 04, Hudson Logistics Park",
    timezone: "UTC-05:00",
    totalAssets: 340,
    healthScore: 96.8,
    utilization: 91.2,
    downtimeHours: 0.9,
    maintenanceDueCount: 4,
    criticalRiskCount: 1,
  },
  regional: {
    id: "regional",
    name: "Regional Distribution Facility",
    location: "Logistics Terminal 12, Midwest Node",
    timezone: "UTC-06:00",
    totalAssets: 615,
    healthScore: 91.5,
    utilization: 84.1,
    downtimeHours: 3.4,
    maintenanceDueCount: 12,
    criticalRiskCount: 5,
  },
};

export const initialAssets: AssetRecord[] = [
  {
    id: "AST-042",
    name: "CNC Machine 042",
    type: "Milling Array",
    facilityId: "colombo",
    location: "Machining Bay 3",
    health: 54,
    healthStatus: "Critical",
    utilization: 94,
    operatingHours: 8420,
    lifecycleStage: "Maintenance",
    lastMaintenance: "2026-07-15",
    nextMaintenance: "2026-09-12",
    maintenanceStatus: "Overdue",
    risk: "Critical",
    telemetry: { temp: 86, vibration: 7.8, load: 96, pressure: 5.2, efficiency: 71 },
    recommendedAction: "Perform spindle bearing rebuild and vibration damping recalibration.",
    history: [
      { time: "-6d", health: 88, utilization: 92 },
      { time: "-5d", health: 82, utilization: 94 },
      { time: "-4d", health: 78, utilization: 95 },
      { time: "-3d", health: 71, utilization: 92 },
      { time: "-2d", health: 63, utilization: 96 },
      { time: "-1d", health: 58, utilization: 95 },
      { time: "Now", health: 54, utilization: 94 },
    ],
  },
  {
    id: "AST-018",
    name: "Robotic Arm 018",
    type: "6-Axis Articulated Robot",
    facilityId: "colombo",
    location: "Assembly Cell 2",
    health: 76,
    healthStatus: "Warning",
    utilization: 82,
    operatingHours: 6190,
    lifecycleStage: "Monitoring",
    lastMaintenance: "2026-08-02",
    nextMaintenance: "2026-09-14",
    maintenanceStatus: "Due Soon",
    risk: "Elevated",
    telemetry: { temp: 72, vibration: 4.2, load: 84, efficiency: 86 },
    recommendedAction: "Axis 4 gear train harmonic inspection and servo grease renewal.",
    history: [
      { time: "-6d", health: 85, utilization: 80 },
      { time: "-5d", health: 84, utilization: 81 },
      { time: "-4d", health: 82, utilization: 83 },
      { time: "-3d", health: 79, utilization: 82 },
      { time: "-2d", health: 77, utilization: 82 },
      { time: "-1d", health: 76, utilization: 83 },
      { time: "Now", health: 76, utilization: 82 },
    ],
  },
  {
    id: "AST-007",
    name: "Conveyor System 07",
    type: "Heavy Belt Conveyor",
    facilityId: "colombo",
    location: "Transfer Line A",
    health: 98,
    healthStatus: "Healthy",
    utilization: 89,
    operatingHours: 11450,
    lifecycleStage: "Operation",
    lastMaintenance: "2026-08-28",
    nextMaintenance: "2026-10-15",
    maintenanceStatus: "Nominal",
    risk: "Low",
    telemetry: { temp: 42, vibration: 1.1, load: 74, efficiency: 97 },
    recommendedAction: "Routine optical sensor alignment check on next shift change.",
    history: [
      { time: "-6d", health: 97, utilization: 88 },
      { time: "-5d", health: 98, utilization: 89 },
      { time: "-4d", health: 98, utilization: 90 },
      { time: "-3d", health: 98, utilization: 89 },
      { time: "-2d", health: 99, utilization: 91 },
      { time: "-1d", health: 98, utilization: 88 },
      { time: "Now", health: 98, utilization: 89 },
    ],
  },
  {
    id: "AST-021",
    name: "Industrial Press 021",
    type: "Hydraulic Stamping Press",
    facilityId: "colombo",
    location: "Forming Dept 1",
    health: 92,
    healthStatus: "Healthy",
    utilization: 91,
    operatingHours: 9320,
    lifecycleStage: "Optimization",
    lastMaintenance: "2026-08-10",
    nextMaintenance: "2026-09-24",
    maintenanceStatus: "Scheduled",
    risk: "Low",
    telemetry: { temp: 58, vibration: 2.3, load: 88, pressure: 210, efficiency: 94 },
    recommendedAction: "Pressure manifold valve test scheduled for next weekend.",
    history: [
      { time: "-6d", health: 93, utilization: 90 },
      { time: "-5d", health: 92, utilization: 91 },
      { time: "-4d", health: 91, utilization: 92 },
      { time: "-3d", health: 93, utilization: 91 },
      { time: "-2d", health: 92, utilization: 90 },
      { time: "-1d", health: 92, utilization: 92 },
      { time: "Now", health: 92, utilization: 91 },
    ],
  },
  {
    id: "AST-114",
    name: "Fleet Vehicle 114",
    type: "Autonomous Guided Tug (AGV)",
    facilityId: "colombo",
    location: "Logistics Corridor 4",
    health: 88,
    healthStatus: "Healthy",
    utilization: 95,
    operatingHours: 4210,
    lifecycleStage: "Operation",
    lastMaintenance: "2026-08-18",
    nextMaintenance: "2026-10-01",
    maintenanceStatus: "Nominal",
    risk: "Low",
    telemetry: { temp: 46, vibration: 1.8, load: 85, efficiency: 92 },
    recommendedAction: "LiDAR lens cleaning recommended during battery dock cycle.",
    history: [
      { time: "-6d", health: 89, utilization: 94 },
      { time: "-5d", health: 88, utilization: 95 },
      { time: "-4d", health: 88, utilization: 96 },
      { time: "-3d", health: 87, utilization: 95 },
      { time: "-2d", health: 88, utilization: 94 },
      { time: "-1d", health: 88, utilization: 95 },
      { time: "Now", health: 88, utilization: 95 },
    ],
  },
  {
    id: "AST-003",
    name: "Packaging Line 03",
    type: "High-Speed Cartoning Array",
    facilityId: "colombo",
    location: "Packaging Bay 1",
    health: 68,
    healthStatus: "Warning",
    utilization: 62,
    operatingHours: 13800,
    lifecycleStage: "Monitoring",
    lastMaintenance: "2026-07-22",
    nextMaintenance: "2026-09-18",
    maintenanceStatus: "Due Soon",
    risk: "Elevated",
    telemetry: { temp: 64, vibration: 3.9, load: 60, efficiency: 74 },
    recommendedAction: "Seal heat coil replacement and rotary encoder synchronization.",
    history: [
      { time: "-6d", health: 79, utilization: 84 },
      { time: "-5d", health: 76, utilization: 78 },
      { time: "-4d", health: 74, utilization: 73 },
      { time: "-3d", health: 71, utilization: 69 },
      { time: "-2d", health: 69, utilization: 65 },
      { time: "-1d", health: 68, utilization: 63 },
      { time: "Now", health: 68, utilization: 62 },
    ],
  },
  {
    id: "AST-108",
    name: "Laser Cutting Array 08",
    type: "Fiber Laser Cutter",
    facilityId: "newyork",
    location: "Precision Fabrication",
    health: 96,
    healthStatus: "Healthy",
    utilization: 93,
    operatingHours: 3840,
    lifecycleStage: "Operation",
    lastMaintenance: "2026-08-25",
    nextMaintenance: "2026-10-20",
    maintenanceStatus: "Nominal",
    risk: "Low",
    telemetry: { temp: 38, vibration: 0.9, load: 78, efficiency: 98 },
    recommendedAction: "Routine optic focal lens calibration scheduled.",
    history: [
      { time: "-6d", health: 96, utilization: 92 },
      { time: "-5d", health: 95, utilization: 93 },
      { time: "-4d", health: 96, utilization: 94 },
      { time: "-3d", health: 97, utilization: 93 },
      { time: "-2d", health: 96, utilization: 92 },
      { time: "-1d", health: 96, utilization: 94 },
      { time: "Now", health: 96, utilization: 93 },
    ],
  },
  {
    id: "AST-204",
    name: "Extruder Press 204",
    type: "Thermoplastic Extruder",
    facilityId: "regional",
    location: "Molding Line 2",
    health: 48,
    healthStatus: "Critical",
    utilization: 45,
    operatingHours: 16200,
    lifecycleStage: "Retirement",
    lastMaintenance: "2026-06-30",
    nextMaintenance: "2026-09-08",
    maintenanceStatus: "Overdue",
    risk: "Critical",
    telemetry: { temp: 94, vibration: 8.4, load: 92, pressure: 280, efficiency: 58 },
    recommendedAction: "Thermal barrel degradation detected. Slated for decommissioning.",
    history: [
      { time: "-6d", health: 62, utilization: 60 },
      { time: "-5d", health: 58, utilization: 55 },
      { time: "-4d", health: 55, utilization: 50 },
      { time: "-3d", health: 52, utilization: 48 },
      { time: "-2d", health: 50, utilization: 46 },
      { time: "-1d", health: 49, utilization: 45 },
      { time: "Now", health: 48, utilization: 45 },
    ],
  },
];

export const healthChartData = {
  "24H": [
    { time: "00:00", healthy: 432, warning: 38, critical: 12 },
    { time: "04:00", healthy: 435, warning: 36, critical: 11 },
    { time: "08:00", healthy: 428, warning: 42, critical: 12 },
    { time: "12:00", healthy: 420, warning: 47, critical: 15 },
    { time: "16:00", healthy: 418, warning: 49, critical: 15 },
    { time: "20:00", healthy: 426, warning: 44, critical: 12 },
    { time: "24:00", healthy: 430, warning: 40, critical: 12 },
  ],
  "7D": [
    { time: "Mon", healthy: 442, warning: 32, critical: 8 },
    { time: "Tue", healthy: 439, warning: 35, critical: 8 },
    { time: "Wed", healthy: 435, warning: 38, critical: 9 },
    { time: "Thu", healthy: 428, warning: 43, critical: 11 },
    { time: "Fri", healthy: 422, warning: 47, critical: 13 },
    { time: "Sat", healthy: 429, warning: 41, critical: 12 },
    { time: "Sun", healthy: 431, warning: 39, critical: 12 },
  ],
  "30D": [
    { time: "Wk 1", healthy: 450, warning: 26, critical: 6 },
    { time: "Wk 2", healthy: 444, warning: 31, critical: 7 },
    { time: "Wk 3", healthy: 436, warning: 37, critical: 9 },
    { time: "Wk 4", healthy: 428, warning: 42, critical: 12 },
  ],
  "90D": [
    { time: "Month 1", healthy: 458, warning: 20, critical: 4 },
    { time: "Month 2", healthy: 448, warning: 28, critical: 6 },
    { time: "Month 3", healthy: 432, warning: 38, critical: 12 },
  ],
};

export const lifecycleStageMeta: Record<
  LifecycleStage,
  {
    count: number;
    description: string;
    metrics: string;
    focus: string;
    exampleAssets: string[];
  }
> = {
  Deployment: {
    count: 28,
    description: "Commissioning, digital twin onboarding, baseline calibration, and telemetry testing.",
    metrics: "99.4% Onboarding Success • Avg 3.2 Days to Live Stream",
    focus: "Sensor integrity & telemetry stream validation",
    exampleAssets: ["AST-089 (AGV Tug)", "AST-104 (Robotic Welder)"],
  },
  Operation: {
    count: 312,
    description: "Continuous steady-state manufacturing and supply chain transfer operations.",
    metrics: "91.8% Availability • 88.6% Capacity Factor",
    focus: "OEE tracking & operational throughput stabilization",
    exampleAssets: ["AST-007 (Conveyor 07)", "AST-114 (Fleet Vehicle 114)", "AST-108 (Laser Cutter 08)"],
  },
  Monitoring: {
    count: 64,
    description: "Real-time edge signal fusion, anomaly score tracking, and drift surveillance.",
    metrics: "1.4M Daily Telemetry Packets • 12 Anomaly Flags",
    focus: "Vibration FFT, thermal gradient shifts, motor harmonics",
    exampleAssets: ["AST-018 (Robotic Arm 018)", "AST-003 (Packaging Line 03)"],
  },
  Maintenance: {
    count: 42,
    description: "Scheduled servicing, predictive component swaps, and calibration interventions.",
    metrics: "7 Active Work Orders • 94.1% First-Time Fix Rate",
    focus: "Root-cause diagnostics & MTTR minimization",
    exampleAssets: ["AST-042 (CNC Machine 042)", "AST-051 (Cooling Pump 05)"],
  },
  Optimization: {
    count: 24,
    description: "AI-driven cycle-time tuning, energy efficiency curves, and wear reduction.",
    metrics: "+4.6% Efficiency Gain • -8.2% Energy Waste",
    focus: "Machine learning parametric optimization",
    exampleAssets: ["AST-021 (Industrial Press 021)"],
  },
  Retirement: {
    count: 12,
    description: "End-of-life residual value modeling, scrap coordination, and decommissioning.",
    metrics: "$142K Recovered Value • 100% Asset Ledger Audit",
    focus: "Decommissioning compliance & fleet recapitalization",
    exampleAssets: ["AST-204 (Extruder Press 204)"],
  },
};

export const initialAlerts: OperationalAlert[] = [
  {
    id: "ALT-901",
    severity: "Critical",
    title: "Critical asset condition detected",
    assetId: "AST-042",
    assetName: "CNC Machine 042",
    timestamp: "12m ago",
    description:
      "CNC Machine 042 shows abnormal vibration patterns (7.8 mm/s vs 2.5 mm/s baseline) on spindle bearing array B.",
    status: "Active",
    recommendedAction: "Dispatch emergency mechanical inspection before tool fracture occurs.",
  },
  {
    id: "ALT-902",
    severity: "Warning",
    title: "Maintenance approaching",
    assetId: "AST-018",
    assetName: "Robotic Arm 018",
    timestamp: "48m ago",
    description:
      "Robotic Arm 018 is approaching its recommended maintenance interval with elevated harmonic friction on Axis 4.",
    status: "Active",
    recommendedAction: "Schedule gear lubrication during upcoming 18:00 line changeover.",
  },
  {
    id: "ALT-903",
    severity: "Warning",
    title: "Utilization anomaly",
    assetId: "AST-003",
    assetName: "Packaging Line 03",
    timestamp: "2h ago",
    description:
      "Packaging Line 03 utilization has dropped below its normal operating range (62% vs 88% target) due to feeder starvation.",
    status: "Active",
    recommendedAction: "Inspect automated carton feeder belt tension and hopper sensors.",
  },
  {
    id: "ALT-904",
    severity: "Info",
    title: "Optimization curve applied",
    assetId: "AST-021",
    assetName: "Industrial Press 021",
    timestamp: "4h ago",
    description:
      "Cycle parameters autonomously updated. Hydraulic stroke efficiency increased by 3.2%.",
    status: "Acknowledged",
    recommendedAction: "No action required. Telemetry within nominal envelope.",
  },
];

export const initialMaintenanceRecs: MaintenanceRecommendation[] = [
  {
    id: "MNT-401",
    assetId: "AST-042",
    assetName: "CNC Machine 042",
    detectedCondition: "Spindle bearing micro-spalling & thermal runaway",
    riskLevel: "Critical",
    recommendedAction: "Replace spindle cartridge & realign linear guides",
    suggestedWindow: "Immediate (within 24 hours)",
    workOrderType: "Bearing Replacement",
    status: "Overdue",
  },
  {
    id: "MNT-402",
    assetId: "AST-018",
    assetName: "Robotic Arm 018",
    detectedCondition: "Axis 4 torque ripple exceedance (> 14%)",
    riskLevel: "Elevated",
    recommendedAction: "Flush grease reservoir & conduct encoder calibration",
    suggestedWindow: "Within 48 hours (next planned downtime)",
    workOrderType: "Calibration",
    status: "Due",
  },
  {
    id: "MNT-403",
    assetId: "AST-003",
    assetName: "Packaging Line 03",
    detectedCondition: "Heating element resistive degradation",
    riskLevel: "Moderate",
    recommendedAction: "Replace rotary seal bar heating element",
    suggestedWindow: "Within 5 days",
    workOrderType: "Predictive Inspection",
    status: "Scheduled",
  },
  {
    id: "MNT-404",
    assetId: "AST-021",
    assetName: "Industrial Press 021",
    detectedCondition: "Hydraulic proportional valve seal wear",
    riskLevel: "Low",
    recommendedAction: "Replace high-pressure o-rings and flush fluid filter",
    suggestedWindow: "Next scheduled overhaul (14 days)",
    workOrderType: "Overhaul",
    status: "Predicted",
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "NOTIF-1",
    title: "Critical Vibration Threshold Exceeded",
    description: "CNC Machine 042 reached 7.8 mm/s on Spindle Bearings.",
    category: "Alert",
    timestamp: "12m ago",
    read: false,
    assetId: "AST-042",
  },
  {
    id: "NOTIF-2",
    title: "Predictive Work Order Created",
    description: "System generated calibration task for Robotic Arm 018.",
    category: "Maintenance",
    timestamp: "48m ago",
    read: false,
    assetId: "AST-018",
  },
  {
    id: "NOTIF-3",
    title: "Throughput Degradation Flagged",
    description: "Packaging Line 03 operating 26% below production benchmark.",
    category: "Alert",
    timestamp: "2h ago",
    read: false,
    assetId: "AST-003",
  },
  {
    id: "NOTIF-4",
    title: "Plant Alpha Model Sync Completed",
    description: "Predictive models updated across 482 active asset nodes.",
    category: "System",
    timestamp: "6h ago",
    read: true,
  },
  {
    id: "NOTIF-5",
    title: "Lifecycle Transition: AST-204",
    description: "Extruder Press 204 moved from Maintenance to Retirement queue.",
    category: "Lifecycle",
    timestamp: "1d ago",
    read: true,
    assetId: "AST-204",
  },
];

export const aiSuggestedQuestions = [
  "Which assets are at highest risk?",
  "What maintenance is due this week?",
  "Which assets have declining utilization?",
  "Show me critical equipment.",
  "Why is CNC Machine 042 flagged?",
  "Which assets may require maintenance soon?",
];

export const aiKnowledgeResponses: Record<
  string,
  {
    answer: string;
    targetAssetId?: string;
    followUps: Array<{ label: string; action: "viewAsset" | "viewMaintenance" | "filterRisk" }>;
  }
> = {
  "Which assets are at highest risk?": {
    answer:
      "3 assets currently require immediate attention. CNC Machine 042 (AST-042) is at the highest risk level due to severe harmonic vibration spikes (7.8 mm/s) and declining health over the past 7 days. Extruder Press 204 (AST-204) is also in critical condition and queued for retirement.",
    targetAssetId: "AST-042",
    followUps: [
      { label: "Inspect CNC Machine 042", action: "viewAsset" },
      { label: "Filter Critical Risk Assets", action: "filterRisk" },
      { label: "Review Maintenance Plan", action: "viewMaintenance" },
    ],
  },
  "What maintenance is due this week?": {
    answer:
      "2 high-priority maintenance interventions are due this week: CNC Machine 042 requires emergency spindle cartridge replacement (overdue), and Robotic Arm 018 requires Axis 4 gearbox lubrication & recalibration within 48 hours.",
    targetAssetId: "AST-042",
    followUps: [
      { label: "Open Maintenance Panel", action: "viewMaintenance" },
      { label: "View CNC Machine 042", action: "viewAsset" },
    ],
  },
  "Which assets have declining utilization?": {
    answer:
      "Packaging Line 03 (AST-003) exhibits the steepest drop in utilization, falling from 88% nominal capacity down to 62% over the last 48 hours. Primary cause: upstream carton feeder starvation and intermittent photoelectric sensor drift.",
    targetAssetId: "AST-003",
    followUps: [
      { label: "Inspect Packaging Line 03", action: "viewAsset" },
      { label: "Review Feeder Work Order", action: "viewMaintenance" },
    ],
  },
  "Show me critical equipment.": {
    answer:
      "Filtering operational fleet for Critical health: CNC Machine 042 (54% health, 86°C thermal envelope) and Extruder Press 204 (48% health, 280 bar pressure surge) are currently marked Critical.",
    targetAssetId: "AST-042",
    followUps: [
      { label: "Filter Critical Assets", action: "filterRisk" },
      { label: "Inspect CNC Machine 042", action: "viewAsset" },
    ],
  },
  "Why is CNC Machine 042 flagged?": {
    answer:
      "CNC Machine 042 is flagged Critical due to a high-frequency vibration anomaly (7.8 mm/s, >3x threshold) detected on spindle bearing array B, combined with operating temperature climbing to 86°C. Predicted failure probability is 0.82 within 72 operating hours without intervention.",
    targetAssetId: "AST-042",
    followUps: [
      { label: "Open CNC Machine 042 Telemetry", action: "viewAsset" },
      { label: "Review Spindle Work Order", action: "viewMaintenance" },
    ],
  },
  "Which assets may require maintenance soon?": {
    answer:
      "Predictive modeling indicates Robotic Arm 018 (AST-018) and Packaging Line 03 (AST-003) will enter critical wear states within 5 to 7 days unless preventative lubrication and coil replacement are performed.",
    targetAssetId: "AST-018",
    followUps: [
      { label: "Inspect Robotic Arm 018", action: "viewAsset" },
      { label: "Review Predictive Queue", action: "viewMaintenance" },
    ],
  },
};
