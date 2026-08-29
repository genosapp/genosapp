import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import ScrollSceneClient from "@/components/ScrollSceneClient";
import SmoothScroll from "@/components/SmoothScroll";
import Reveal from "@/components/Reveal";

const services = [
  {
    tag: "01",
    slug: "3d-websites",
    title: "Interactive 3D Websites",
    price: "from $5k",
    desc: "Real-time WebGL experiences built with React Three Fiber — dispersion glass, particle fields, scroll-driven camera rigs. The kind of site that gets remembered.",
    points: ["React Three Fiber / Three.js", "Custom GLSL shaders", "60fps, mobile-safe fallbacks"],
    glow: "from-[#21d4fd]/20 to-transparent",
  },
  {
    tag: "02",
    slug: "ai-apps",
    title: "AI-Powered Apps",
    price: "from $3k",
    desc: "We ship production AI features — voice agents, RAG assistants, generative tools. Aura, our private AI interview coach, is live proof we build what we sell.",
    points: ["Voice & LLM agents", "RAG + private data", "Shipped in 2–4 weeks"],
    glow: "from-[#6d8bff]/25 to-transparent",
  },
  {
    tag: "03",
    slug: "crm",
    title: "CRM & Internal Tools",
    price: "$1.5k + $299/mo",
    desc: "Lightweight, custom CRMs and dashboards that fit how you actually work — lead pipelines, automations, and reporting, managed for you.",
    points: ["Custom pipelines", "Automations & reporting", "Managed & hosted"],
    glow: "from-[#a06bff]/25 to-transparent",
  },
];

const process = [
  { n: "01", t: "Discovery call", d: "30 minutes to scope the outcome, not the hours. Fixed price, fixed timeline." },
  { n: "02", t: "Design sprint", d: "You see a clickable direction within days — motion, 3D, and flow before a line of prod code." },
  { n: "03", t: "Build in public", d: "Weekly builds you can touch. We share progress clips to your channels as we go." },
  { n: "04", t: "Ship & support", d: "Deployed to Vercel, monitored, and iterated. Retainers available for what comes next." },
];

const stack = [
  "React Three Fiber", "Three.js", "GLSL", "Next.js", "TypeScript",
  "OpenAI", "Anthropic", "Vercel", "Framer Motion", "GSAP", "Lenis", "Tailwind",
];

export default function Home() {
  return (
    <SmoothScroll>
      <div className="grain relative">
        <div className="aurora" aria-hidden>
          <span className="a1" />
          <span className="a2" />
          <span className="a3" />
        </div>

        {/* Persistent scroll-driven 3D canvas — spans the entire page, not
            just the hero. Camera + per-section 3D objects react to scroll
            progress (see lib/scrollProgress.ts + components/ScrollScene.tsx). */}
        <ScrollSceneClient />

        <Reveal />
        <Nav />

        {/* Floating WhatsApp button — always accessible */}
        <a
          href="https://wa.me/917305448354?text=Hi%20GenOS%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message GenOS on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-110"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* ---------------------------------- HERO --------------------------------- */}
        <section
          id="top"
          className="relative flex min-h-screen items-center overflow-hidden"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
            <div className="max-w-2xl">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#b7c0e0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7af0ff]" />
                AI-native product &amp; web studio
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
                We build the web
                <br />
                <span className="grad-text">people remember.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#a7b1d4]">
                Interactive 3D experiences, AI-powered apps, and CRMs — and we
                ship our own products, like{" "}
                <span className="text-white">Aura</span>, to prove it.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#contact" className="btn-primary rounded-xl px-6 py-3.5 text-sm font-semibold">
                  Book a build call
                </a>
                <a href="#work" className="btn-ghost rounded-xl px-6 py-3.5 text-sm font-medium">
                  See the work
                </a>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-[#6b76a0]">
            scroll
          </div>
        </section>

        {/* -------------------------------- MARQUEE -------------------------------- */}
        <div className="relative z-10 overflow-hidden border-y border-white/5 bg-white/[0.015] py-5">
          <div className="marquee text-sm font-medium text-[#7c88b3]">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-3">
                {s} <span className="text-[#39406a]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ------------------------------- SERVICES -------------------------------- */}
        <section id="services" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
          <div className="reveal max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
              What we do
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Three ways to work
              <br /> <span className="grad-text">with us.</span>
            </h2>
            <p className="mt-5 text-[#a7b1d4]">
              One studio, one standard. Start with a landing experience, an AI
              feature, or a CRM — and grow into all three.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.tag}
                className="glass glass-hover reveal relative overflow-hidden rounded-3xl p-7"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${s.glow} blur-2xl`}
                />
                <div className="relative">
                  <span className="text-xs font-mono text-[#6b76a0]">{s.tag}</span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[#7af0ff]">{s.price}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#a7b1d4]">
                    {s.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-[#c3cbe8]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6d8bff]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white underline-offset-4 hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------------------- WORK ---------------------------------- */}
        <section id="work" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
          <div className="reveal grid gap-6 md:grid-cols-2">
            <div className="glass glass-hover relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#101a3f] to-[#0a0e1f]" />
              <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#6d8bff]/30 blur-3xl" />
              <div className="relative">
                <span className="text-xs uppercase tracking-widest text-[#7af0ff]">Product · Live</span>
                <h3 className="mt-2 text-2xl font-semibold">Aura — Private AI Interview Coach</h3>
                <p className="mt-2 max-w-md text-sm text-[#a7b1d4]">
                  Voice-based AI mock interviews, privacy-first with zero audio
                  storage. Designed, built, and shipped by GenOS.
                </p>
                <a
                  href="https://aura.genosapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white underline-offset-4 hover:underline"
                >
                  Visit aura.genosapp.com →
                </a>
                <Link
                  href="/work/aura"
                  className="mt-2 block text-sm font-medium text-[#7af0ff] underline-offset-4 hover:underline"
                >
                  Read the case study →
                </Link>
              </div>
            </div>

            <div className="glass glass-hover relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#241040] to-[#0a0e1f]" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#a06bff]/30 blur-3xl" />
              <div className="relative">
                <span className="text-xs uppercase tracking-widest text-[#c9a6ff]">Studio · Content engine</span>
                <h3 className="mt-2 text-2xl font-semibold">Building in public</h3>
                <p className="mt-2 max-w-md text-sm text-[#a7b1d4]">
                  We run our own content pipeline across Instagram &amp; YouTube —
                  and turn every build into a story your audience can follow.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#c3cbe8]">
                  @genos.infotech · GenOS Tech
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------- AURA ---------------------------------- */}
        <section id="aura" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
          <div className="glass reveal grid items-center gap-10 rounded-3xl p-10 md:grid-cols-2 md:p-14">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
                Case study
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                We don&apos;t just build AI apps.
                <br />
                <span className="grad-text">We run them.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#a7b1d4]">
                Aura is our own privacy-first voice AI product — proof that GenOS
                ships real, production-grade AI, not slideware. When you hire us,
                you hire the team that already did it.
              </p>
              <a
                href="https://aura.genosapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Try Aura live
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "0", u: "audio files stored", s: "Privacy-first by design" },
                { k: "2–4", u: "weeks to ship", s: "Fixed scope, fixed price" },
                { k: "60", u: "fps 3D", s: "Real-time WebGL" },
                { k: "97%", u: "margin model", s: "Product + services" },
              ].map((x) => (
                <div key={x.s} className="glass rounded-2xl p-5">
                  <div className="text-3xl font-semibold grad-text">{x.k}</div>
                  <div className="text-xs text-[#7c88b3]">{x.u}</div>
                  <div className="mt-2 text-sm text-[#c3cbe8]">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------- PROCESS -------------------------------- */}
        <section id="process" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <div className="reveal max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-[#7af0ff]">
              How we work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From call to <span className="grad-text">shipped.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.n} className="reveal glass glass-hover rounded-3xl p-6">
                <div className="text-4xl font-semibold grad-text">{p.n}</div>
                <h3 className="mt-4 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a7b1d4]">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------- CONTACT -------------------------------- */}
        <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
          <div className="glass reveal relative overflow-hidden rounded-[2rem] p-10 text-center md:p-20">
            <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#6d8bff]/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#a06bff]/25 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Have something that should
                <br /> <span className="grad-text">stand out?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[#a7b1d4]">
                Book a 30-minute build call. We&apos;ll scope the outcome, give
                you a fixed price, and tell you honestly if we&apos;re the right team.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/917305448354?text=Hi%20GenOS%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message us on WhatsApp
                </a>
                <a href="mailto:connect@genosapp.com" className="btn-ghost rounded-xl px-7 py-3.5 text-sm font-medium">
                  connect@genosapp.com
                </a>
              </div>
              <p className="mt-6 text-sm text-[#7c88b3]">
                Prefer to call?{" "}
                <a href="tel:+917305448354" className="font-medium text-[#c3cbe8] hover:text-white">
                  +91 73054 48354
                </a>{" "}
                · or{" "}
                <a
                  href="https://aura.genosapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#c3cbe8] hover:text-white"
                >
                  see Aura first
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------- FOOTER --------------------------------- */}
        <footer className="relative z-10 border-t border-white/5 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[#6b76a0] sm:flex-row">
            <div className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="GenOS logo" width={20} height={20} className="h-5 w-5 rounded-md object-cover" />
              <span className="font-medium text-[#c3cbe8]">GenOS</span>
              <span>· AI-native product &amp; web studio</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://aura.genosapp.com" className="hover:text-white">Aura</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a
                href="https://wa.me/917305448354?text=Hi%20GenOS%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
              <a href="mailto:connect@genosapp.com" className="hover:text-white">Contact</a>
            </div>
            <div>© {new Date().getFullYear()} GenOS</div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
