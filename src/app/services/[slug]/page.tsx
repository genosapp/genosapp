import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { services, getService } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `https://genosapp.com/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const url = `https://genosapp.com/services/${s.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.title,
        serviceType: s.title,
        description: s.metaDescription,
        url,
        provider: { "@id": "https://genosapp.com/#organization" },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          description: `${s.price} · ${s.timeline}`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: s.nav, href: `/services/${s.slug}` },
          ]}
        />

        {/* Hero */}
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
            {s.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {s.title}
          </h1>
          <p className="mt-4 text-base font-medium text-[#7af0ff]">
            {s.price} · shipped in {s.timeline}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#a7b1d4]">{s.intro}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/#contact" className="btn-primary rounded-xl px-6 py-3.5 text-sm font-semibold">
              Book a build call
            </Link>
            <Link href="/services" className="btn-ghost rounded-xl px-6 py-3.5 text-sm font-medium">
              All services
            </Link>
          </div>
        </div>

        {/* What's included */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">What&apos;s included</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {s.included.map((item) => (
              <div key={item.t} className="glass rounded-3xl p-7">
                <div
                  className="pointer-events-none absolute h-0 w-0"
                  style={{ background: s.accent }}
                />
                <h3 className="text-lg font-semibold">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a7b1d4]">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables + stack */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <h2 className="text-xl font-semibold">What you get</h2>
            <ul className="mt-5 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-[#c3cbe8]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d8bff]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8">
            <h2 className="text-xl font-semibold">Stack</h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {s.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#b7c0e0]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {s.faqs.map((f) => (
              <details key={f.q} className="glass group rounded-2xl p-6">
                <summary className="cursor-pointer list-none text-base font-medium text-white marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-[#7af0ff] transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#a7b1d4]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass mt-20 flex flex-col items-center gap-5 rounded-3xl p-10 text-center md:p-14">
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Ready to start your {s.nav.toLowerCase()} project?
          </h2>
          <p className="max-w-xl text-[#a7b1d4]">
            Book a 30-minute call. We&apos;ll scope the outcome, give you a fixed
            price, and a timeline you can hold us to.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/917305448354?text=Hi%20GenOS%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-xl px-7 py-3.5 text-sm font-semibold"
            >
              Message us on WhatsApp
            </a>
            <a href="mailto:connect@genosapp.com" className="btn-ghost rounded-xl px-7 py-3.5 text-sm font-medium">
              connect@genosapp.com
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
