# Desc Point Stationery — Website

React + Vite + Tailwind CSS + Framer Motion. Imejengwa na EllieTech Solutions.

## Kuanza
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist/
```

## Features
- Lugha mbili (Kiswahili / English) na mandhari ya mwanga / giza
- Carousel ya bidhaa na huduma, cart inayokumbukwa na wishlist (♥)
- **Pakia faili ya printing**: kurasa za PDF zinahesabiwa zenyewe, bei inajihesabu, faili zinatumwa WhatsApp
- **Design studio**: hatua 3, makadirio ya bei papo hapo
- **Portfolio** yenye lightbox
- **Ofa za wiki** zenye countdown (zinaisha kila Jumamosi saa 2 usiku)
- **Ufuatiliaji wa oda** kwa namba ya oda (DPS-YYMMDD-XXX)
- **PWA**: inawekwa kama app kwenye simu na inafunguka hata mtandao ukiwa dhaifu

## Kubadilisha taarifa
Taarifa zote ziko kwenye **`src/data/site.js`**: WhatsApp, matawi, saa, bei, bidhaa, huduma,
bei za printing (`PRINT_RATES`), ofa (`OFFERS`), aina za design, portfolio, ushuhuda na FAQ.
Kila maandishi yana Kiswahili na Kiingereza: `b('Kiswahili', 'English')`.

## Kusasisha hali ya oda
Hariri **`public/orders.json`** (unaweza kuhariri moja kwa moja kwenye GitHub):
```json
"DPS-261011-AB3": { "status": "printing", "updated": "2026-10-11 14:30", "item": "Kadi 150", "note": "Itakuwa tayari kesho" }
```
`status`: `received` → `design` → `printing` → `ready` → `delivered`.
Ukihifadhi (commit), Vercel inasasisha website ndani ya dakika moja.

## Deploy Vercel
1. Vercel → Add New → Project → chagua repo hii
2. Framework: **Vite** · Build: `npm run build` · Output: `dist`
