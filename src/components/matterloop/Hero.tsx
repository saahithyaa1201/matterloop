import { ArrowRight } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: "url('/hero.svg')" }}
      />
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-[0.35]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          {/* Eyebrow Container */}
          <div className="inline-flex items-center justify-center">
            <Eyebrow>MatterLoop</Eyebrow>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 text-[1.75rem] leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance break-words">
            <span className="text-gradient-cyan">Intelligence Across the Life of Every Asset.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-lg md:text-xl sm:mt-6">
            See what your physical assets are doing, understand what they need, and make better lifecycle decisions from deployment to retirement.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-base md:text-lg sm:mt-4">
            MatterLoop brings asset data, equipment conditions, operational activity, maintenance history, and supply chain signals into one intelligent platform.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:mt-10">
            <a
              href="/#dashboard"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:glow-border sm:w-auto"
            >
              Explore the Platform
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/Product#architecture"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-cyan/50 hover:text-cyan sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          {/* Asset Capability Highlights */}
          <div className="mt-12 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur-md sm:mt-16 sm:grid-cols-3 sm:gap-4 sm:p-6">
            <div className="flex items-center justify-center gap-2.5">
              <img
                src="/icons/hero icon.svg"
                alt="Real-Time Telemetry"
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center sm:text-left">Real-Time Telemetry</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pt-0">
              <img
                src="/icons/hero icon (2).svg"
                alt="Predictive Maintenance"
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center sm:text-left">Predictive Maintenance</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pt-0">
              <img
                src="/icons/hero icon (3).svg"
                alt="Supply Chain Data"
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center sm:text-left">Supply Chain Data</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}