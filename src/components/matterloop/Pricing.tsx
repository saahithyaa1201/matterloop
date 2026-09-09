import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
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
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple Pricing That Scales With You"
        subtitle="Transparent tiers. No per-signal metering surprises."
      />

      <Reveal delay={0.05} className="mt-8">
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm ${annual ? "text-muted-foreground" : "text-foreground"}`}>
            Monthly
          </span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-7 w-13 shrink-0 rounded-full border transition-colors ${
              annual ? "border-cyan/60 bg-cyan/20" : "border-border bg-surface-2"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
              className={`block h-5 w-5 rounded-full bg-cyan ${annual ? "ml-7" : "ml-1"}`}
            />
          </button>
          <span className={`text-sm ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
          </span>
          <span className="rounded-full border border-green/40 bg-green/10 px-2.5 py-0.5 font-mono text-[11px] text-green">
            20% off
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {tiers.map((t, i) => {
          const price = t.monthly === null ? null : annual ? Math.round(t.monthly * 0.8) : t.monthly;
          return (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col p-6 transition-all ${
                  t.popular ? "border-l border-cyan/40 bg-transparent" : "bg-transparent"
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h3 className="min-w-0 text-base font-bold tracking-tight">{t.name}</h3>
                  {t.popular ? (
                    <span className="shrink-0 rounded-full bg-cyan px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-primary-foreground">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>

                <div className="mt-6 flex items-end gap-1.5">
                  {price === null ? (
                    <span className="font-mono text-3xl font-bold text-cyan">Custom</span>
                  ) : (
                    <>
                      <span className="font-mono text-4xl font-bold">${price.toLocaleString()}</span>
                      <span className="pb-1.5 font-mono text-xs text-muted-foreground">/mo</span>
                    </>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                      {f}
                    </li>
                  ))}
                </ul>

                {i < 2 ? (
                  paypalLoaded ? (
                    <PayPalCheckoutButton tierName={t.name} amount={price ?? 0} />
                  ) : (
                    <div className="mt-4 text-xs text-muted-foreground">Loading PayPal…</div>
                  )
                ) : (
                  <a
                    href="#top"
                    className={`mt-7 rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-all ${
                      t.popular
                        ? "bg-cyan text-primary-foreground hover:brightness-110"
                        : "border border-cyan/50 text-cyan hover:bg-cyan/10"
                    }`}
                  >
                    {t.cta}
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
