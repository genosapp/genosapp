# GenOS — Business Strategy & Studio Site

> AI-native product & web studio. Services: interactive 3D websites, AI apps, CRM/internal tools.
> Live product proof: **Aura** (aura.genosapp.com) — private AI interview coach.

---

## 1. Positioning

**GenOS is an AI-native product & web studio.** We build interactive 3D web
experiences, AI-powered apps, and lightweight CRMs — and we ship our own
products, like Aura, to prove it.

The unfair advantage: **we run our own live AI product.** Anyone can *claim* they
build AI apps; GenOS points to a shipped, privacy-first voice AI at a real URL.
Lead with Aura in every pitch.

## 2. Two-layer structure (avoid the "services menu" death)

- **Layer 1 — Products** (Aura + future micro-SaaS): earn while you sleep, prove
  skill, become sales collateral. Each lives on a subdomain (`aura.`, next `___.`).
- **Layer 2 — Studio/services** (3D / AI / CRM): high-margin cash that funds the
  products and is sold *on the back of* the products you can point to.

`genosapp.com` (apex) = the holding brand / studio landing page (this repo).

## 3. Productized offers (fixed scope, fixed price — these convert)

| Offer | Price | Timeline | Role |
|---|---|---|---|
| **AI App Sprint** | from $3k | 2–4 wk | Door-opener. One AI feature shipped to prod. |
| **3D Hero Site** | $5–12k | 2–4 wk | Premium showcase. R3F landing experience. |
| **GenOS CRM Setup** | $1.5k + $299/mo | 1–2 wk | Recurring revenue base (MRR). |
| **AI Retainer** | $1.5–4k/mo | ongoing | Sticky monthly work after first project. |

**Sequence:** AI app opens the relationship → CRM makes it recurring → 3D is the
premium showcase tier. Don't sell all three cold; upsell into them.

## 4. Distribution — the actual moat

You already have what 95% of studios lack: an audience + a content machine
(IG @genos.infotech / @ai.autom, YouTube GenOS Tech, the Remotion reel pipeline).
- Every build → a 30-second "building in public" reel → funnels to genosapp.com.
- Turns the existing content hobby into the top of the sales funnel for free.

## 5. Tooling / ops (mostly free to start)

- **Hosting:** Vercel (apex + subdomains). **Booking:** Cal.com free tier.
- **Own CRM first:** Notion or Airtable pipeline before building one for clients.
- **Payments:** Stripe (invoices + subscriptions).
- **3D:** React Three Fiber. **AI:** the Aura stack.
- **Lead gen:** repoint the existing `agency/leads/leadgen.py` (OSM/Overpass) at
  businesses needing sites/AI, not just video.

## 6. Other business ideas (ranked)

1. **★ Vertical AI micro-SaaS** — turn Aura into a *family*: interview coach →
   sales-call practice → language speaking coach → exam/viva prep. Same engine,
   new market each time. Highest asymmetric upside.
2. **★ "AI app in a box"** — templatize the Aura build; ship similar apps for
   clients in days AND sell the boilerplate as a Gumroad product.
3. **Faceless AI content-as-a-service** — the existing `D:\Hermes\agency`. Keep
   it as the cash-flow floor that funds the studio ramp.
4. **3D product configurators** — furniture/jewelry/real-estate. High willingness
   to pay, defensible, showcases the R3F edge.
5. **AI automation retainers for local business** — reuse the Overpass lead-gen;
   sell chatbots/booking-AI/CRM to home-service verticals.

## 7. Next 7 days

1. ✅ Ship the `genosapp.com` apex studio landing page (this repo).
2. Write the one-page **AI App Sprint** offer (fixed price + scope).
3. Set up **Cal.com** + a Notion/Airtable sales pipeline for yourself.
4. Cut **3 reels**: Aura, a 3D demo, "we build AI apps" → funnel to the site.
5. Point the apex domain at this deployment (below).

---

## 8. The site (this repo)

Next.js 16 + React 19 + React Three Fiber studio landing page in the GenOS dark
glassmorphism style (navy gradients, glass cards, Inter).

**3D / motion techniques used:**
- Central **dispersion glass crystal** (`MeshTransmissionMaterial`, chromatic
  aberration, IOR 1.42) that refracts the aurora background — the signature effect.
- **Instanced particle field** (seeded PRNG, no `Math.random` in render).
- **Cursor-reactive drift** on the crystal via `useFrame` + pointer.
- **Postprocessing:** ChromaticAberration + Noise + Vignette. *Bloom intentionally
  omitted* — it washes out transparent canvases (documented R3F pitfall).
- **Lenis smooth scroll** + IntersectionObserver scroll-reveal + CSS aurora blobs
  + film-grain overlay + marquee.

**Performance / UX safeguards:**
- Canvas is `dynamic(ssr:false)` and **only mounts on wide, non-reduced-motion**
  screens (`useSyncExternalStore` on matchMedia). Mobile / reduced-motion get a
  static gradient-orb fallback.
- `dpr={[1, 1.8]}` clamp; `high-performance` GL hint.
- `prefers-reduced-motion` disables aurora/marquee/reveal animations in CSS.

### Run locally
```bash
cd D:\Hermes\genosapp
npm run dev      # http://localhost:3000 (or next free port)
npm run lint     # clean
npm run build    # clean, static prerender
```

### Deploy to Vercel (same account as aura.)
```bash
npm i -g vercel
cd D:\Hermes\genosapp
vercel            # first run: link/create project "genosapp"
vercel --prod     # production deploy
```
Then in Vercel → Project → Settings → **Domains**, add the **apex** `genosapp.com`
(and `www.genosapp.com`). Aura stays on its own `aura.genosapp.com` subdomain /
project — they coexist. Point the apex A/CNAME records as Vercel instructs at the
registrar. Contact is wired: WhatsApp (+91 7305448354 via wa.me), email
`connect@genosapp.com`, and a `tel:` call link — plus a floating WhatsApp button
on every scroll position.

### Customize before launch
- Contact wired: WhatsApp + connect@genosapp.com + tel link (done).
- Add an OG share image at `/public/og.png` (referenced by metadata).
- Swap the "Building in public" work card for a real second case study when ready.
- Add real portfolio thumbnails/video to the Work section (you have 20 portfolio
  videos in `agency/sales/`).
