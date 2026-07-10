import Link from "next/link";
import {
  Shield,
  Webhook,
  BarChart3,
  RefreshCw,
  MessageSquare,
  Snowflake,
  ArrowRight,
  Check,
  Zap,
  Clock,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    icon: Webhook,
    title: "Webhook Error Interceptor",
    description:
      "Wrap any Make, n8n, or Zapier workflow with a single webhook URL. No code changes, no migration — just add one step.",
  },
  {
    icon: BarChart3,
    title: "Categorized Failure Dashboard",
    description:
      "API timeouts, missing fields, rate limits — each failure is classified with a suggested fix so you know exactly what to do.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Retry with Backoff",
    description:
      "Transient failures are retried automatically with configurable exponential backoff. Most issues resolve without you lifting a finger.",
  },
  {
    icon: MessageSquare,
    title: "Plain-English Alerts",
    description:
      "Slack and email notifications explain what failed and why in language your clients understand — not raw JSON dumps.",
  },
  {
    icon: Snowflake,
    title: "Freeze & Notify",
    description:
      "One click pauses a failing workflow and alerts the owner instead of letting it fail silently for days.",
  },
  {
    icon: Shield,
    title: "Zero Migration Friction",
    description:
      "Clients keep their current automation tool. FlowGuard adds a safety net layer on top — consultants love the drop-in setup.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 49,
    period: "month",
    description: "Perfect for consultants managing a handful of client workflows.",
    workflows: "Up to 10 workflows",
    features: [
      "Webhook error interceptor",
      "Categorized failure dashboard",
      "Auto-retry with backoff",
      "Slack & email alerts",
      "Freeze & notify mode",
      "7-day error history",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Unlimited",
    price: 129,
    period: "month",
    description: "For agencies and power users running dozens of critical workflows.",
    workflows: "Unlimited workflows",
    features: [
      "Everything in Starter",
      "Unlimited monitored workflows",
      "90-day error history",
      "Weekly digest reports",
      "Priority classification",
      "Custom webhook endpoints",
      "Team access (5 seats)",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxYTgyZjUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <Zap className="h-4 w-4" />
              Drop-in safety net for Make, n8n &amp; Zapier
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Stop silent workflow failures{" "}
              <span className="gradient-text">before they cost you clients</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              FlowGuard catches, classifies, and self-heals automation errors
              automatically. Wrap any workflow with one webhook — no code changes,
              no migration. Your clients get plain-English alerts, not JSON dumps.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                Explore Live Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/research" className="btn-secondary px-8 py-3 text-base">
                Why we built this
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                73% auto-resolve rate
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-400" />
                4.2 min avg resolution
              </span>
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Zero silent failures
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-white/5 bg-surface-800/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Trusted by automation consultants managing workflows for{" "}
            <span className="text-gray-300">BrightPath Consulting</span>,{" "}
            <span className="text-gray-300">Meridian Legal</span>,{" "}
            <span className="text-gray-300">Summit Realty</span>, and 40+ more
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">
              Everything you need to{" "}
              <span className="gradient-text">never miss a failure</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Five core features that turn chaotic workflow errors into
              manageable, self-healing incidents.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card group p-6 transition hover:border-brand-500/30 hover:bg-surface-700/50"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600/20 text-brand-400 transition group-hover:bg-brand-600/30">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-white/5 bg-surface-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">How it works</h2>
            <p className="mt-4 text-lg text-gray-400">
              Three steps. Five minutes. Zero migration.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Add the webhook",
                desc: "Paste FlowGuard's webhook URL as an error handler in Make, n8n, or Zapier. One module, done.",
              },
              {
                step: "02",
                title: "Errors get classified",
                desc: "Our AI worker categorizes each failure — timeout, missing field, rate limit — and suggests a fix.",
              },
              {
                step: "03",
                title: "Auto-heal or alert",
                desc: "Transient errors retry automatically. Critical ones freeze the workflow and notify the owner in plain English.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/30 bg-brand-600/10 text-xl font-bold text-brand-400">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">
              Simple pricing,{" "}
              <span className="gradient-text">serious protection</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Tiered by monitored workflows. Save 20% with annual billing.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 md:max-w-4xl md:mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card relative p-8 ${
                  plan.highlighted
                    ? "border-brand-500/40 ring-1 ring-brand-500/20"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="mt-1 text-sm text-brand-400">{plan.workflows}</p>
                <p className="mt-1 text-xs text-gray-500">
                  or ${Math.round(plan.price * 12 * 0.8)}/year (save 20%)
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-brand-600 text-white hover:bg-brand-500"
                      : "border border-white/15 text-gray-200 hover:bg-surface-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-950/80 to-surface-800 p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-600/10 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Your workflows are failing right now.
                <br />
                You just don&apos;t know it yet.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                See how FlowGuard catches, classifies, and heals errors in our
                fully interactive demo — no signup required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                  Open Interactive Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/developers"
                  className="btn-secondary px-8 py-3 text-base"
                >
                  Read Developer Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
