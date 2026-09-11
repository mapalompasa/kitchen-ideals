# IDEAL KITCHENS WARDROBE & HARDWARE LTD — SALES DEMO & DIGITAL EXPERIENCE

## Executive Briefing for Mapalo & Director Choolwe Simuunza

This website demo was engineered specifically to position **Ideal Kitchens Wardrobe & Hardware Ltd** (Lusaka, Zambia) as an internationally competitive, high-end interior architecture studio.

Inspired by world-class digital showcases like [Lama Lama](https://lamalama.com/), this platform departs completely from conventional WordPress templates and generic AI brochures. It is built as a **lead qualification and brand elevation engine**.

---

## 1. Verified Company Records (Zero Hallucination)
- **Company Name:** Ideal Kitchens Wardrobe & Hardware Ltd
- **Location:** Lusaka, Zambia
- **Year Established:** 2015
- **Registration No.:** 130988
- **Director:** Choolwe Simuunza
- **Direct Phone Lines:** +260 967 864 650 | +260 979 781 964
- **Email:** simunza@ideal-kitchenzm.com
- **Brand Statement:** *"Our Services are Ideal & Effective"*
- **Core Certification:** E-1 Core EU Environmental Production Standard
- **Guarantee:** 5-Year Workmanship Warranty

---

## 2. The Big Feature — Instant Kitchen Estimator
Instead of prospective clients sending random Pinterest screenshots to WhatsApp and asking *"How much?"*, the website guides them through a 6-step architectural configuration:
1. **Space & Layout:** Dimensions (Wall length, height, return wall) + Layout Blueprint (Straight, L-Shape, U-Shape, Island).
2. **Cabinet Substrate & Finish:** Textured Melamine, Moisture-Resistant MDF, High Gloss Acrylic, Super-Matte Velvet Touch.
3. **Countertop Surface:** Compact HPL, Solid Engineered Quartz, Natural Granite, Sintered Porcelain.
4. **Hardware Grade:** Standard Soft-Close, Blum Motion European Systems, Handleless Push, Architectural Brass/Black.
5. **Additions:** Larder Pantry Tower, Island Waterfall Edge, Tall Appliance Tower, Deep Pot Drawers, Under-Cabinet LED Channels.
6. **Preliminary Output & One-Click WhatsApp Action:**
   - Displays estimated project range in Zambian Kwacha: `ZMW XX,XXX — ZMW XX,XXX`.
   - Itemized transparent breakdown (Cabinetry, Stone, Hardware, Additions).
   - Generates a pre-filled, itemized WhatsApp brief directly addressed to Director Choolwe (`+260 967 864 650`).
   - Integrated lead capture for Lusaka on-site laser measurement surveys.

---

## 3. Aesthetic & Creative Highlights
- **Oversized Agency Typography:** Syne, Plus Jakarta Sans, and Space Mono for technical metadata.
- **Authentic Installation Photography:** 6 authentic project photos extracted directly from Ideal Kitchens installations in Lusaka (no generic synthetic stock).
- **Kinetic Micro-Interactions:** Dual-speed infinite marquee tickers, bespoke magnetic cursor, interactive service canvas, and fullscreen lightbox inspection.
- **100% Mobile Optimized:** Fullscreen responsive drawer, touch-friendly stepper inputs, and thumb-friendly WhatsApp integration.

---

## 4. File Structure
```
kitchen-ideals/
├── index.html                   # Semantic HTML5 single-page application
├── assets/
│   ├── css/
│   │   ├── variables.css        # Design tokens & color system
│   │   ├── animations.css       # Marquees, cursor, loader, scroll reveals
│   │   ├── style.css            # Base layouts & responsive styling
│   │   └── estimator.css        # Fullscreen estimator styling
│   ├── js/
│   │   ├── main.js              # Loader, sticky nav, lightbox, services
│   │   └── estimator.js         # Reactive calculator & WhatsApp generator
│   └── images/
│       ├── ideal_authentic_1.jpeg   # Real Ideal Kitchens project photo
│       ├── ideal_authentic_2.jpeg   # Real Ideal Kitchens project photo
│       ├── ideal_authentic_3.jpeg   # Real Ideal Kitchens project photo
│       ├── ideal_authentic_4.jpeg   # Real Ideal Kitchens project photo
│       ├── ideal_authentic_5.jpeg   # Real Ideal Kitchens project photo
│       └── ideal_authentic_6.jpeg   # Real Ideal Kitchens project photo
├── _headers                     # Cloudflare Pages security & caching headers
├── _redirects                   # Cloudflare Pages redirect rules
├── vercel.json                  # Vercel configuration (Clean URLs, caching & security headers)
├── package.json                 # Project scripts and metadata
├── 404.html                     # Branded luxury 404 error page
├── .gitignore                   # Ignored files for version control
└── README.md                    # Project documentation & deployment guide
```

---

## 5. How to Run Locally
Open `index.html` directly in any modern browser, or launch a local web server:
```bash
npx serve .
# or
python -m http.server 3500
```

---

## 6. Deploying to Cloudflare Pages (Zero-Config Global Edge)

This website is primed natively for **Cloudflare Pages** with `_headers`, `_redirects`, and static edge delivery.

### Option A: Via Cloudflare Dashboard (Recommended)
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your `kitchen-ideals` GitHub repository.
4. Set the build configuration:
   - **Framework preset:** `None`
   - **Build command:** *(Leave blank)*
   - **Build output directory:** *(Leave blank or `/`)*
   - **Root directory:** *(Leave blank)*
5. Click **Save and Deploy**. Your site will be deployed across Cloudflare's 300+ edge data centers in seconds with automatic SSL and enterprise DDoS protection.

### Option B: Via Wrangler CLI
Deploy directly from your terminal:
```bash
npx wrangler pages deploy . --project-name=kitchen-ideals
```

---

## 7. Deploying to Vercel (Alternative Production)

This project is also configured with `vercel.json` for edge performance, clean URLs, and security headers.

### Option A: GitHub & Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import** next to your repository.
3. Keep default settings (Framework Preset: **Other**, Output Directory: `.`) and click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
npx vercel --prod
```
