import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">FlowGuard</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
              Drop-in error layer that catches, logs, and self-heals Make/n8n
              workflow failures automatically. Zero migration friction.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/demo"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Live Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Learn More</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/research"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  How we found this idea
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 FlowGuard. Demo built by Idea Miner.
          </p>
          <div className="flex gap-6">
            <Link
              href="/demo"
              className="text-xs text-gray-500 transition hover:text-gray-300"
            >
              Demo
            </Link>
            <Link
              href="/developers"
              className="text-xs text-gray-500 transition hover:text-gray-300"
            >
              Developers
            </Link>
            <Link
              href="/research"
              className="text-xs text-gray-500 transition hover:text-gray-300"
            >
              Research
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
