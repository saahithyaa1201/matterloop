import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Thermometer, AlertTriangle, Gauge, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading, Section } from "./primitives";

const tabs = ["Overview", "Fleet Health", "Predictive Alerts", "Utilization"] as const;
type Tab = (typeof tabs)[number];

const metrics = [
  { label: "Active Assets", value: "14,280", delta: "+2.4%", tone: "text-green" },
  { label: "Fleet Health", value: "98.4%", delta: "nominal", tone: "text-cyan" },
  { label: "Utilization Rate", value: "87.2%", delta: "+1.1%", tone: "text-cyan" },
  { label: "Predictive Alerts", value: "3 Critical", delta: "action required", tone: "text-amber" },
];

type Asset = {
  name: string;
  id: string;
  temp: number;
  health: number;
  status: "Operational" | "Warning" | "Critical" | "Maintenance";
};

const assetsByTab: Record<Tab, Asset[]> = {
  Overview: [
    { name: "CNC Milling Array #04", id: "AST-4021", temp: 62, health: 96, status: "Operational" },
    { name: "Robotic Arm Unit 12", id: "AST-1120", temp: 71, health: 88, status: "Warning" },
    { name: "Conveyor Line B", id: "AST-0308", temp: 44, health: 99, status: "Operational" },
  ],
  "Fleet Health": [
    { name: "Hydraulic Press P-7", id: "AST-7702", temp: 58, health: 93, status: "Operational" },
    { name: "AGV Fleet Cluster 3", id: "AST-3310", temp: 39, health: 97, status: "Operational" },
    { name: "Injection Molder M-2", id: "AST-2204", temp: 84, health: 74, status: "Maintenance" },
  ],
  "Predictive Alerts": [
    { name: "Spindle Motor SM-19", id: "AST-1904", temp: 97, health: 41, status: "Critical" },
    { name: "Cooling Pump CP-05", id: "AST-0512", temp: 88, health: 57, status: "Critical" },
    { name: "Robotic Arm Unit 12", id: "AST-1120", temp: 79, health: 66, status: "Warning" },
  ],
  Utilization: [
    { name: "CNC Milling Array #04", id: "AST-4021", temp: 61, health: 96, status: "Operational" },
    { name: "Laser Cutter LC-08", id: "AST-0806", temp: 55, health: 91, status: "Operational" },
    { name: "Palletizer PZ-11", id: "AST-1109", temp: 47, health: 85, status: "Warning" },
  ],
};

const statusTone: Record<Asset["status"], string> = {
  Operational: "text-green border-green/40 bg-green/10",
  Warning: "text-amber border-amber/40 bg-amber/10",
  Critical: "text-coral border-coral/40 bg-coral/10",
  Maintenance: "text-cyan border-cyan/40 bg-cyan/10",
};

function barTone(health: number) {
  if (health >= 85) return "bg-green";
  if (health >= 60) return "bg-amber";
  return "bg-coral";
}

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => (v + 1) % 7), 1800);
    return () => clearInterval(t);
  }, []);

  const assets = assetsByTab[tab];

  return (
    <Section id="dashboard">
      <SectionHeading
        eyebrow="Live Dashboard"
        title="Your operations, rendered in real time"
        subtitle="Unified telemetry, health scoring and predictive signals across every plant, line and node."
      />

      <Reveal delay={0.1} className="mt-12">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-border px-3 py-3 sm:px-5">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-cyan"
                }`}
              >
                {tab === t ? (
                  <motion.span
                    layoutId="dash-tab"
                    className="absolute inset-0 rounded-lg bg-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-4 border-b border-border p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-surface/70 p-4 transition-colors hover:border-cyan/40"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {m.label}
                </p>
                <p className={`mt-2 font-mono text-2xl font-bold ${m.tone}`}>{m.value}</p>
                <p className={`mt-1 inline-flex items-center gap-1 text-[11px] ${m.tone}`}>
                  <ArrowUpRight className="h-3 w-3" /> {m.delta}
                </p>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="grid gap-4 p-4 sm:p-6 lg:grid-cols-3"
            >
              {assets.map((a, i) => {
                const temp = a.temp + ((tick + i) % 3) - 1;
                return (
                  <div
                    key={a.id}
                    className="group rounded-xl border border-border bg-surface/70 p-4 transition-all hover:border-cyan/50 hover:bg-surface"
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{a.name}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{a.id}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase ${statusTone[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <Thermometer className="h-3.5 w-3.5 text-amber" />
                      <span className="text-foreground">{temp}°C</span>
                      <span className="ml-auto flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5 text-cyan" /> {a.health}% health
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${a.health}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`h-full rounded-full ${barTone(a.health)}`}
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                      {a.status === "Critical" ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-coral" />
                      ) : (
                        <Gauge className="h-3.5 w-3.5 text-green" />
                      )}
                      {a.status === "Critical"
                        ? "failure probability 0.82 / 72h"
                        : "next service window in 14d"}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
