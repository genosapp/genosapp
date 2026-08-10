import Image from "next/image";
import Link from "next/link";

/**
 * Static top nav for sub-pages (server component — no scroll state needed).
 * Always glass. Links resolve to homepage sections via absolute /#hash.
 */
export default function SubNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 shadow-lg shadow-black/30">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image
            src="/logo.jpg"
            alt="GenOS logo"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg">GenOS</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-[#b7c0e0] md:flex">
          <Link href="/services" className="transition hover:text-white">Services</Link>
          <Link href="/work/aura" className="transition hover:text-white">Work</Link>
          <Link href="/insights" className="transition hover:text-white">Insights</Link>
          <a href="https://aura.genosapp.com" className="transition hover:text-white">Aura</a>
        </div>
        <a href="https://cal.com/genosapp/build-call" target="_blank" rel="noopener noreferrer" className="btn-primary rounded-xl px-4 py-2 text-sm font-medium">
          Book a build call
        </a>
      </nav>
    </header>
  );
}
