import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const PAYPAL_CLIENT_ID = "BAA70Qb9P_DNqb8bnwLnJJWGqp5SWhwfSxzYvgMrYHg0JkmLTPmg9cJu0j0lkQnqdl4CXvgXBvMAQOX04g";

function PayPalCheckoutButton({
  tierName,
  amount,
}: {
  tierName: string;
  amount: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const win = window as Window & {
      paypal?: {
        Buttons?: (options: Record<string, unknown>) => {
          render: (element: Element | string) => void;
          close?: () => void;
        };
      };
    };

    const paypal = win.paypal;
    if (!paypal || typeof paypal.Buttons !== "function") {
      return;
    }

    const button = paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "pay",
        height: 44,
      },
      createOrder: (_data: unknown, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: tierName,
              amount: {
                currency_code: "USD",
                value: amount.toFixed(2),
              },
            },
          ],
        });
      },
      onApprove: async (_data: unknown, actions: any) => {
        try {
          const details = await actions.order.capture();
          console.log("PayPal payment approved", details);
          window.alert(`Payment approved for ${tierName}.`);
        } catch (error) {
          console.error("PayPal payment failed", error);
        }
      },
      onError: (err: unknown) => {
        console.error("PayPal checkout error", err);
      },
    });

    if (button) {
      button.render(target);
    }

    return () => {
      button?.close?.();
      if (target) {
        target.innerHTML = "";
      }
    };
  }, [amount, tierName]);

  return <div ref={containerRef} className="mt-4" />;
}

const tiers = [
  {
    name: "Pilot Node",
    monthly: 40,
    desc: "Single plant monitoring for early lifecycle programs.",
    icon: Cpu,
    features: [
      "Up to 500 asset nodes",
      "Single plant deployment",
      "Condition monitoring dashboard",
      "Standard email support",
    ],
    cta: "Start Pilot",
    popular: false,
  },
  {
    name: "Enterprise Operations",
    monthly: 120,
    desc: "Full lifecycle AI across unlimited assets and sites.",
    icon: Sparkles,
    features: [
      "Unlimited asset nodes",
      "Full lifecycle AI engines",
      "Predictive alert models",
      "Utilization & OEE analytics",
      "Priority 24/7 support",
    ],
    cta: "Book Demo",
    popular: true,
  },
  {
    name: "Dedicated Infrastructure",
    monthly: null,
    desc: "On-premise and sovereign deployments with custom SLAs.",
    icon: ShieldCheck,
    features: [
      "On-premise deployment",
      "Custom SLAs & compliance",
      "Omniverse integration",
      "Dedicated solutions engineer",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existing = document.getElementById("paypal-sdk");
    if (existing) {
      setPaypalLoaded(Boolean((window as Window & { paypal?: unknown }).paypal));
      return;
    }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(Boolean((window as Window & { paypal?: unknown }).paypal));
    };
    document.body.appendChild(script);

    return () => {
      if (document.getElementById("paypal-sdk")) {
        document.getElementById("paypal-sdk")?.remove();
      }
    };
  }, []);

  return (
    <Section id="pricing" className="relative">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple Pricing That Scales With You"
        subtitle="Transparent tiers. No per-signal metering surprises."
      />

      {/* Billing Switcher */}
      <Reveal delay={0.05} className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-border/80 bg-card/90 px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm backdrop-blur-md max-w-full">
          <span
            className={`text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              annual ? "text-muted-foreground" : "text-foreground"
            }`}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-6 w-11 sm:h-7 sm:w-13 shrink-0 cursor-pointer rounded-full border transition-all duration-300 ${
              annual
                ? "border-cyan bg-cyan/25 shadow-[0_0_12px_rgba(102,110,82,0.35)]"
                : "border-border bg-surface/60"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={`block h-4 w-4 sm:h-5 sm:w-5 rounded-full shadow-sm ${
                annual ? "ml-6 sm:ml-7 bg-cyan" : "ml-1 bg-muted-foreground/80"
              }`}
            />
          </button>
          <span
            className={`text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              annual ? "text-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setAnnual(true)}
          >
            Annual
          </span>
          <span className="flex items-center gap-1 rounded-full border border-green/40 bg-green/15 px-2 sm:px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold text-green shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            20% off
          </span>
        </div>
      </Reveal>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
        {tiers.map((t, i) => {
          const price =
            t.monthly === null ? null : annual ? Math.round(t.monthly * 0.8) : t.monthly;
          const originalPrice = t.monthly;
          const TierIcon = t.icon;

          return (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-5 sm:p-7 transition-all duration-300 ${
                  t.popular
                    ? "border-2 border-cyan bg-card/95 shadow-xl shadow-cyan/10 ring-4 ring-cyan/10 lg:-translate-y-2 hover:shadow-2xl"
                    : "border border-border/80 bg-card/75 shadow-sm backdrop-blur-md hover:border-cyan/40 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Popular Pill */}
                {t.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-cyan px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                    <Sparkles className="h-3.5 w-3.5 fill-current" />
                    Most Popular
                  </div>
                )}

                {/* Card Header with Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {t.desc}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                      t.popular
                        ? "border-cyan/40 bg-cyan/15 text-cyan"
                        : "border-border/80 bg-surface/50 text-muted-foreground"
                    }`}
                  >
                    <TierIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-6 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    {price === null ? (
                      <span className="font-mono text-4xl font-extrabold tracking-tight text-cyan">
                        Custom
                      </span>
                    ) : (
                      <>
                        <span className="font-mono text-5xl font-extrabold tracking-tight text-foreground">
                          ${price}
                        </span>
                        <span className="font-mono text-sm font-semibold text-muted-foreground">
                          /mo
                        </span>
                        {annual && originalPrice && (
                          <span className="font-mono text-sm line-through text-muted-foreground/60 ml-1">
                            ${originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {price === null
                      ? "Custom contract & SLA"
                      : annual
                      ? "Billed annually ($" + (price * 12) + "/yr)"
                      : "Billed monthly, cancel anytime"}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Feature List */}
                <ul className="flex-1 space-y-3.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan mt-0.5">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span className="font-medium text-foreground/85 leading-tight">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Area */}
                <div className="mt-8 pt-4 border-t border-border/40">
                  {i < 2 ? (
                    paypalLoaded ? (
                      <PayPalCheckoutButton tierName={t.name} amount={price ?? 0} />
                    ) : (
                      <div className="flex items-center justify-center rounded-xl border border-border/60 bg-surface/40 py-3 text-xs text-muted-foreground">
                        Loading PayPal checkout…
                      </div>
                    )
                  ) : (
                    <a
                      href="#contact"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/60 bg-cyan/10 py-3.5 text-center text-sm font-bold text-cyan transition-all duration-300 hover:bg-cyan hover:text-primary-foreground hover:shadow-lg hover:shadow-cyan/20"
                    >
                      {t.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
