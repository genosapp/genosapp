import type { Metadata } from "next";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPostMeta, type PostMeta } from "@/lib/insights";
import { services, type Service } from "@/lib/services";

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata: Metadata = {
  title: "Search",
  description: "Search GenOS services and insights.",
  alternates: { canonical: "https://genosapp.com/search" },
  robots: { index: false, follow: true }, // query pages aren't indexable content
};

type Result = {
  type: "Service" | "Insight";
  title: string;
  description: string;
  href: string;
};

function scoreMatch(haystacks: string[], q: string): boolean {
  const needle = q.toLowerCase();
  return haystacks.some((h) => h.toLowerCase().includes(needle));
}

function searchServices(q: string): Result[] {
  return (services as Service[])
    .filter((s) =>
      scoreMatch([s.title, s.metaDescription, s.intro, ...s.keywords], q)
    )
    .map((s) => ({
      type: "Service" as const,
      title: s.title,
      description: s.metaDescription,
      href: `/services/${s.slug}`,
    }));
}

function searchInsights(q: string): Result[] {
  return (getAllPostMeta() as PostMeta[])
    .filter((p) =>
      scoreMatch([p.title, p.description, ...p.tags, ...p.keywords], q)
    )
    .map((p) => ({
      type: "Insight" as const,
      title: p.title,
      description: p.description,
      href: `/insights/${p.slug}`,
    }));
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results: Result[] = query
    ? [...searchServices(query), ...searchInsights(query)]
    : [];

  return (
    <div className="grain relative min-h-screen">
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
            { name: "Search", href: "/search" },
          ]}
        />

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
            Search
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {query ? (
              <>
                Results for <span className="grad-text">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Search GenOS"
            )}
          </h1>
        </div>

        <form action="/search" method="get" className="mt-8 flex max-w-xl gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search services and insights…"
            className="glass w-full rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-[#7c88b3] focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="btn-primary shrink-0 rounded-xl px-6 py-3.5 text-sm font-semibold"
          >
            Search
          </button>
        </form>

        <div className="mt-12 space-y-5">
          {query && results.length === 0 && (
            <p className="text-[#7c88b3]">
              No results for &ldquo;{query}&rdquo;. Try{" "}
              <Link href="/services" className="text-white underline">
                browsing services
              </Link>{" "}
              or{" "}
              <Link href="/insights" className="text-white underline">
                insights
              </Link>{" "}
              instead.
            </p>
          )}
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="glass glass-hover block rounded-3xl p-7"
            >
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-[#b7c0e0]">
                {r.type}
              </span>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">{r.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#a7b1d4]">
                {r.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
