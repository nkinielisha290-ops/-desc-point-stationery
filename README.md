# Desc Point Stationery — Website

React + Vite + Tailwind CSS + Framer Motion. Imejengwa na EllieTech Solutions.

## Kuanza
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist/
```

## Kubadilisha taarifa
Taarifa zote (WhatsApp, simu, email, matawi, bei, bidhaa, vifurushi vya shule, FAQ, ushuhuda)
ziko kwenye **`src/data/site.js`**. Badilisha hapo tu.

- `BUSINESS.whatsapp` — weka namba halisi, mfano `255712345678` (bila +)
- `PRICES` na `SCHOOL_PACKS` — bei ni za mfano, thibitisha na mteja
- Picha za bidhaa zinatoka Unsplash; badilisha `img` uweke picha halisi za duka (weka kwenye `public/products/`)

## Deploy Vercel
1. Push kwenye GitHub
2. Vercel → New Project → import repo
3. Framework: **Vite** · Build: `npm run build` · Output: `dist`
