import type { Metadata } from "next";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPostMeta } from "@/lib/insights";

const url = "https://genosapp.com/insights";

export const metadata: Metadata = {
  title: "Insights — 3D Web, AI & Product Notes",
  description:
    "Practical notes on interactive 3D web development, production AI apps, and shipping digital products — from the GenOS studio.",
  alternates: { canonical: url },
  openGraph: {
    title: "GenOS Insights — 3D Web, AI & Product Notes",
    description:
      "Practical notes on 3D web development, production AI apps, and shipping digital products.",
    url,
    type: "website",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InsightsIndex() {
  const posts = getAllPostMeta();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: "GenOS Insights",
    url,
    publisher: { "@id": "https://genosapp.com/#organization" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updated,
      url: `${url}/${p.slug}`,
    })),
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
            { name: "Insights", href: "/insights" },
          ]}
        />

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
            Insights
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Notes from the <span className="grad-text">studio.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#a7b1d4]">
            Practical writing on interactive 3D web, production AI, and shipping
            real products — the same thinking we bring to client work.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {posts.length === 0 && (
            <p className="text-[#7c88b3]">New posts coming soon.</p>
          )}
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="glass glass-hover block rounded-3xl p-7"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7c88b3]">
                <span>{formatDate(p.date)}</span>
                <span className="text-[#39406a]">·</span>
                <span>{p.readingTime}</span>
                {p.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[#b7c0e0]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#a7b1d4]">
                {p.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
