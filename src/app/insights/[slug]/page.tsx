import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts, getPost } from "@/lib/insights";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://genosapp.com/insights/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `https://genosapp.com/insights/${post.slug}`;

  const postNode = {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    url,
    author: { "@id": "https://genosapp.com/#organization" },
    publisher: { "@id": "https://genosapp.com/#organization" },
    keywords: post.keywords.join(", "),
    mainEntityOfPage: url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#insight-content p:first-of-type"],
    },
  };

  const jsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": [
            postNode,
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }
      : { "@context": "https://schema.org", ...postNode };

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

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
            { name: post.title, href: `/insights/${post.slug}` },
          ]}
        />

        <article className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#7c88b3]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated !== post.date && (
              <>
                <span className="text-[#39406a]">·</span>
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            )}
            <span className="text-[#39406a]">·</span>
            <span>{post.readingTime}</span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[#b7c0e0]"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <div
            id="insight-content"
            className="prose-genos mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        {post.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-4">
              {post.faqs.map((f) => (
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
        )}

        <div className="glass mt-16 flex flex-col items-center gap-5 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-semibold">Have a project in mind?</h2>
          <p className="max-w-xl text-[#a7b1d4]">
            Book a 30-minute build call. Fixed scope, fixed price, shipped in 2–4 weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact" className="btn-primary rounded-xl px-7 py-3.5 text-sm font-semibold">
              Book a build call
            </Link>
            <Link href="/insights" className="btn-ghost rounded-xl px-7 py-3.5 text-sm font-medium">
              More insights
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
