import Link from "next/link";

export type Crumb = { name: string; href: string };

/**
 * Visual breadcrumb trail + BreadcrumbList JSON-LD for rich results.
 * Pass the full trail including the current page (last item isn't linked).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `https://genosapp.com${c.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-[#7c88b3]">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span className="text-[#c3cbe8]">{c.name}</span>
                ) : (
                  <Link href={c.href} className="transition hover:text-white">
                    {c.name}
                  </Link>
                )}
                {!last && <span className="text-[#39406a]">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
