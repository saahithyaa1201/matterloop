import React, { useState } from "react";
import {
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowDown,
  Cpu,
  Eye,
  Database,
  MessageSquare,
  Boxes,
  Radio,
  Server,
  Menu,
  X,
} from "lucide-react";

const colors = {
  bg: "#F3EEE2",
  bgAlt: "#EAE3D1",
  card: "#FBF8F0",
  ink: "#332F22",
  inkSoft: "#635C48",
  olive: "#5B6B3E",
  oliveDeep: "#414D2C",
  clay: "#B4875A",
  clayDeep: "#8C6740",
  line: "#DCD2B7",
};

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,680;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
    .ml-display { font-family: 'Fraunces', serif; }
    .ml-sans { font-family: 'Inter', sans-serif; }
    .ml-bg-texture {
      background-image:
        linear-gradient(${colors.line}55 1px, transparent 1px),
        linear-gradient(90deg, ${colors.line}55 1px, transparent 1px);
      background-size: 64px 64px;
    }
  `}</style>
);

function Pill({ children, style, ...props }) {
  return (
    <span
      className="ml-sans"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.02em",
        border: `1px solid ${colors.line}`,
        color: colors.inkSoft,
        background: colors.card,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

function NavLink({ children }) {
  return (
    <a
      href="#"
      className="ml-sans"
      onClick={(e) => e.preventDefault()}
      style={{
        fontSize: 14,
        fontWeight: 500,
        color: colors.ink,
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: `1.5px solid ${colors.oliveDeep}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path
            d="M4.5 1C2.5 1 1 2.7 1 5s1.5 4 3.5 4c2.3 0 3.4-1.7 4.5-3.5C10.1 3.7 11.2 2 13.5 2 15.5 2 17 3.7 17 5s-1.5 3-3.5 3c-2.3 0-3.4-1.7-4.5-3.5C7.9 3.2 6.8 1 4.5 1z"
            stroke={colors.oliveDeep}
            strokeWidth="1.4"
          />
        </svg>
      </div>
      <span
        className="ml-display"
        style={{ fontSize: 20, fontWeight: 600, color: colors.ink }}
      >
        MatterLoop
      </span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      className="ml-sans"
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: colors.clayDeep,
        margin: "0 0 12px",
      }}
    >
      {children}
    </p>
  );
}

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

export default function MatterLoopProductPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      className="ml-sans"
      style={{ background: colors.bg, color: colors.ink, minHeight: "100vh" }}
    >
      <FontStyles />

      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: `${colors.bg}E8`,
          backdropFilter: "blur(6px)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "18px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />

          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              style={{
                display: "flex",
                gap: 30,
              }}
              className="ml-desktop-links"
            >
              <NavLink>Platform</NavLink>
              <NavLink>Capabilities</NavLink>
              <NavLink>Pricing</NavLink>
              <NavLink>Team</NavLink>
              <NavLink>API Docs</NavLink>
            </div>
            <div style={{ display: "flex", gap: 10 }} className="ml-desktop-cta">
              <button
                className="ml-sans"
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: `1px solid ${colors.line}`,
                  background: colors.card,
                  color: colors.ink,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Launch app
              </button>
              <button
                className="ml-sans"
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "none",
                  background: colors.olive,
                  color: "#F5F1E4",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Book demo
              </button>
            </div>
            <button
              aria-label="Toggle menu"
              onClick={() => setNavOpen((v) => !v)}
              className="ml-mobile-toggle"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: colors.ink,
              }}
            >
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div
            className="ml-mobile-menu"
            style={{
              borderTop: `1px solid ${colors.line}`,
              padding: "16px 28px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {["Platform", "Capabilities", "Pricing", "Team", "API Docs"].map(
              (l) => (
                <NavLink key={l}>{l}</NavLink>
              )
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 999,
                  border: `1px solid ${colors.line}`,
                  background: colors.card,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Launch app
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 999,
                  border: "none",
                  background: colors.olive,
                  color: "#F5F1E4",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Book demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="ml-bg-texture"
        style={{ padding: "96px 28px 80px", textAlign: "center" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Pill style={{ marginBottom: 34 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: colors.olive,
                display: "inline-block",
              }}
            />
            Physical asset lifecycle intelligence
          </Pill>

          <h1
            className="ml-display"
            style={{
              fontSize: "clamp(40px, 6vw, 74px)",
              lineHeight: 1.08,
              fontWeight: 600,
              margin: "0 0 28px",
            }}
          >
            <span style={{ color: colors.oliveDeep }}>Intelligence across</span>
            <br />
            <span style={{ color: colors.clayDeep }}>the life of every asset.</span>
          </h1>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: colors.inkSoft,
              maxWidth: 620,
              margin: "0 auto 40px",
            }}
          >
            Turn physical machinery, telemetry, maintenance history and supply
            chain data into one unified layer of lifecycle intelligence.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 26px",
                borderRadius: 999,
                border: "none",
                background: colors.olive,
                color: "#F5F1E4",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Explore dashboard <ArrowRight size={17} />
            </button>
            <button
              style={{
                padding: "14px 26px",
                borderRadius: 999,
                border: `1px solid ${colors.clay}`,
                background: "transparent",
                color: colors.clayDeep,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              View platform architecture
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 0,
              flexWrap: "wrap",
              border: `1px solid ${colors.line}`,
              borderRadius: 999,
              background: colors.card,
              padding: 6,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            {[
              { icon: Activity, label: "Real-time telemetry" },
              { icon: ShieldCheck, label: "Predictive maintenance" },
              { icon: Zap, label: "Supply chain data" },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: colors.inkSoft,
                  borderLeft: i !== 0 ? `1px solid ${colors.line}` : "none",
                }}
              >
                <Icon size={15} color={colors.olive} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section style={{ padding: "70px 28px", background: colors.bgAlt }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <SectionLabel>The problem</SectionLabel>
            <h2
              className="ml-display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 600,
                color: colors.ink,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Asset-heavy operations run on data that never talks to itself.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: colors.line,
              border: `1px solid ${colors.line}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {challenges.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                style={{
                  background: colors.card,
                  padding: "32px 28px",
                }}
              >
                <Icon size={22} color={colors.clayDeep} strokeWidth={1.6} />
                <h3
                  className="ml-display"
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    margin: "18px 0 10px",
                    color: colors.ink,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: colors.inkSoft,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE LAYERS */}
      <section style={{ padding: "80px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ maxWidth: 560, marginBottom: 52 }}>
            <SectionLabel>Platform architecture</SectionLabel>
            <h2
              className="ml-display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 600,
                color: colors.ink,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Five layers, one continuous asset record.
            </h2>
          </div>

          <div>
            {layers.map((layer, i) => (
              <div
                key={layer.name}
                style={{
                  display: "flex",
                  gap: 28,
                  padding: "30px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${colors.line}`,
                }}
              >
                <div
                  className="ml-display"
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: colors.clay,
                    minWidth: 34,
                    paddingTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 8,
                    }}
                  >
                    <h3
                      className="ml-display"
                      style={{
                        fontSize: 21,
                        fontWeight: 600,
                        color: colors.ink,
                        margin: 0,
                      }}
                    >
                      {layer.name}
                    </h3>
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: colors.oliveDeep,
                        background: `${colors.olive}1A`,
                        padding: "3px 10px",
                        borderRadius: 999,
                      }}
                    >
                      {layer.tech}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: colors.inkSoft,
                      margin: 0,
                      maxWidth: 620,
                    }}
                  >
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NVIDIA MATRIX */}
      <section style={{ padding: "70px 28px", background: colors.bgAlt }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ maxWidth: 560, marginBottom: 44 }}>
            <SectionLabel>NVIDIA technology integration</SectionLabel>
            <h2
              className="ml-display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 600,
                color: colors.ink,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Built on the NVIDIA accelerated computing stack.
            </h2>
          </div>

          <div
            style={{
              border: `1px solid ${colors.line}`,
              borderRadius: 16,
              overflow: "hidden",
              background: colors.card,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 2fr",
                background: colors.olive,
                color: "#F5F1E4",
                fontSize: 12.5,
                fontWeight: 600,
                padding: "14px 22px",
              }}
            >
              <span>Technology</span>
              <span>Function</span>
              <span>MatterLoop integration</span>
            </div>
            {matrix.map((row, i) => (
              <div
                key={row[0]}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr 2fr",
                  padding: "16px 22px",
                  fontSize: 14,
                  borderTop: `1px solid ${colors.line}`,
                  background: i % 2 === 0 ? colors.card : "#F5F1E4",
                }}
              >
                <span
                  className="ml-display"
                  style={{ fontWeight: 600, color: colors.oliveDeep }}
                >
                  {row[0]}
                </span>
                <span style={{ color: colors.inkSoft }}>{row[1]}</span>
                <span style={{ color: colors.ink }}>{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT DIAGRAM */}
      <section style={{ padding: "80px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>Edge to cloud</SectionLabel>
            <h2
              className="ml-display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 600,
                color: colors.ink,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Local intelligence, refined centrally.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  style={{
                    width: "100%",
                    border: `1px solid ${colors.line}`,
                    borderRadius: 16,
                    background: i === 1 ? colors.olive : colors.card,
                    padding: "24px 28px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <block.icon
                      size={19}
                      color={i === 1 ? "#F5F1E4" : colors.clayDeep}
                    />
                    <h3
                      className="ml-display"
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        margin: 0,
                        color: i === 1 ? "#F5F1E4" : colors.ink,
                      }}
                    >
                      {block.title}
                    </h3>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {block.items.map((it) => (
                      <span
                        key={it}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          padding: "5px 12px",
                          borderRadius: 999,
                          background:
                            i === 1 ? "rgba(255,255,255,0.14)" : colors.bgAlt,
                          color: i === 1 ? "#F5F1E4" : colors.inkSoft,
                        }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                {i !== arr.length - 1 && (
                  <ArrowDown
                    size={20}
                    color={colors.clay}
                    style={{ margin: "10px 0" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section style={{ padding: "70px 28px", background: colors.bgAlt }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ maxWidth: 560, marginBottom: 44 }}>
            <SectionLabel>Roadmap</SectionLabel>
            <h2
              className="ml-display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 600,
                color: colors.ink,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              What ships next.
            </h2>
          </div>

          <div>
            {roadmap.map((r, i) => (
              <div
                key={r[1]}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr",
                  gap: 24,
                  padding: "22px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${colors.line}`,
                }}
              >
                <span
                  className="ml-display"
                  style={{ fontSize: 14, fontWeight: 600, color: colors.clayDeep }}
                >
                  {r[0]}
                </span>
                <div>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      margin: "0 0 4px",
                      color: colors.ink,
                    }}
                  >
                    {r[1]}
                  </h4>
                  <p style={{ fontSize: 14, color: colors.inkSoft, margin: 0 }}>
                    {r[2]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / FOOTER */}
      <section style={{ padding: "90px 28px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <MessageSquare size={26} color={colors.olive} style={{ marginBottom: 22 }} />
          <h2
            className="ml-display"
            style={{
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 600,
              color: colors.oliveDeep,
              lineHeight: 1.25,
              margin: "0 0 16px",
            }}
          >
            One continuously learning platform for physical asset lifecycles.
          </h2>
          <p
            style={{
              fontSize: 15.5,
              color: colors.inkSoft,
              lineHeight: 1.65,
              margin: "0 0 32px",
            }}
          >
            Access to cloud environments, code repositories and platform
            demonstrations is available securely through enterprise SSO on
            request.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              style={{
                padding: "14px 28px",
                borderRadius: 999,
                border: "none",
                background: colors.olive,
                color: "#F5F1E4",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Book a demo
            </button>
            <button
              style={{
                padding: "14px 28px",
                borderRadius: 999,
                border: `1px solid ${colors.line}`,
                background: colors.card,
                color: colors.ink,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Request SSO access
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 80,
            paddingTop: 28,
            borderTop: `1px solid ${colors.line}`,
            maxWidth: 1080,
            margin: "80px auto 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Logo />
          <p style={{ fontSize: 13, color: colors.inkSoft, margin: 0 }}>
            matterloop.net — Physical asset lifecycle intelligence
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .ml-desktop-links, .ml-desktop-cta { display: none !important; }
          .ml-mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}