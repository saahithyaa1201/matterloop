import { Reveal, Section, SectionHeading } from "./primitives";

const caps = [
  {
    image: "/C.svg",
    title: "Asset Intelligence Engine",
    desc: "Full asset profiling and continuous condition monitoring across every sensor stream.",
    points: ["Digital asset profiles", "Condition scoring", "Signal fusion"],
    tone: "text-cyan",
  },
  {
    image: "/C2.svg",
    title: "Lifecycle Management Engine",
    desc: "Deployment, service history and retirement tracked as one continuous lifecycle record.",
    points: ["Deployment ledger", "Maintenance history", "Retirement planning"],
    tone: "text-green",
  },
  {
    image: "/C3.svg",
    title: "Predictive Maintenance Intelligence",
    desc: "Anomaly detection and early failure indicators before downtime reaches the floor.",
    points: ["Anomaly detection", "Failure indicators", "Alert routing"],
    tone: "text-amber",
  },
  {
    image: "/C4.svg",
    title: "Asset Utilization Analytics",
    desc: "Capacity, downtime and efficiency analytics tied to real production output.",
    points: ["Capacity modeling", "Downtime attribution", "OEE analytics"],
    tone: "text-cyan",
  },
];

const frameworks = ["NVIDIA Metropolis", "RAPIDS", "Omniverse"];

export function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionHeading
        eyebrow="Capabilities"
        title="Four engines. One lifecycle model."
        subtitle="Every module writes into a shared asset graph, so insight compounds instead of fragmenting."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {caps.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-border bg-surface/70 p-6 transition-all hover:border-cyan/50 hover:glow-border">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-border bg-background/60">
                <img src={c.image} alt={c.title} className="h-6 w-6 object-contain" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div className="glass grid grid-cols-[minmax(0,1fr)] items-center gap-5 rounded-2xl p-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Technical showcase
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Accelerated compute compatible — deploy MatterLoop engines alongside your existing
              industrial AI stack.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {frameworks.map((f) => (
              <span
                key={f}
                className="rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-1.5 font-mono text-xs text-cyan"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
