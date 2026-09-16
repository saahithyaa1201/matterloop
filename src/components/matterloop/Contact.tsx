import { useState, useEffect, useRef } from "react";
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
  Loader2,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          size?: "normal" | "flexible" | "compact";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlkwdkl";
const TURNSTILE_SITE_KEY = "0x4AAAAAAEtvUWgw9Ev44lSb";

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
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Initialize Cloudflare Turnstile
  useEffect(() => {
    let isMounted = true;
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    const renderWidget = () => {
      if (!turnstileContainerRef.current || !window.turnstile || widgetIdRef.current) return;
      try {
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          size: "flexible",
          callback: (token: string) => {
            if (isMounted) {
              setTurnstileToken(token);
              setErrorMessage("");
            }
          },
          "expired-callback": () => {
            if (isMounted) {
              setTurnstileToken("");
            }
          },
          "error-callback": () => {
            if (isMounted) {
              setTurnstileToken("");
              setErrorMessage("Please complete the security verification and try again.");
            }
          },
        });
        widgetIdRef.current = widgetId;
        if (pollInterval) clearInterval(pollInterval);
      } catch {
        // Container may not be rendered yet
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      pollInterval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
        }
      }, 250);
    }

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keyMap: Record<string, keyof FormData> = {
      name: "fullName",
      fullName: "fullName",
      email: "email",
      company: "company",
      job_title: "jobTitle",
      jobTitle: "jobTitle",
      inquiry_type: "topic",
      topic: "topic",
      message: "requirements",
      requirements: "requirements",
    };
    const formKey = keyMap[name] || (name as keyof FormData);
    setFormData((prev) => ({ ...prev, [formKey]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    // Field validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.company.trim() ||
      !formData.topic ||
      !formData.requirements.trim()
    ) {
      setErrorMessage("Please fill out all required operational fields.");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setErrorMessage("Please provide a valid work email address.");
      return;
    }

    // Turnstile validation
    const activeToken =
      turnstileToken ||
      (widgetIdRef.current && window.turnstile
        ? window.turnstile.getResponse(widgetIdRef.current)
        : "");

    if (!activeToken) {
      setErrorMessage("Please complete the security verification and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          job_title: formData.jobTitle.trim() || "Unspecified",
          inquiry_type: formData.topic,
          message: formData.requirements.trim(),
          "cf-turnstile-response": activeToken,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          jobTitle: "",
          topic: "",
          requirements: "",
        });
        setTurnstileToken("");
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch {
            // ignore
          }
        }
      } else {
        const errorData = await response.json().catch(() => null);
        if (errorData && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          const joinedErrors = errorData.errors
            .map((err: { message: string }) => err.message)
            .join(". ");
          setErrorMessage(joinedErrors || "We couldn't send your inquiry right now. Please try again in a moment.");
        } else {
          setErrorMessage("We couldn't send your inquiry right now. Please try again in a moment.");
        }
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch {
            // ignore
          }
          setTurnstileToken("");
        }
      }
    } catch {
      setErrorMessage("We couldn't send your inquiry right now. Please try again in a moment.");
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {
          // ignore
        }
        setTurnstileToken("");
      }
    } finally {
      setIsSubmitting(false);
    }
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
    setTurnstileToken("");
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
        <div className="p-4 overflow-hidden border shadow-xs rounded-2xl border-border/80 bg-card/60 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 pb-5 border-b lg:flex-row lg:items-center lg:justify-between border-border/50">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan shrink-0">
                  <span className="w-full h-full rounded-full opacity-75 bg-cyan animate-ping" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground">
                  MatterLoop Intelligence Flow
                </span>
              </div>
              <span className="rounded-md border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan shrink-0">
                ACTIVE PIPELINE
              </span>
            </div>

            {/* Asset Node Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                    <Icon className="w-3 h-3 text-cyan shrink-0" />
                    {node.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Flow Steps Pipeline */}
          <div className="mt-5 grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:gap-4">
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
      <div className="grid gap-8 mt-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column — Enterprise Contact Information */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-xs font-semibold text-cyan">
                <Radio className="w-3 h-3 animate-pulse" />
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
            <div className="p-4 transition-all border shadow-xs rounded-2xl border-border/80 bg-card/75 sm:p-5 backdrop-blur-md hover:border-cyan/50 hover:shadow-md">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="flex items-center justify-center w-10 h-10 border sm:h-11 sm:w-11 shrink-0 rounded-xl border-cyan/40 bg-cyan/10 text-cyan">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Inquiries & Partnerships
                  </span>
                  <h4 className="mt-0.5 text-base font-bold text-foreground">
                    Email Dispatch
                  </h4>
                  <a
                    href="mailto:contact@matterloop.net"
                    className="block mt-1 text-sm font-semibold break-all text-cyan hover:underline"
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
              <div className="p-4 transition-all border shadow-xs rounded-2xl border-border/80 bg-card/75 sm:p-5 backdrop-blur-md hover:border-cyan/50 hover:shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-10 h-10 border shrink-0 rounded-xl border-border/70 bg-surface/50 text-cyan">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan">
                      Asia-Pacific Operations
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      Sri Lanka Office
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed break-words text-muted-foreground">
                      No. 10 Deasonton Place<br />
                      Colombo 00300, Sri Lanka
                    </p>
                    <div className="flex items-center gap-2 pt-2 mt-3 border-t border-border/40">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <a
                        href="tel:+94771234531"
                        className="text-xs font-semibold transition-colors text-foreground hover:text-cyan"
                      >
                        +94 77 123 4531
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* USA Office */}
              <div className="p-4 transition-all border shadow-xs rounded-2xl border-border/80 bg-card/75 sm:p-5 backdrop-blur-md hover:border-cyan/50 hover:shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-10 h-10 border shrink-0 rounded-xl border-border/70 bg-surface/50 text-cyan">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan">
                      North America Operations
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      USA Office
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed break-words text-muted-foreground">
                      16 Washington Mews<br />
                      New York, NY 10003, USA
                    </p>
                    <div className="flex items-center gap-2 pt-2 mt-3 border-t border-border/40">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <a
                        href="tel:+17019996600"
                        className="text-xs font-semibold transition-colors text-foreground hover:text-cyan"
                      >
                        +1 701 999 6600
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="rounded-xl border border-border/60 bg-surface/30 p-3.5 sm:p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse shrink-0" />
                <span>Sovereign Infrastructure & SOC 2 Compliant Ready</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Enterprise on-premise deployments support isolated air-gapped industrial plant configurations.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right Column — Enterprise Contact Form */}
        <Reveal delay={0.16} className="lg:col-span-7">
          <div className="p-4 border shadow-xl rounded-3xl border-border/90 bg-card/90 sm:p-8 backdrop-blur-xl">
            <div className="pb-5 border-b border-border/60">
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
                <div className="flex items-center justify-center w-16 h-16 mx-auto border shadow-inner rounded-2xl border-green/40 bg-green/15 text-green">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="mt-5 text-xl font-bold text-foreground">
                  Inquiry received.
                </h4>
                <p className="max-w-md mx-auto mt-2 text-sm leading-relaxed text-muted-foreground">
                  Thank you for contacting MatterLoop. Our team will review your message and get back to you shortly.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan/60 bg-cyan/10 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-cyan transition-all hover:bg-cyan hover:text-primary-foreground cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage && (
                  <div className="p-3 text-xs font-semibold border rounded-xl border-destructive/40 bg-destructive/10 text-destructive">
                    {errorMessage}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground"
                    >
                      Full Name <span className="text-cyan">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-3.5 sm:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground"
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
                      placeholder="Email address"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-3.5 sm:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="company"
                      className="block font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground"
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
                      placeholder="Company name"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-3.5 sm:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="jobTitle"
                      className="block font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground"
                    >
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      name="job_title"
                      type="text"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Job title"
                      className="w-full rounded-xl border border-border/80 bg-surface/50 px-3.5 sm:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                    />
                  </div>
                </div>

                {/* What can we help with? Select Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="topic"
                    className="block font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground"
                  >
                    What can we help with? <span className="text-cyan">*</span>
                  </label>
                  <select
                    id="topic"
                    name="inquiry_type"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/80 bg-surface/50 px-3.5 sm:px-4 py-2.5 text-sm text-foreground transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
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
                    className="block font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground"
                  >
                    Tell us about your requirements <span className="text-cyan">*</span>
                  </label>
                  <textarea
                    id="requirements"
                    name="message"
                    rows={4}
                    required
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Describe your asset environment (machine types, sensor interfaces, plant locations, or lifecycle priorities)..."
                    className="w-full resize-none rounded-xl border border-border/80 bg-surface/50 px-3.5 sm:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-cyan focus:bg-surface/80 focus:outline-hidden focus:ring-1 focus:ring-cyan/40"
                  />
                </div>

                {/* Cloudflare Turnstile Container */}
                <div className="py-1">
                  <div ref={turnstileContainerRef} className="cf-turnstile min-h-[65px]" />
                </div>

                {/* Primary CTA button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-cyan py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
