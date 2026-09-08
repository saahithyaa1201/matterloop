import { Terminal, Check } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const code = `GET /v1/assets/telemetry/stream

{
  "asset_id": "AST-4021",
  "name": "CNC Milling Array #04",
  "ts": "2026-08-29T05:12:44Z",
  "telemetry": {
    "spindle_temp_c": 62.4,
    "vibration_rms": 0.031,
    "load_pct": 78.2
  },
  "health": { "score": 96.1, "trend": "stable" },
  "lifecycle": { "stage": "in_service", "hours": 18420 },
  "prediction": {
    "failure_probability_72h": 0.04,
    "next_service": "2026-09-12"
  }
}`;

const bullets = [
  "REST + WebSocket telemetry streams",
  "Signed webhooks for predictive alerts",
  "SDKs for Python, TypeScript and Go",
  "Scoped API keys with per-plant access",
];

export function ApiTerminal() {
  return (
    <Section id="api">
      <SectionHeading
        eyebrow="Developer platform"
        title="Stream every asset signal, programmatically"
        subtitle="A single telemetry contract across plants, lines and machines."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-[#0a0d14]">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
              <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">
                matterloop — telemetry stream
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-cyan/90">
              <code>{code}</code>
            </pre>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full rounded-2xl p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan/40 bg-cyan/10">
              <Terminal className="h-5 w-5 text-cyan" />
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight">
              Developer API & Documentation
            </h3>
            <span className="mt-2 inline-block rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[11px] text-amber">
              Coming Soon
            </span>
            <ul className="mt-5 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
