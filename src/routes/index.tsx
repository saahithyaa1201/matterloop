import { ArrowRight } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/matterloop/Nav";
import { Hero } from "@/components/matterloop/Hero";
import { Dashboard } from "@/components/matterloop/Dashboard";
import { Capabilities } from "@/components/matterloop/Capabilities";
import { Testimonials } from "@/components/matterloop/Testimonials";
import { Team } from "@/components/matterloop/Team";
import { Pricing } from "@/components/matterloop/Pricing";
import { Contact } from "@/components/matterloop/Contact";
import { Footer } from "@/components/matterloop/Footer";
import { Section, SectionHeading, Eyebrow } from "@/components/matterloop/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const title = "MatterLoop Physical Asset Lifecycle Intelligence";
const description =
  "MatterLoop unifies machinery telemetry, maintenance history and supply chain data into predictive asset lifecycle intelligence for manufacturing operations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://matterloop.net/" }
    ],
  }),
  component: Index,
});

const faqItems = [
  {
    question: "What is MatterLoop?",
    answer:
      "MatterLoop is a Physical Asset Lifecycle Intelligence platform that helps organizations monitor asset health, understand utilization, identify risks, and optimize assets throughout their operational lifecycle.",
  },
  {
    question: "What types of assets can MatterLoop monitor?",
    answer:
      "MatterLoop can support a wide range of physical assets, including industrial machinery, production equipment, robotics, vehicles, infrastructure, sensors, and other connected equipment.",
  },
  {
    question: "How does MatterLoop improve maintenance?",
    answer:
      "MatterLoop analyzes asset conditions, operational signals, and performance patterns to identify anomalies and potential failure indicators, helping teams prioritize maintenance before issues become costly disruptions.",
  },
  {
    question: "Can MatterLoop integrate with our existing systems?",
    answer:
      "Yes. MatterLoop is designed to connect with existing industrial, maintenance, production, sensor, visual, and supply chain systems, creating a unified intelligence layer without requiring organizations to replace their existing infrastructure.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Dashboard />
        <Capabilities />
        <Testimonials />
        <Team />
        <Pricing />

        <section className="relative w-full py-16 overflow-hidden md:py-24">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none opacity-70"
            style={{ backgroundImage: "url('/Ready%20to%20act%20sooner.svg')" }}
          />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-8">
            <div className="glass overflow-hidden rounded-[28px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.3fr_auto] lg:items-center">
                <div>
                  <Eyebrow>Ready to act sooner?</Eyebrow>
                  <h3 className="max-w-xl mt-4 text-2xl font-bold tracking-tight sm:mt-5 text-balance sm:text-4xl">
                    Turn asset health into a stronger operating strategy.
                  </h3>
                  <p className="max-w-xl mt-3 text-xs leading-relaxed sm:mt-4 sm:text-sm md:text-base text-muted-foreground">
                    Connect your critical systems, surface hidden risk earlier, and give every team a shared view of reliability and performance.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#75553c] px-5 py-3 text-sm font-semibold text-[#efece3] transition-all hover:brightness-110 hover:shadow-[0_14px_28px_rgba(117,85,60,0.18)]"
                  >
                    Book a demo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#faq"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-white/20 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[#75553c]/50 hover:text-[#75553c]"
                  >
                    View FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />

        <Section id="faq" className="pt-0 pb-12 md:pb-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers for Smarter Asset Operations"
            subtitle=""
          />

          <div className="max-w-3xl p-3 mx-auto mt-10 border rounded-2xl border-border bg-surface/60 sm:p-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="px-4 border rounded-xl border-border bg-white/10">
                  <AccordionTrigger className="text-base font-semibold text-left text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
