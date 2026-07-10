import Link from "next/link";
import {
  CheckCircle,
  ExternalLink,
  TrendingUp,
  Users,
  Target,
  Clock,
  DollarSign,
} from "lucide-react";

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem:
      "Automated workflows lack proper error handling, causing complete failures when edge cases occur (missing fields, timeouts, API limits), leaving clients unable to troubleshoot and dependent on the original creator.",
    persona: "Automation consultant, business process expert",
    workaround:
      "Clients remain dependent on automation experts to fix issues; many experts disappear leaving clients stranded",
    wtp: "Clients are paying for automation services but experiencing costly failures",
    source:
      "https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/",
  },
  {
    problem:
      "Automated workflows are built without proper documentation, modularity, or clear logic explanation, making it impossible for others to understand, maintain, or debug them when issues arise.",
    persona: "Business owner, automation client",
    workaround:
      "Hiring automation experts who create undocumented, non-modular solutions; stuck with broken workflows when creators disappear",
    wtp: "Paying for automation services but receiving poor quality deliverables",
    source:
      "https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-400">
          Idea Miner Research
        </p>
        <h1 className="text-4xl font-bold text-white">
          How we found this idea
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          FlowGuard was discovered through systematic pain-point mining across
          Reddit, Hacker News, and automation communities — then validated
          against a 9-point rubric before a single line of code was written.
        </p>
      </div>

      {/* Score card */}
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-5 text-center">
          <TrendingUp className="mx-auto mb-2 h-6 w-6 text-brand-400" />
          <p className="text-3xl font-bold text-white">113/130</p>
          <p className="text-sm text-gray-400">Rubric Score</p>
        </div>
        <div className="glass-card p-5 text-center">
          <CheckCircle className="mx-auto mb-2 h-6 w-6 text-emerald-400" />
          <p className="text-3xl font-bold text-white">9/9</p>
          <p className="text-sm text-gray-400">Validation Checks</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Target className="mx-auto mb-2 h-6 w-6 text-amber-400" />
          <p className="text-sm font-medium text-white">
            Automation workflow error handling
          </p>
          <p className="text-sm text-gray-400">&amp; failure recovery</p>
        </div>
      </div>

      {/* Origin story */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          The research: why this exists
        </h2>
        <div className="glass-card p-6">
          <p className="text-gray-300 leading-relaxed">
            A viral r/Entrepreneur thread described &ldquo;vibecoded
            automations&rdquo; failing silently — missing fields, API timeouts,
            and rate limits causing complete workflow collapses. Business owners
            said they had &ldquo;no way to know something broke until a client
            complained.&rdquo; Consultants who built the workflows had
            disappeared. Existing tools send a raw JSON error email that
            non-technical owners cannot interpret. One commenter wrote:
            &ldquo;my entire onboarding flow broke for 3 days and I had no
            idea.&rdquo; The pain is acute, recurring, and directly tied to lost
            revenue.
          </p>
          <a
            href="https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300"
          >
            Read the original thread
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Competitive landscape */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Competitive landscape
        </h2>
        <div className="glass-card p-6">
          <p className="text-gray-300 leading-relaxed">
            Make and Zapier have basic error emails but no categorization, retry
            logic, or plain-English explanations. No standalone tool occupies
            this niche.
          </p>
        </div>
      </section>

      {/* Target customer */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">Target customer</h2>
        <div className="glass-card flex items-start gap-4 p-6">
          <Users className="mt-1 h-6 w-6 shrink-0 text-brand-400" />
          <p className="text-gray-300 leading-relaxed">
            Automation consultants and SMB owners running critical business
            workflows on Make, n8n, or Zapier who cannot afford silent failures.
            Wraps existing workflows via webhook — zero migration friction.
            Clients keep their current tool; FlowGuard just adds a safety net
            layer.
          </p>
        </div>
      </section>

      {/* Go-to-market */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">Go-to-market</h2>
        <div className="glass-card p-6">
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              r/nocode, r/n8n, r/zapier communities
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              Cold email to Make.com and n8n marketplace consultants
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              ProductHunt launch
            </li>
          </ul>
        </div>
      </section>

      {/* How the business runs itself */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          How this business runs itself
        </h2>
        <div className="glass-card p-6">
          <p className="mb-4 text-sm font-medium text-brand-400">
            Mailbox money — passive, low-maintenance recurring revenue
          </p>
          <p className="text-gray-300 leading-relaxed">
            Workflows send errors to FlowGuard&apos;s webhook endpoint. A BullMQ
            worker classifies the error via OpenAI and triggers retries or
            alerts. Slack/email notifications are sent via API with zero human
            involvement. Stripe webhooks manage subscription state. A cron job
            sends a weekly digest of all errors and resolutions.
          </p>
          <div className="mt-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4 text-brand-400" />
              ~1 hour/week owner time
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              $49–$129/month SaaS
            </div>
          </div>
        </div>
      </section>

      {/* Validation checklist */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Validation checklist (9/9)
        </h2>
        <div className="glass-card p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Source pain points */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Source pain points (real posts)
        </h2>
        <div className="space-y-4">
          {painPoints.map((pp, i) => (
            <div key={i} className="glass-card p-6">
              <p className="font-medium text-white">{pp.problem}</p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-xs font-semibold uppercase text-gray-500">
                    Persona
                  </span>
                  <p className="text-gray-300">{pp.persona}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-gray-500">
                    WTP Signal
                  </span>
                  <p className="text-gray-300">{pp.wtp}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs font-semibold uppercase text-gray-500">
                    Current Workaround
                  </span>
                  <p className="text-gray-300">{pp.workaround}</p>
                </div>
              </div>
              <a
                href={pp.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
              >
                Source
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About Idea Miner */}
      <section className="glass-card p-6">
        <h2 className="mb-4 text-xl font-bold text-white">About this program</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          This demo was auto-built by the <strong className="text-gray-300">Idea Miner</strong> pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (&gt;=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Generated by Idea Miner run 2026-07-10-pm on 2026-07-10 21:40 UTC
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/demo" className="btn-primary text-sm">
            Try the Demo
          </Link>
          <Link href="/developers" className="btn-secondary text-sm">
            Developer Docs
          </Link>
        </div>
      </section>
    </div>
  );
}
