import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowDown,
  Cpu,
  Eye,
  MessageSquare,
  Boxes,
  Radio,
  Server,
} from "lucide-react";

import { Nav } from "@/components/matterloop/Nav";
import { Footer } from "@/components/matterloop/Footer";
import { Section, SectionHeading, Eyebrow } from "@/components/matterloop/primitives";

const challenges = [
  {
    icon: Boxes,
    title: "Fragmented lifecycles",
    body: "Asset records live scattered across ERPs, CMMS and EAM systems, supply-chain databases, and manual spreadsheets, with no single place that tells the whole story of a machine.",
  },
  {
    icon: Activity,
    title: "Reactive, fixed-schedule maintenance",
    body: "Servicing equipment on a calendar means paying for work it didn't need, or missing the early signs of a failure the calendar couldn't predict.",
  },
  {
    icon: Zap,
    title: "Disconnected supply chain",
    body: "A predicted failure is only useful if the part is in stock. Maintenance and procurement rarely share a model of what's coming.",
  },
  {
    icon: Eye,
    title: "Inspection bottlenecks",
    body: "Manual audits and paper checklists leave gaps in the record and depend on whoever happened to notice the wear.",
  },
];

const layers = [
  {
    name: "Ingestion",
    tech: "NVIDIA RAPIDS",
    desc: "Pulls in streaming and batch data from MQTT, Kafka, SCADA/OT, ERP, CMMS/EAM and PLM systems, plus multi-sensor video. cuDF and cuML handle GPU-accelerated preprocessing and feature engineering on historical telemetry.",
  },
  {
    name: "Lifecycle analytics",
    tech: "Predictive & prescriptive models",
    desc: "Builds a live profile of every asset — health score, degradation rate, risk factors, maintenance history, depreciation — and correlates telemetry with work orders and conditions to estimate remaining useful life.",
  },
  {
    name: "Vision & inspection",
    tech: "NVIDIA DeepStream",
    desc: "Runs thermal imagery, high-resolution feeds and spatial scans through real-time video pipelines to track wear, flag defects, and support safety compliance without a technician walking the floor.",
  },
  {
    name: "Inference & serving",
    tech: "NVIDIA TensorRT + Triton",
    desc: "Deploys the predictive and vision models at low latency across edge nodes and cloud clusters, with FP16/INT8 precision, dynamic batching and multi-model orchestration.",
  },
  {
    name: "Asset assistant",
    tech: "NVIDIA NeMo",
    desc: "Lets technicians and supply-chain managers ask plain-language questions across asset histories, OEM manuals, technician logs and supply signals, and get generated work orders and diagnostic guidance back.",
  },
];

const matrix = [
  ["RAPIDS", "GPU data processing", "Accelerates telemetry, feature extraction, time-series preprocessing"],
  ["TensorRT", "Inference optimization", "Optimizes health, RUL and vision models for edge and cloud runtime"],
  ["Triton", "Model serving", "Serves multimodal lifecycle models, time-series engines and LLMs concurrently"],
  ["NeMo", "Generative AI", "Drives natural-language queries, work-order generation, diagnostics"],
  ["DeepStream", "Video analytics", "Powers visual inspection, defect monitoring, condition tracking"],
  ["Jetson", "Edge compute", "Runs local inference for condition monitoring on-site"],
  ["Merlin", "Recommendations", "Plans spare-parts stocking, service scheduling, replacement timing"],
  ["Morpheus", "OT cybersecurity", "Watches OT network traffic for operational anomalies"],
];

const roadmap = [
  ["Q3–Q4 2026", "RAPIDS engine launch", "Accelerate time-series ingestion and asset history processing."],
  ["Q4 2026", "TensorRT & Triton integration", "Optimize and deploy predictive health and RUL models at scale."],
  ["Q4 2026", "DeepStream vision pipeline", "Roll out automated visual defect and wear detection."],
  ["Q4 2026", "Jetson edge rollout", "Deploy local inference to factory and logistics hardware."],
  ["Q4 2026 – Q1 2027", "NeMo asset assistant", "Launch conversational querying across manuals, logs and signals."],
  ["Q1–Q2 2027", "Merlin recommender", "Integrate predictive spare-parts stocking and maintenance scheduling."],
];

export const Route = createFileRoute("/Product")({
  head: () => ({
    meta: [
      { title: "MatterLoop Product — Physical Asset Lifecycle Intelligence" },
      { name: "description", content: "Turn physical machinery, telemetry, maintenance history and supply chain data into one unified layer of lifecycle intelligence." }
    ],
    links: [
      { rel: "canonical", href: "https://matterloop.net/Product" }
    ]
  }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* HERO */}
        <section className="relative px-4 pt-28 pb-20 text-center grid-texture sm:px-8 sm:pt-32 sm:pb-24 hero-glow">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 sm:mb-8">
              <Eyebrow>Physical asset lifecycle intelligence</Eyebrow>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[74px] leading-tight mb-6 sm:mb-7 break-words">
              <span className="block text-primary">Intelligence across</span>
              <span className="block text-accent">the life of every asset.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-lg leading-relaxed text-muted-foreground">
              Turn physical machinery, telemetry, maintenance history and supply chain data into one unified layer of lifecycle intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <a href="https://portal.matterloop.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:brightness-110">
                Explore dashboard <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#architecture" className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-6 py-3.5 text-[15px] font-semibold text-accent transition-colors hover:bg-surface/50">
                View platform architecture
              </a>
            </div>
            
            <div className="mx-auto flex max-w-2xl flex-col sm:flex-row justify-center gap-0 rounded-2xl sm:rounded-full border border-border bg-card p-1.5 shadow-sm">
              {[
                { icon: Activity, label: "Real-time telemetry" },
                { icon: ShieldCheck, label: "Predictive maintenance" },
                { icon: Zap, label: "Supply chain data" },
              ].map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground ${
                    i !== 0 ? "border-t sm:border-t-0 sm:border-l border-border" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <Section className="bg-surface/30 border-y border-border/50">
          <SectionHeading
            eyebrow="The problem"
            title="Asset-heavy operations run on data that never talks to itself."
          />

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-[1px] overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {challenges.map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-8 transition-colors bg-card sm:p-10 hover:bg-surface/20">
                <Icon className="w-6 h-6 mb-4 text-accent" strokeWidth={1.5} />
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ARCHITECTURE LAYERS */}
        <Section id="architecture">
          <SectionHeading
            eyebrow="Platform architecture"
            title="Five layers, one continuous asset record."
          />

          <div className="max-w-4xl mx-auto mt-12 space-y-0">
            {layers.map((layer, i) => (
              <div
                key={layer.name}
                className={`flex flex-col sm:flex-row gap-4 sm:gap-8 py-8 ${
                  i === 0 ? "" : "border-t border-border"
                }`}
              >
                <div className="pt-1 text-sm font-bold text-accent shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {layer.name}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      {layer.tech}
                    </span>
                  </div>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* NVIDIA MATRIX */}
        <Section className="bg-surface/30 border-y border-border/50">
          <SectionHeading
            eyebrow="NVIDIA technology integration"
            title="Built on the NVIDIA accelerated computing stack."
          />

          <div className="max-w-5xl mx-auto mt-12 overflow-hidden border shadow-sm rounded-2xl border-border bg-card">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-[160px_1fr_2fr] bg-primary text-primary-foreground px-6 py-3.5 text-xs font-semibold uppercase tracking-wider">
              <span>Technology</span>
              <span>Function</span>
              <span>MatterLoop integration</span>
            </div>
            
            {/* Rows */}
            <div className="divide-y divide-border">
              {matrix.map((row, i) => (
                <div
                  key={row[0]}
                  className={`flex flex-col md:grid md:grid-cols-[160px_1fr_2fr] gap-2 md:gap-4 p-4 sm:px-6 sm:py-4 ${
                    i % 2 === 0 ? "bg-card" : "bg-surface/20"
                  }`}
                >
                  <span className="font-bold text-primary text-[15px]">
                    {row[0]}
                  </span>
                  
                  {/* Mobile labels */}
                  <div className="flex flex-col gap-1 mt-1 md:hidden">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Function</span>
                    <span className="text-sm font-medium text-foreground">{row[1]}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1 mt-2 md:hidden">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">MatterLoop integration</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{row[2]}</span>
                  </div>

                  {/* Desktop Content */}
                  <span className="self-center hidden text-sm font-medium md:block text-foreground">
                    {row[1]}
                  </span>
                  <span className="self-center hidden text-sm leading-relaxed md:block text-muted-foreground">
                    {row[2]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* DEPLOYMENT DIAGRAM */}
        <Section>
          <SectionHeading
            eyebrow="Edge to cloud"
            title="Local intelligence, refined centrally."
          />

          <div className="flex flex-col items-center max-w-3xl mx-auto mt-12">
            {[
              {
                icon: Radio,
                title: "Edge gateways — NVIDIA Jetson",
                items: ["Local AI inference", "Anomaly scoring", "Video processing"],
              },
              {
                icon: Server,
                title: "MatterLoop enterprise platform",
                items: [
                  "Triton & TensorRT model serving",
                  "RAPIDS ingestion & feature store",
                  "NeMo lifecycle knowledge base",
                ],
              },
              {
                icon: Cpu,
                title: "NVIDIA H100 / A100 cloud training",
                items: ["Model training", "Fine-tuning", "Fleet analytics"],
              },
            ].map((block, i, arr) => (
              <React.Fragment key={block.title}>
                <div
                  className={`w-full rounded-2xl border border-border p-6 sm:p-8 shadow-sm ${
                    i === 1 ? "bg-primary text-primary-foreground glow-border" : "bg-card text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <block.icon
                      className={`h-5 w-5 ${i === 1 ? "text-primary-foreground" : "text-accent"}`}
                    />
                    <h3 className="text-lg font-bold tracking-tight">
                      {block.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {block.items.map((it) => (
                      <span
                        key={it}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          i === 1
                            ? "bg-white/15 text-primary-foreground"
                            : "bg-surface/60 text-muted-foreground"
                        }`}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                
                {i !== arr.length - 1 && (
                  <ArrowDown
                    className="w-6 h-6 my-3 text-muted-foreground animate-pulse"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </Section>

        {/* ROADMAP */}
        <Section className="bg-surface/30 border-y border-border/50">
          <SectionHeading
            eyebrow="Roadmap"
            title="What ships next."
          />

          <div className="max-w-4xl mx-auto mt-12 space-y-0">
            {roadmap.map((r, i) => (
              <div
                key={r[1]}
                className={`flex flex-col sm:grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6 py-6 ${
                  i === 0 ? "" : "border-t border-border"
                }`}
              >
                <span className="text-sm font-bold text-accent shrink-0 pt-0.5">
                  {r[0]}
                </span>
                <div>
                  <h4 className="mb-1 text-base font-bold tracking-tight text-foreground">
                    {r[1]}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {r[2]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="pb-20 text-center md:pb-28">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-primary/10">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
            </div>
            
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
              One continuously learning platform for physical asset lifecycles.
            </h2>
            
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Access to cloud environments, code repositories and platform
              demonstrations is available securely through enterprise SSO on
              request.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:brightness-110">
                Book a demo
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
