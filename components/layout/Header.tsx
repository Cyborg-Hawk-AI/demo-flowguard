import Link from "next/link";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-surface-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">FlowGuard</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/demo"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Demo
          </Link>
          <Link
            href="/developers"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Developers
          </Link>
          <Link
            href="/research"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Research
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/demo" className="btn-primary text-sm">
            Try Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
