import { useEffect, useState } from "react";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";

const COOKIE_KEY = "matterloop_cookie_consent";

export function Hero() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_KEY);
    if (saved === "accepted") {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    window.localStorage.setItem(COOKIE_KEY, "accepted");
    setAccepted(true);
  };

  return (
    <section id="top" className="relative overflow-hidden py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: "url('/hero.svg')" }}
      />
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-[0.35]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          {/* Eyebrow Container */}
          <div className="inline-flex items-center justify-center">
            <Eyebrow>MatterLoop</Eyebrow>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl md:text-7xl leading-[1.05]">
            <span className="text-gradient-cyan">Intelligence Across the Life of Every Asset.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            See what your physical assets are doing, understand what they need, and make better lifecycle decisions from deployment to retirement.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            MatterLoop brings asset data, equipment conditions, operational activity, maintenance history, and supply chain signals into one intelligent platform.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#dashboard"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:glow-border sm:w-auto"
            >
              Explore the Platform
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#platform"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-cyan/50 hover:text-cyan sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          {/* Asset Capability Highlights */}
          <div className="mt-16 grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-md sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2.5">
              <Activity className="h-4 w-4 text-cyan" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Real-Time Telemetry</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pt-0">
              <ShieldCheck className="h-4 w-4 text-cyan" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Predictive Maintenance</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pt-0">
              <Zap className="h-4 w-4 text-cyan" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Supply Chain Data</span>
            </div>
          </div>

          {!accepted && (
            <div className="pointer-events-auto fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
              <div className="w-full max-w-xl rounded-2xl border border-border/80 bg-surface/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2 text-left">
                    <p className="text-base font-semibold text-foreground">We use cookies</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      We use cookies to improve performance, understand usage, and provide a better experience.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAccept}
                    className="inline-flex items-center justify-center rounded-lg bg-cyan px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}