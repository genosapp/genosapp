import Image from "next/image";
import Link from "next/link";

/** Shared site footer (server component). */
export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[#6b76a0] sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="GenOS logo" width={20} height={20} className="h-5 w-5 rounded-md object-cover" />
          <span className="font-medium text-[#c3cbe8]">GenOS</span>
          <span>· AI-native product &amp; web studio</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/services/3d-websites" className="hover:text-white">3D Websites</Link>
          <Link href="/services/ai-apps" className="hover:text-white">AI Apps</Link>
          <Link href="/services/crm" className="hover:text-white">CRM &amp; Tools</Link>
          <Link href="/work/aura" className="hover:text-white">Aura Case Study</Link>
          <Link href="/insights" className="hover:text-white">Insights</Link>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
        <div>© {new Date().getFullYear()} GenOS</div>
      </div>
    </footer>
  );
}
