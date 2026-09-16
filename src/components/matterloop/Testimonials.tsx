import { useState } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const items = [
  {
    quote:
      "Before adopting the platform, our teams were constantly switching between different tools to understand what was happening across our environment. We now have a much clearer operational view, which has made it easier to identify issues, prioritise actions, and keep teams aligned. It has genuinely changed how we approach day-to-day operations.",
    name: "Troy Jones",
    role: "Director of Infrastructure",
    company: "Enterprise Technology Company",
    image: "/testi1.svg",
    kpi: "Clearer visibility",
    kpiTone: "text-green border-green/40 bg-green/10",
  },
  {
    quote:
      "The biggest improvement has been the visibility we now have across our workflows. Instead of spending valuable time collecting information from disconnected systems, our team can access the right context and act much faster. The platform has helped us simplify complex processes while giving us the flexibility to scale as our operational needs continue to grow.",
    name: "Jonathan Ronald",
    role: "VP of Engineering",
    company: "SaaS Company",
    image: "/testi2.svg",
    kpi: "Faster actions",
    kpiTone: "text-cyan border-cyan/40 bg-cyan/10",
  },
  {
    quote:
      "As our infrastructure expanded, managing increasing amounts of operational data became more difficult. This platform gave us a structured way to bring those signals together and turn them into useful insights. Our teams can now spot patterns earlier, collaborate more effectively, and make decisions based on a much stronger understanding of what is happening across the business.",
    name: "Jonathan Parker",
    role: "Digital Services Company",
    company: "Digital Services Company",
    image: "/testi3.svg",
    kpi: "Earlier pattern detection",
    kpiTone: "text-amber border-amber/40 bg-amber/10",
  },
  {
    quote:
      "What impressed us most was how quickly the platform fit into our existing way of working. We didn’t need to completely redesign our processes to get value from it. It helped connect the information our teams already rely on, reduced unnecessary manual effort, and created a more consistent operational workflow across different functions.",
    name: "Sarah James",
    role: "COO",
    company: "Technology Company",
    image: "/testi4.svg",
    kpi: "Faster adoption",
    kpiTone: "text-green border-green/40 bg-green/10",
  },
  {
    quote:
      "We were looking for a solution that could support our growth without introducing another layer of complexity. The platform gave us the visibility and control we needed while keeping the experience straightforward for our teams. As we continue expanding, having a system that can scale alongside our operations gives us much greater confidence in what comes next.",
    name: "Riya Jonathan",
    role: "CTO",
    company: "Growing Enterprise",
    image: "/testi5.svg",
    kpi: "Scales with growth",
    kpiTone: "text-cyan border-cyan/40 bg-cyan/10",
  },
  {
    quote:
      "The platform has helped us move from reactive operations to a much more informed and proactive approach. Our teams have better context when investigating issues, clearer visibility into ongoing activity, and a stronger foundation for making operational decisions. It has become an important part of how we manage complexity without letting complexity manage us.",
    name: "Cia Adams",
    role: "Head of Operations",
    company: "Enterprise Software Company",
    image: "/testi6.svg",
    kpi: "Proactive operations",
    kpiTone: "text-amber border-amber/40 bg-amber/10",
  },
];

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const marqueeItems = [...items, ...items];

  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by Teams That Move Faster"
        subtitle=""
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-[#75553c]/40 hover:text-[#75553c]"
          aria-label={paused ? "Resume auto scroll" : "Pause auto scroll"}
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      <div className="py-3 mt-4 overflow-hidden">
        <div
          className="flex gap-5 testimonial-marquee w-max"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {marqueeItems.map((t, i) => (
            <Reveal key={`${t.name}-${i}`} delay={i * 0.02}>
              <div className="flex h-full w-[280px] sm:w-[340px] shrink-0 flex-col rounded-[26px] border border-border/80 bg-surface/70 p-6 shadow-[0_12px_30px_rgba(117,85,60,0.04)] transition-all hover:border-[#75553c]/60 hover:shadow-[0_16px_34px_rgba(117,85,60,0.08)]">
                <Quote className="h-5 w-5 text-[#75553c]" />
                <p className="flex-1 mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                <span
                  className={`mt-5 self-start rounded-full border px-2.5 py-1 font-mono text-[11px] ${t.kpiTone}`}
                >
                  {t.kpi}
                </span>
                <div className="flex items-center min-w-0 gap-3 pt-5 mt-5 border-t border-border/70">
                  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#75553c]/40 bg-[#75553c]/10">
                    <img src={t.image} alt={t.name} className="object-contain h-7 w-7" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{t.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {t.company}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
