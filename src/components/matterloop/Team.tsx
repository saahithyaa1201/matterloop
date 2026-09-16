import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const team = [
  {
    name: "Elena Márquez",
    role: "VP of Asset Intelligence",
    bio: "15 years building condition-monitoring systems for automotive and aerospace plants.",
    image: "/t6.svg",
  },
  {
    name: "Tobias Lund",
    role: "Chief Predictive Systems Architect",
    bio: "Former reliability lead; designs the anomaly models behind MatterLoop's alert engine.",
    image: "/t2.svg",
  },
  {
    name: "Cynthia Benedict",
    role: "Head of Lifecycle Data",
    bio: "Builds the asset graph that unifies telemetry, service records and supply chain events.",
    image: "/t3.svg",
  },
  {
    name: "Karishma Tanna",
    role: "Director of Edge Engineering",
    bio: "Ships low-latency ingestion at the plant edge across thousands of industrial nodes.",
    image: "/t4.svg",
  },
  {
    name: "Nadia Patel",
    role: "Program Director, Reliability",
    bio: "Leads transformations across multi-site maintenance programs and capital planning cycles.",
    image: "/t5.svg",
  },
  {
    name: "Mateo Silva",
    role: "Lead Applied AI Scientist",
    bio: "Builds forecasting models that turn raw sensor regimes into decisive operational actions.",
    image: "/t.svg",
  },
];

export function Team() {
  const [paused, setPaused] = useState(false);
  const marqueeMembers = [...team, ...team];

  return (
    <section id="team" className="relative w-full py-20 overflow-hidden md:py-28">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none opacity-70"
        style={{ backgroundImage: "url('/Leadership.svg')" }}
      />
      <div className="relative w-full px-5 mx-auto max-w-7xl sm:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Built by Industrial AI Pioneers"
          subtitle="Reliability engineers, data architects and edge specialists who've run real production floors."
        />

        <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-[#75553c]/40 hover:text-[#75553c]"
          aria-label={paused ? "Resume team scroll" : "Pause team scroll"}
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      <div className="py-3 mt-4 overflow-hidden border rounded-2xl border-border bg-surface/30">
        <div
          className="flex gap-5 team-marquee w-max"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {marqueeMembers.map((m, i) => (
            <Reveal key={`${m.name}-${i}`} delay={i * 0.02}>
              <div className="h-full w-[280px] shrink-0 rounded-[28px] border border-border bg-surface/80 p-6 text-center shadow-[0_18px_32px_rgba(117,85,60,0.04)] transition-all hover:border-[#75553c]/50 hover:shadow-[0_18px_32px_rgba(117,85,60,0.08)]">
                <span className="mx-auto grid h-16 w-16 place-items-center overflow-hidden rounded-[20px] border border-[#75553c]/30 bg-gradient-to-br from-[#d6c8b5] to-[#ae8466]/25">
                  <img src={m.image} alt={m.name} className="object-contain w-12 h-12" />
                </span>
                <h3 className="mt-4 text-base font-bold">{m.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#75553c]">
                  {m.role}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
