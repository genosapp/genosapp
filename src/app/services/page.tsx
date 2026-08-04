import type { Metadata } from "next";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — 3D Websites, AI Apps & Custom CRMs",
  description:
    "GenOS services: interactive 3D websites (React Three Fiber / WebGL), production AI apps (voice agents, RAG), and custom CRMs. Fixed scope, fixed price, shipped in 2–4 weeks.",
  alternates: { canonical: "https://genosapp.com/services" },
  openGraph: {
    title: "GenOS Services — 3D Websites, AI Apps & Custom CRMs",
    description:
      "Interactive 3D websites, production AI apps, and custom CRMs. Fixed scope, fixed price, shipped in 2–4 weeks.",
    url: "https://genosapp.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="grain relative min-h-screen">
      <div className="aurora" aria-hidden>
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <SubNav />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]}
        />

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
            What we do
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Three ways to work <span className="grad-text">with us.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#a7b1d4]">
            One studio, one standard. GenOS builds interactive 3D websites,
            production AI apps, and custom CRMs — each with fixed scope, fixed
            price, and a 2–4 week timeline. Start with one, grow into all three.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="glass glass-hover relative overflow-hidden rounded-3xl p-7"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl"
                style={{ background: `radial-gradient(circle, ${s.accent}44, transparent 70%)` }}
              />
              <div className="relative">
                <span className="text-xs font-mono text-[#6b76a0]">{s.eyebrow}</span>
                <h2 className="mt-3 text-xl font-semibold">{s.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#7af0ff]">
                  {s.price} · {s.timeline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#a7b1d4]">
                  {s.intro.split(". ")[0]}.
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="glass mt-16 flex flex-col items-center gap-5 rounded-3xl p-10 text-center md:p-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Not sure which one you need?
          </h2>
          <p className="max-w-xl text-[#a7b1d4]">
            Book a 30-minute build call. We&apos;ll scope the outcome, give you a
            fixed price, and tell you honestly if we&apos;re the right team.
          </p>
          <Link href="/#contact" className="btn-primary rounded-xl px-7 py-3.5 text-sm font-semibold">
            Book a build call
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
