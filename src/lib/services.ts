// Central content + SEO data for service pages.
// Consumed by /services, /services/[slug], and sitemap.ts so URLs, metadata,
// and copy never drift out of sync.

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  nav: string; // short label
  title: string; // H1 / page title
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  price: string;
  timeline: string;
  intro: string; // lead paragraph (indexable, keyword-rich)
  accent: string; // hex for glow
  included: { t: string; d: string }[];
  deliverables: string[];
  stack: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "3d-websites",
    nav: "3D Websites",
    title: "Interactive 3D Website Development",
    metaTitle: "Interactive 3D Website Development — React Three Fiber & WebGL",
    metaDescription:
      "GenOS builds interactive 3D websites with React Three Fiber, Three.js, and custom GLSL shaders. Real-time WebGL experiences that hit 60fps with mobile-safe fallbacks. Fixed scope, shipped in 2–4 weeks.",
    keywords: [
      "3D website development",
      "React Three Fiber agency",
      "WebGL development",
      "Three.js developer",
      "interactive 3D website",
      "GLSL shader development",
      "creative web development",
    ],
    eyebrow: "Service 01",
    price: "from $5,000",
    timeline: "2–4 weeks",
    accent: "#21d4fd",
    intro:
      "We build interactive 3D websites that people actually remember — real-time WebGL experiences powered by React Three Fiber, Three.js, and custom GLSL shaders. Dispersion glass, particle fields, and scroll-driven camera rigs, engineered to run at 60fps on desktop with graceful, static fallbacks on mobile and reduced-motion devices. This is the kind of hero experience that turns a landing page into a brand moment.",
    included: [
      { t: "Real-time WebGL scenes", d: "React Three Fiber / Three.js scenes with dispersion glass, instanced particle fields, and postprocessing (chromatic aberration, noise, vignette)." },
      { t: "Custom GLSL shaders", d: "Hand-written shaders for effects that off-the-shelf libraries can't produce — the visual signature that sets your site apart." },
      { t: "Scroll-driven motion", d: "Lenis smooth scroll, camera rigs, and IntersectionObserver reveals choreographed to your narrative." },
      { t: "Performance guardrails", d: "60fps target, DPR clamping, high-performance GL hints, and static gradient fallbacks for mobile / prefers-reduced-motion." },
    ],
    deliverables: [
      "Production-ready Next.js + R3F codebase",
      "Fully responsive with mobile-safe fallbacks",
      "Deployed to Vercel with analytics wired",
      "Lighthouse-audited performance & accessibility",
    ],
    stack: ["React Three Fiber", "Three.js", "GLSL", "Next.js", "TypeScript", "GSAP", "Lenis"],
    faqs: [
      { q: "What is a React Three Fiber website?", a: "React Three Fiber (R3F) is a React renderer for Three.js — it lets us build real-time 3D and WebGL graphics declaratively inside a modern React/Next.js app. It's the same engine behind the most memorable interactive sites on the web today." },
      { q: "Will a 3D website work on mobile and slow devices?", a: "Yes. Every build ships with a static gradient-orb fallback that renders on narrow screens and for visitors who prefer reduced motion, so the site stays fast and accessible everywhere while desktop users get the full 3D experience." },
      { q: "How much does a 3D website cost?", a: "Our interactive 3D sites start from $5,000 with a fixed scope and a 2–4 week timeline. We scope the outcome on a discovery call and give you a fixed price before any production code is written." },
      { q: "How long does it take to build?", a: "Most interactive 3D landing experiences ship in 2 to 4 weeks, including a design sprint you can click through before we write production code." },
    ],
  },
  {
    slug: "ai-apps",
    nav: "AI Apps",
    title: "AI-Powered App Development",
    metaTitle: "AI App Development — Voice Agents, RAG Assistants & LLM Features",
    metaDescription:
      "GenOS ships production AI apps: voice agents, RAG assistants, and generative tools built on OpenAI and Anthropic. Aura, our own private AI interview coach, is live proof we build what we sell. Shipped in 2–4 weeks.",
    keywords: [
      "AI app development",
      "AI voice agent development",
      "RAG assistant development",
      "LLM app development",
      "OpenAI development agency",
      "generative AI development",
      "production AI features",
    ],
    eyebrow: "Service 02",
    price: "from $3,000",
    timeline: "2–4 weeks",
    accent: "#6d8bff",
    intro:
      "We ship production AI applications — voice agents, RAG assistants, and generative tools built on OpenAI and Anthropic models. This isn't slideware or a prompt in a chat window: it's real, deployed software with private data pipelines, guardrails, and a UX people trust. Aura, our own privacy-first AI interview coach, is live proof — when you hire GenOS you hire the team that already shipped a production AI product.",
    included: [
      { t: "Voice & LLM agents", d: "Real-time voice agents and chat assistants with natural turn-taking, tool use, and streaming responses." },
      { t: "RAG on your private data", d: "Retrieval-augmented generation pipelines that ground answers in your documents, with citations and access control." },
      { t: "Generative tools", d: "Purpose-built generative features — drafting, summarizing, extraction — wired into your product or workflow." },
      { t: "Production hardening", d: "Rate limiting, cost controls, evals, and privacy-first design (Aura stores zero audio files by design)." },
    ],
    deliverables: [
      "Deployed AI feature or standalone app",
      "Private data pipeline with access control",
      "Cost & rate-limit guardrails",
      "Monitoring and iteration plan",
    ],
    stack: ["OpenAI", "Anthropic", "Next.js", "TypeScript", "Vercel", "RAG", "Voice"],
    faqs: [
      { q: "What kinds of AI apps do you build?", a: "Voice agents, retrieval-augmented (RAG) assistants grounded in your private data, and generative tools like drafting, summarization, and extraction features — all shipped to production, not demos." },
      { q: "Do you actually run AI products or just build them?", a: "Both. Aura (aura.genosapp.com) is our own live, privacy-first AI interview coach. We run production AI ourselves, so we build client apps with real operational experience — cost controls, evals, guardrails, and privacy by design." },
      { q: "How much does an AI app cost?", a: "AI App Sprints start from $3,000 for one production AI feature shipped in 2–4 weeks. It's the door-opener engagement — fixed scope, fixed price." },
      { q: "Which AI models do you use?", a: "We build on OpenAI and Anthropic models and choose the right one per task, balancing quality, latency, and cost. We're model-agnostic and design so you're never locked in." },
    ],
  },
  {
    slug: "crm",
    nav: "CRM & Tools",
    title: "Custom CRM & Internal Tools Development",
    metaTitle: "Custom CRM Development & Internal Tools — Built Around Your Workflow",
    metaDescription:
      "GenOS builds lightweight custom CRMs and internal dashboards that fit how you actually work — lead pipelines, automations, and reporting, fully managed and hosted. From $1.5k + $299/mo.",
    keywords: [
      "custom CRM development",
      "internal tools development",
      "CRM setup service",
      "lead pipeline software",
      "business automation development",
      "custom dashboard development",
      "managed CRM",
    ],
    eyebrow: "Service 03",
    price: "$1,500 + $299/mo",
    timeline: "1–2 weeks",
    accent: "#a06bff",
    intro:
      "Off-the-shelf CRMs make you bend to their workflow. We build lightweight, custom CRMs and internal dashboards that fit how you actually work — lead pipelines, automations, and reporting, designed around your process and fully managed for you. It's the recurring-revenue base of a GenOS engagement: a tool your team lives in, hosted and iterated by us so you never touch infrastructure.",
    included: [
      { t: "Custom pipelines", d: "Lead and deal stages modeled on your real sales process, not a generic template." },
      { t: "Automations", d: "Follow-ups, reminders, hand-offs, and data sync automated so nothing falls through the cracks." },
      { t: "Reporting dashboards", d: "The metrics you actually check, on one screen, updated in real time." },
      { t: "Managed & hosted", d: "Deployed, monitored, and iterated by GenOS on a simple monthly plan — no infra for you to run." },
    ],
    deliverables: [
      "Custom CRM / dashboard deployed to production",
      "Your pipeline + automations configured",
      "Reporting views for your key metrics",
      "Managed hosting & ongoing iteration",
    ],
    stack: ["Next.js", "TypeScript", "Vercel", "Postgres", "Automations", "Auth"],
    faqs: [
      { q: "Why build a custom CRM instead of using Salesforce or HubSpot?", a: "Generic CRMs force your team to adapt to their model and charge per seat forever. A custom CRM fits your exact pipeline, automates your specific workflow, and costs a predictable flat monthly fee — often cheaper and always a better fit for small, fast-moving teams." },
      { q: "How much does a custom CRM cost?", a: "Setup starts at $1,500 with a 1–2 week build, then $299/month for managed hosting, monitoring, and ongoing iteration." },
      { q: "Can you integrate with tools we already use?", a: "Yes — we wire in the tools you already run (email, calendars, payment, spreadsheets) and automate the data flow between them so everything stays in sync." },
      { q: "Who maintains it after launch?", a: "We do. The monthly plan covers hosting, monitoring, and continued iteration, so your team just uses the tool while GenOS keeps it running and improving." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
