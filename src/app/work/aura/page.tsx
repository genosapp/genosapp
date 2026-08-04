import type { Metadata } from "next";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const url = "https://genosapp.com/work/aura";

export const metadata: Metadata = {
  title: "Aura Case Study — Building a Privacy-First AI Interview Coach",
  description:
    "How GenOS designed, built, and shipped Aura — a privacy-first voice AI interview coach with zero audio storage. A case study in production AI app development.",
  keywords: [
    "AI interview coach",
    "voice AI case study",
    "privacy-first AI",
    "AI app case study",
    "production AI development",
    "GenOS Aura",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Aura Case Study — Privacy-First AI Interview Coach by GenOS",
    description:
      "How GenOS designed, built, and shipped a privacy-first voice AI product with zero audio storage.",
    url,
    type: "article",
  },
};

const stats = [
  { k: "0", u: "audio files stored", s: "Privacy-first by design" },
  { k: "2–4", u: "weeks to ship", s: "Fixed scope, fixed price" },
  { k: "Live", u: "in production", s: "aura.genosapp.com" },
  { k: "97%", u: "margin model", s: "Product + services" },
];

export default function AuraCaseStudy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "Aura — Building a Privacy-First AI Interview Coach",
        description:
          "How GenOS designed, built, and shipped Aura, a privacy-first voice AI interview coach with zero audio storage.",
        url,
        author: { "@id": "https://genosapp.com/#organization" },
        publisher: { "@id": "https://genosapp.com/#organization" },
        about: "Production AI app development case study",
      },
      {
        "@type": "SoftwareApplication",
        name: "Aura",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://aura.genosapp.com",
        description:
          "Privacy-first voice AI interview coach. Voice-based mock interviews with zero audio storage.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };

  return (
    <div className="grain relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="aurora" aria-hidden>
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <SubNav />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/work/aura" },
            { name: "Aura", href: "/work/aura" },
          ]}
        />

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
            Case study · Product · Live
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Aura — a privacy-first{" "}
            <span className="grad-text">AI interview coach.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#a7b1d4]">
            Aura is GenOS&apos;s own production AI product: a voice-based mock
            interview coach that runs real, natural conversations — and stores
            zero audio files by design. It&apos;s proof that GenOS ships
            real, production-grade AI, not slideware. When you hire us, you hire
            the team that already did it.
          </p>
          <div className="mt-9">
            <a
              href="https://aura.genosapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              Try Aura live →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((x) => (
            <div key={x.s} className="glass rounded-2xl p-5">
              <div className="text-3xl font-semibold grad-text">{x.k}</div>
              <div className="text-xs text-[#7c88b3]">{x.u}</div>
              <div className="mt-2 text-sm text-[#c3cbe8]">{x.s}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <article className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-semibold sm:text-3xl">The challenge</h2>
            <p className="mt-4 leading-relaxed text-[#a7b1d4]">
              Interview practice tools are everywhere, but they ask you to trust
              them with your voice — recordings stored on someone else&apos;s
              server indefinitely. We wanted to prove you could ship a genuinely
              useful voice AI product that respects privacy absolutely: no audio
              retention, no data harvesting, just a fast, natural coaching
              conversation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold sm:text-3xl">What we built</h2>
            <p className="mt-4 leading-relaxed text-[#a7b1d4]">
              A real-time voice agent that conducts mock interviews with natural
              turn-taking, adapts questions to the role, and gives structured
              feedback — all wrapped in a clean, privacy-first architecture where
              audio is processed in the moment and never stored. It&apos;s
              deployed on its own subdomain, monitored, and iterated like any
              production product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold sm:text-3xl">Why it matters for clients</h2>
            <p className="mt-4 leading-relaxed text-[#a7b1d4]">
              Anyone can claim they build AI apps. GenOS points to a shipped,
              privacy-first voice AI at a real URL. The same engine, guardrails,
              and product discipline behind Aura is exactly what we bring to
              client AI App Sprints — cost controls, evals, and a UX people
              actually trust.
            </p>
          </section>
        </article>

        {/* CTA */}
        <section className="glass mt-20 flex flex-col items-center gap-5 rounded-3xl p-10 text-center md:p-14">
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Want an AI product like this?
          </h2>
          <p className="max-w-xl text-[#a7b1d4]">
            Our AI App Sprint ships one production AI feature in 2–4 weeks —
            fixed scope, fixed price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/ai-apps" className="btn-primary rounded-xl px-7 py-3.5 text-sm font-semibold">
              See AI App development
            </Link>
            <Link href="/#contact" className="btn-ghost rounded-xl px-7 py-3.5 text-sm font-medium">
              Book a build call
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
