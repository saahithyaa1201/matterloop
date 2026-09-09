import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Truck,
  Bot,
  Activity,
  Wrench,
  Network,
  Radio,
  Send,
  Loader2,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const assetNodes = [
  { label: "Machines", icon: Cpu },
  { label: "Vehicles", icon: Truck },
  { label: "Robotics", icon: Bot },
  { label: "Sensors", icon: Activity },
  { label: "Maintenance", icon: Wrench },
  { label: "Supply Chain", icon: Network },
];

const flowSteps = [
  { step: "01", name: "PHYSICAL ASSETS", tag: "Fleet Telemetry" },
  { step: "02", name: "SIGNALS", tag: "Edge Ingestion" },
  { step: "03", name: "INTELLIGENCE", tag: "Predictive Models" },
  { step: "04", name: "ACTION", tag: "Autonomous Ops" },
];

const helpOptions = [
  "Asset Intelligence",
  "Lifecycle Management",
  "Predictive Maintenance",
  "Asset Utilization",
  "Enterprise Deployment",
  "API & Integrations",
  "Other",
];

interface FormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  topic: string;
  requirements: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
    topic: "",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company || !formData.topic || !formData.requirements) {
      setErrorMessage("Please fill out all required operational fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate industrial API transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      company: "",
      jobTitle: "",
      topic: "",
      requirements: "",
    });
    setIsSubmitted(false);
    setErrorMessage("");
  };

  return (
    <Section id="contact" className="relative">
      <SectionHeading
        eyebrow="CONNECT WITH MATTERLOOP"
        title="Let's Build Smarter Asset Operations."
        subtitle="Connect with the MatterLoop team to explore how physical asset intelligence, lifecycle monitoring, and predictive maintenance can improve your manufacturing and supply chain operations."
      />

      {/* Industrial Intelligence Visual Flow */}
      <Reveal delay={0.08} className="mt-10">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-5 shadow-xs backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/50 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan">
                <span className="h-full w-full rounded-full bg-cyan animate-ping opacity-75" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground">
                MatterLoop Intelligence Flow
              </span>
              <span className="rounded-md border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
                ACTIVE PIPELINE
              </span>
            </div>

            {/* Asset Node Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground mr-1 hidden sm:inline-block">
                Monitored Nodes:
              </span>
              {assetNodes.map((node) => {
                const Icon = node.icon;
                return (
                  <span
                    key={node.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground"
                  >
                    <Icon className="h-3 w-3 text-cyan" />
                    {node.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Flow Steps Pipeline */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {flowSteps.map((s, idx) => (
              <div
                key={s.name}
                className="relative flex flex-col justify-between rounded-xl border border-border/60 bg-surface/30 p-3.5 transition-all hover:border-cyan/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-cyan">
                    {s.step}
                  </span>
                  {idx < flowSteps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10" />
                  )}
                </div>
                <div className="mt-2">
                  <div className="font-mono text-xs font-bold tracking-wider text-foreground">
                    {s.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {s.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Main Two-Column Layout */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column — Enterprise Contact Information */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-xs font-semibold text-cyan">
                <Radio className="h-3 w-3 animate-pulse" />
                COMMAND CENTER DISPATCH
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Talk to our team
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Have a question about MatterLoop, enterprise deployment, integrations, or asset intelligence? Our team is ready to help.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-2xl border border-border/80 bg-card/75 p-5 shadow-xs backdrop-blur-md transition-all hover:border-cyan/50 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10 text-cyan">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Inquiries & Partnerships
                  </span>
                  <h4 className="mt-0.5 text-base font-bold text-foreground">
                    Email Dispatch
                  </h4>
                  <a
                    href="mailto:contact@matterloop.net"
                    className="mt-1 block text-sm font-semibold text-cyan hover:underline break-all"
                  >
                    contact@matterloop.net
                  </a>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Guaranteed response within 4 hours during operational cycles.
                  </p>
                </div>
              </div>
            </div>

            {/* Dual Global Offices */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {/* Sri Lanka Office */}
              <div className="rounded-2xl border border-border/80 bg-card/75 p-5 shadow-xs backdrop-blur-md transition-all hover:border-cyan/50 hover:shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-surface/50 text-cyan">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan">
                      Asia-Pacific Operations
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      Sri Lanka Office
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      No. 10 Deasonton Place<br />
                      Colombo 00300, Sri Lanka
                    </p>
                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-border/40">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <a
                        href="tel:+94771234531"
                        className="text-xs font-semibold text-foreground hover:text-cyan transition-colors"
                      >
                        +94 77 123 4531
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* USA Office */}
              <div className="rounded-2xl border border-border/80 bg-card/75 p-5 shadow-xs backdrop-blur-md transition-all hover:border-cyan/50 hover:shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-surface/50 text-cyan">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan">
                      North America Operations
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      USA Office
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      16 Washington Mews<br />
                      New York, NY 10003, USA
                    </p>
                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-border/40">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <a
                        href="tel:+17019996600"
                        className="text-xs font-semibold text-foreground hover:text-cyan transition-colors"
                      >
                        +1 701 999 6600
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="rounded-xl border border-border/60 bg-surface/30 p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
                Sovereign Infrastructure & SOC 2 Compliant Ready
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Enterprise on-premise deployments support isolated air-gapped industrial plant configurations.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right Column — Enterprise Contact Form */}
        <Reveal delay={0.16} className="lg:col-span-7">
          <div className="rounded-3xl border border-border/90 bg-card/90 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="border-b border-border/60 pb-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Start a Conversation
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                  SSL Encrypted
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                Share your operational environment details to connect directly with an asset lifecycle engineer.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green/40 bg-green/15 text-green shadow-inner">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="mt-5 text-xl font-bold text-foreground">
                  Inquiry Received
                </h4>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Thank you for reaching out, <span className="font-semibold text-foreground">{formData.fullName}</span>. An industrial solutions specialist has received your requirements for <span className="font-semibold text-foreground">{formData.company}</span> and will respond within 4 operational hours.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan/60 bg-cyan/10 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-cyan transition-all hover:bg-cyan hover:text-primary-foreground"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage && (
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                    {errorMessage}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Full Name <span className="text-cyan">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Elena Rostova"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Work Email <span className="text-cyan">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. elena@acmeindustrial.com"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="company"
                      className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Company <span className="text-cyan">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Precision Robotics Corp"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="jobTitle"
                      className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="e.g. VP Operations & Reliability"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>
                </div>

                {/* What can we help with? Select Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="topic"
                    className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    What can we help with? <span className="text-cyan">*</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/80 bg-surface/50 px-4 py-2.5 text-sm text-foreground transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                  >
                    <option value="" disabled className="bg-card text-muted-foreground">
                      Select an operational focus...
                    </option>
                    {helpOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-card text-foreground">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tell us about your requirements */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="requirements"
                    className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Tell us about your requirements <span className="text-cyan">*</span>
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    required
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Describe your asset environment (machine types, sensor interfaces, plant locations, or lifecycle priorities)..."
                    className="w-full resize-none rounded-xl border border-border/80 bg-surface/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                  />
                </div>

                {/* Primary CTA button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-cyan py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Transmitting Inquiry…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                    By submitting this form, you agree to be contacted by the MatterLoop team regarding your inquiry.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
