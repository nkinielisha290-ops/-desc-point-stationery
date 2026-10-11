// =============================================================
//  DESC POINT STATIONERY — taarifa zote za biashara ziko hapa.
//  Badilisha namba, bei, bidhaa na ofa hapa tu; website itajibadilisha.
//  b('Kiswahili', 'English') = maandishi ya lugha mbili.
// =============================================================

const b = (sw, en) => ({ sw, en })

export const BUSINESS = {
  name: 'Desc Point Stationery',
  short: 'DPS',
  slogan: 'Quality arts and designing',
  // Namba ya WhatsApp (format ya kimataifa bila + wala nafasi) — 0759 249 049
  whatsapp: '255759249049',
  phone: '+255 759 249 049',
  phoneLocal: '0759 249 049',
  email: 'descpointstationery@gmail.com',
  branches: [
    { name: b('Tawi la Madafu', 'Madafu Branch'), area: 'Madafu, Kibaha – Pwani', map: 'Madafu, Kibaha, Tanzania' },
    { name: b('Tawi la Zegereni', 'Zegereni Branch'), area: 'Zegereni, Kibaha – Pwani', map: 'Zegereni, Kibaha, Tanzania' },
  ],
  hours: {
    label: b('Jumatatu – Jumamosi', 'Monday – Saturday'),
    time: b('Saa 2:00 asubuhi – Saa 2:00 usiku', '8:00 AM – 8:00 PM'),
    open: 8, close: 20, closedDay: 0,
  },
  social: { instagram: '#', facebook: '#', tiktok: '#' },
}

export const waLink = (text) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`

const u = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const IMAGES = {
  hero: '/hero.jpg',
  about: u('photo-1654931800100-2ecf6eee7c64', 1200),
  school: u('photo-1725801731069-baa524d6bd4c', 1200),
}

// ---------------- HUDUMA (Services) ----------------
export const SERVICE_GROUPS = [
  {
    id: 'print', icon: 'Printer',
    title: b('Printing & Nakala', 'Printing & Copies'),
    blurb: b('Kuanzia ukurasa mmoja hadi maelfu — haraka, safi, na rangi zinazong’aa.', 'From one page to thousands — fast, clean and vivid.'),
    items: [b('Printing nyeusi & nyeupe', 'Black & white printing'), b('Printing ya rangi (A4, A3)', 'Colour printing (A4, A3)'), b('Photocopy (moja hadi bulk)', 'Photocopy (single to bulk)'), b('Scanning kwenda PDF / email', 'Scanning to PDF / email'), b('Printing ya picha (photo paper)', 'Photo printing (photo paper)'), b('Passport size & ID photos', 'Passport & ID photos')],
  },
  {
    id: 'finish', icon: 'Layers',
    title: b('Finishing', 'Finishing'),
    blurb: b('Mpe kazi yako muonekano wa kitaalamu unaodumu.', 'Give your work a lasting professional finish.'),
    items: [b('Lamination (ID, A4, A3)', 'Lamination (ID, A4, A3)'), b('Spiral binding', 'Spiral binding'), b('Thermal / hard-cover binding', 'Thermal / hard-cover binding'), b('Cutting & trimming', 'Cutting & trimming'), b('Stapling & booklet making', 'Stapling & booklet making'), b('Kuweka plastiki kwenye vyeti', 'Certificate sleeves')],
  },
  {
    id: 'design', icon: 'PenTool',
    title: b('Graphic Design', 'Graphic Design'),
    blurb: b('Quality arts and designing — hii ndiyo roho yetu.', 'Quality arts and designing — this is our soul.'),
    items: [b('Logo & brand identity', 'Logo & brand identity'), b('Business cards', 'Business cards'), b('Flyers, posters & brochures', 'Flyers, posters & brochures'), b('Kadi za harusi, send-off & mialiko', 'Wedding, send-off & invitation cards'), b('Banners & roll-up stands', 'Banners & roll-up stands'), b('Social media posters', 'Social media posters')],
  },
  {
    id: 'branding', icon: 'Shirt',
    title: b('Branding & Promo', 'Branding & Promo'),
    blurb: b('Weka jina la biashara yako kila mahali.', 'Put your business name everywhere.'),
    items: [b('T-shirt printing', 'T-shirt printing'), b('Mug & cup printing', 'Mug & cup printing'), b('Stickers & labels', 'Stickers & labels'), b('Mihuri (rubber stamps)', 'Rubber stamps'), b('Receipt & invoice books', 'Receipt & invoice books'), b('Certificates & ID cards', 'Certificates & ID cards')],
  },
  {
    id: 'online', icon: 'Globe',
    title: b('Huduma za Mtandaoni', 'Online Services'),
    blurb: b('Usihangaike na foleni — tunakusaidia kujaza na kutuma.', 'Skip the queues — we help you fill in and submit.'),
    items: [b('Usajili & namba ya NIDA', 'NIDA registration & number'), b('TIN ya TRA', 'TRA TIN'), b('Mkopo wa HESLB', 'HESLB loan application'), b('Maombi ya vyuo (TCU / NACTVET)', 'College applications (TCU / NACTVET)'), b('Ajira Portal & CV', 'Ajira Portal & CV'), b('Matokeo ya NECTA & leseni (BRELA)', 'NECTA results & BRELA licences')],
  },
  {
    id: 'office', icon: 'Briefcase',
    title: b('Huduma za Ofisi', 'Office Services'),
    blurb: b('Ofisi yako ndogo iko hapa kila siku.', 'Your small office, open every day.'),
    items: [b('Typing & secretarial', 'Typing & secretarial'), b('Kuandika barua & CV', 'Letters & CV writing'), b('Email & internet', 'Email & internet'), b('Kutuma documents (email/WhatsApp)', 'Sending documents (email/WhatsApp)'), b('Kuandaa mitihani ya shule', 'School exam preparation'), b('Bulk printing kwa shule & makampuni', 'Bulk printing for schools & companies')],
  },
]

// ---------------- BEI (Price list) ----------------
// Bei za mfano — thibitisha na mteja kabla ya ku-deploy.
export const PRICES = [
  { item: b('Photocopy A4 (nyeusi)', 'Photocopy A4 (B/W)'), price: 100, unit: b('ukurasa', 'page') },
  { item: b('Printing A4 (nyeusi)', 'Printing A4 (B/W)'), price: 200, unit: b('ukurasa', 'page') },
  { item: b('Printing A4 (rangi)', 'Printing A4 (colour)'), price: 500, unit: b('ukurasa', 'page') },
  { item: b('Scanning', 'Scanning'), price: 500, unit: b('ukurasa', 'page') },
  { item: b('Lamination A4', 'Lamination A4'), price: 1500, unit: b('kipande', 'piece') },
  { item: b('Spiral binding', 'Spiral binding'), price: 2000, unit: b('kitabu', 'book') },
  { item: b('Passport size (picha 4)', 'Passport size (4 photos)'), price: 3000, unit: b('seti', 'set') },
  { item: b('Business cards (100)', 'Business cards (100)'), price: 25000, unit: b('boksi', 'box') },
]

// ---------------- KIKOKOTOO CHA PRINTING (Upload) ----------------
// Bei kwa ukurasa mmoja (upande mmoja). Pande mbili = bei × 2 × 0.9
export const PRINT_RATES = {
  A4: { bw: 200, color: 500 },
  A3: { bw: 500, color: 1200 },
  A5: { bw: 150, color: 350 },
}
export const PRINT_FINISH = [
  { id: 'none', label: b('Hakuna', 'None'), price: 0 },
  { id: 'staple', label: b('Stapling', 'Stapling'), price: 200 },
  { id: 'spiral', label: b('Spiral binding', 'Spiral binding'), price: 2000 },
  { id: 'hard', label: b('Hard cover', 'Hard cover'), price: 6000 },
  { id: 'laminate', label: b('Lamination (kwa ukurasa)', 'Lamination (per page)'), price: 1500, perPage: true },
]
export const BULK_DISCOUNT = { pages: 100, percent: 10 } // kurasa 100+ = punguzo 10%

// ---------------- BIDHAA (Products) ----------------
export const CATEGORIES = [
  { id: 'all', label: b('Zote', 'All') },
  { id: 'Shule', label: b('Shule', 'School') },
  { id: 'Ofisi', label: b('Ofisi', 'Office') },
  { id: 'Sanaa', label: b('Sanaa', 'Art') },
  { id: 'Karatasi', label: b('Karatasi', 'Paper') },
]
const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]))
export const catLabel = (id) => CAT[id] || id

export const PRODUCTS = [
  { id: 'p1', cat: 'Shule', price: 3500, img: u('photo-1567855354833-ac2c4f967b0c', 1000), tag: b('Maarufu', 'Popular'),
    name: b('Seti ya kalamu za rangi', 'Coloured pen set'), unit: b('seti', 'set'),
    desc: b('Kalamu 4 za rangi tofauti zinazoandika laini bila kukatika. Nzuri kwa notes, kusahihisha na ku-highlight.', 'Four smooth-writing pens in different colours. Great for notes, marking and highlighting.') },
  { id: 'p2', cat: 'Sanaa', price: 8000, img: u('photo-1513542789411-b6a5d4f31634', 1000),
    name: b('Penseli za rangi (pakiti 24)', 'Colour pencils (pack of 24)'), unit: b('pakiti', 'pack'),
    desc: b('Rangi 24 zinazong’aa kwa michoro, ramani na kazi za sanaa za shule. Ncha imara isiyovunjika haraka.', '24 bright colours for drawings, maps and school art. Strong tips that don’t snap easily.') },
  { id: 'p3', cat: 'Karatasi', price: 13000, img: u('photo-1631173716529-fd1696a807b0', 1000), tag: b('Bulk', 'Bulk'),
    name: b('Rimu ya karatasi A4 (500)', 'A4 paper ream (500)'), unit: b('rimu', 'ream'),
    desc: b('Karatasi nyeupe 80gsm, kurasa 500. Inafaa printer, photocopy na ofisi. Punguzo kwa rimu 5 au zaidi.', 'White 80gsm, 500 sheets. For printers, copiers and offices. Discount on 5+ reams.') },
  { id: 'p4', cat: 'Ofisi', price: 2500, img: u('photo-1615988938302-bd2a5a7023bc', 1000),
    name: b('Mkasi wa ofisi', 'Office scissors'), unit: b('kipande', 'piece'),
    desc: b('Mkasi wenye makali ya chuma cha pua na mshiko laini. Unakata karatasi, kadi na plastiki kwa urahisi.', 'Stainless steel blades with a soft grip. Cuts paper, card and plastic with ease.') },
  { id: 'p5', cat: 'Shule', price: 12000, img: u('photo-1601001435957-74f0958a93fb', 1000), tag: b('Back to school', 'Back to school'),
    name: b('Madaftari (dazeni 1)', 'Exercise books (dozen)'), unit: b('dazeni', 'dozen'),
    desc: b('Madaftari 12 ya kurasa 96 yenye mistari. Karatasi nzito isiyopenya wino. Bei maalum kwa shule.', '12 ruled 96-page books. Thick paper that ink won’t bleed through. Special school pricing.') },
  { id: 'p6', cat: 'Ofisi', price: 1500, img: u('photo-1551925608-12e169132446', 1000),
    name: b('Markers za ubaoni', 'Whiteboard markers'), unit: b('kipande', 'piece'),
    desc: b('Whiteboard markers zinazofutika bila kuacha doa. Zinapatikana bluu, nyeusi, nyekundu na kijani.', 'Wipe clean with no stains. Available in blue, black, red and green.') },
  { id: 'p7', cat: 'Shule', price: 3000, img: u('photo-1497864149936-d3163f0c0f4b', 1000),
    name: b('Penseli HB (dazeni)', 'HB pencils (dozen)'), unit: b('dazeni', 'dozen'),
    desc: b('Penseli 12 za HB kwa kuandika na kuchora. Zinachongeka vizuri na hazikatiki ovyo.', '12 HB pencils for writing and drawing. Sharpen cleanly and don’t break easily.') },
  { id: 'p8', cat: 'Karatasi', price: 2000, img: u('photo-1513077202514-c511b41bd4c7', 1000),
    name: b('Kadi za salamu & bahasha', 'Greeting cards & envelopes'), unit: b('kadi', 'card'),
    desc: b('Kadi za birthday, shukrani na pongezi pamoja na bahasha. Tunaweza kuandika jina na ujumbe wako.', 'Birthday, thank-you and congratulation cards with envelopes. We can add your name and message.') },
  { id: 'p9', cat: 'Ofisi', price: 18000, img: u('photo-1456735190827-d1262f71b8a3', 1000), tag: b('Mpya', 'New'),
    name: b('Organizer ya mezani + vifaa', 'Desk organiser + supplies'), unit: b('seti', 'set'),
    desc: b('Organizer ya mezani yenye kalamu, sticky notes na karatasi za rangi. Mezani pako panakuwa nadhifu.', 'Desk organiser with pens, sticky notes and coloured paper. Keeps your desk tidy.') },
  { id: 'p10', cat: 'Sanaa', price: 4000, img: u('photo-1629652487043-fb2825838f8c', 1000),
    name: b('Crayons za watoto', 'Kids’ crayons'), unit: b('pakiti', 'pack'),
    desc: b('Crayons salama kwa watoto wa chekechea na darasa la awali. Rangi angavu zinazodumu.', 'Safe crayons for nursery and early-grade children. Bright, long-lasting colours.') },
  { id: 'p11', cat: 'Ofisi', price: 7000, img: u('photo-1621413268056-ce8911fe1563', 1000),
    name: b('Notebook ya kifahari', 'Premium notebook'), unit: b('kipande', 'piece'),
    desc: b('Notebook ya jalada gumu kwa vikao, mipango na shajara. Zawadi nzuri kwa mfanyakazi au mwalimu.', 'Hard-cover notebook for meetings, plans and journaling. A great gift for staff or teachers.') },
  { id: 'p12', cat: 'Ofisi', price: 25000, img: u('photo-1654931800100-2ecf6eee7c64', 1000),
    name: b('Seti ya ofisi (calculator, stapler...)', 'Office kit (calculator, stapler…)'), unit: b('seti', 'set'),
    desc: b('Calculator, stapler, mkasi na notepad kwa pamoja. Kila kitu ofisi mpya inahitaji siku ya kwanza.', 'Calculator, stapler, scissors and notepad together. Everything a new office needs on day one.') },
]

// ---------------- HUDUMA ZENYE BEI (carousel na cart) ----------------
export const SERVICE_ITEMS = [
  { id: 's1', cat: 'Printing', price: 500, img: u('photo-1503694978374-8a2fa686963a', 1000), tag: b('Haraka', 'Fast'),
    name: b('Printing ya rangi A4', 'A4 colour printing'), unit: b('ukurasa', 'page'),
    desc: b('Printing ya rangi yenye ubora wa juu kwa ripoti, picha, vyeti na matangazo. Pakia faili hapa au tuma WhatsApp.', 'High-quality colour printing for reports, photos, certificates and adverts. Upload your file here or send it on WhatsApp.') },
  { id: 's2', cat: 'Printing', price: 100, img: u('photo-1553013983-15241ab69e57', 1000),
    name: b('Photocopy nyeusi A4', 'A4 B/W photocopy'), unit: b('ukurasa', 'page'),
    desc: b('Nakala safi na zinazosomeka, kuanzia ukurasa mmoja hadi maelfu. Bei maalum kwa mitihani ya shule.', 'Clean, readable copies from one page to thousands. Special rates for school exams.') },
  { id: 's3', cat: 'Branding', price: 15000, img: u('photo-1693031630369-bd429a57f115', 1000), tag: b('Maarufu', 'Popular'),
    name: b('Banner printing', 'Banner printing'), unit: b('mita²', 'm²'),
    desc: b('Banner za flex zenye rangi zisizofifia kwa jua. Kwa maduka, sherehe, kampeni na matukio. Design ni bure kwa oda ya mita 2+.', 'Flex banners with sun-proof colours for shops, parties, campaigns and events. Free design on 2 m²+.') },
  { id: 's4', cat: 'Design', price: 25000, img: u('photo-1718670013921-2f144aba173a', 1000),
    name: b('Business cards (100)', 'Business cards (100)'), unit: b('boksi', 'box'),
    desc: b('Kadi 100 za biashara pande mbili, karatasi nzito ya 300gsm. Design ya kitaalamu imejumuishwa.', '100 double-sided cards on heavy 300gsm stock. Professional design included.') },
  { id: 's5', cat: 'Design', price: 2500, img: u('photo-1633037773384-27d7ac0491e7', 1000), tag: b('Kisanii', 'Artistic'),
    name: b('Kadi za harusi & send-off', 'Wedding & send-off cards'), unit: b('kadi', 'card'),
    desc: b('Kadi za mialiko zilizobuniwa kwa ladha yenu, pamoja na bahasha. Oda ya kuanzia kadi 50.', 'Invitation cards designed to your taste, with envelopes. Minimum order 50 cards.') },
  { id: 's6', cat: 'Design', price: 50000, img: u('photo-1581079289196-67865ea83118', 1000),
    name: b('Logo & brand identity', 'Logo & brand identity'), unit: b('kazi', 'project'),
    desc: b('Logo ya kipekee, rangi na fonts za brand yako, pamoja na marekebisho mpaka uridhike. Tayari ndani ya siku 2–4.', 'A unique logo, colours and fonts, with revisions until you’re happy. Ready in 2–4 days.') },
  { id: 's7', cat: 'Branding', price: 15000, img: u('photo-1562157873-818bc0726f68', 1000),
    name: b('T-shirt printing', 'T-shirt printing'), unit: b('kipande', 'piece'),
    desc: b('T-shirt pamoja na printing ya logo au ujumbe wako. Kwa vikundi, kampeni, harusi na timu za kazi.', 'T-shirt with your logo or message printed. For groups, campaigns, weddings and teams.') },
  { id: 's8', cat: 'Branding', price: 25000, img: u('photo-1436918898788-ebce04d38e46', 1000),
    name: b('Mihuri (rubber stamp)', 'Rubber stamps'), unit: b('muhuri', 'stamp'),
    desc: b('Muhuri wa ofisi, shule au kampuni wenye wino wa ndani (self-inking). Unakuwa tayari ndani ya saa 24.', 'Self-inking stamp for your office, school or company. Ready within 24 hours.') },
  { id: 's9', cat: 'Finishing', price: 2000, img: u('photo-1693031630146-568e2f72db0e', 1000),
    name: b('Binding & lamination', 'Binding & lamination'), unit: b('kitabu', 'book'),
    desc: b('Spiral binding kwa ripoti, tasnifu na proposals, pamoja na lamination ya vyeti na vitambulisho.', 'Spiral binding for reports, theses and proposals, plus lamination for certificates and IDs.') },
  { id: 's10', cat: 'Mtandaoni', price: 5000, img: u('photo-1516131206008-dd041a9764fd', 1000),
    name: b('Huduma za mtandaoni', 'Online applications'), unit: b('huduma', 'service'),
    desc: b('Tunakusaidia NIDA, TIN ya TRA, HESLB, TCU, Ajira Portal na BRELA. Unaondoka na nakala ya maombi yako.', 'We help with NIDA, TRA TIN, HESLB, TCU, Ajira Portal and BRELA. You leave with a copy of your application.') },
  { id: 's11', cat: 'Printing', price: 3000, img: u('photo-1510511336377-1a9caa095849', 1000),
    name: b('Passport size photos', 'Passport size photos'), unit: b('picha 4', '4 photos'),
    desc: b('Picha za passport papo hapo kwa NIDA, pasipoti, shule na maombi ya kazi. Background nyeupe au bluu.', 'Instant passport photos for NIDA, passports, school and job applications. White or blue background.') },
  { id: 's12', cat: 'Design', price: 35000, img: u('photo-1642480532034-362360552ccb', 1000),
    name: b('Flyers & posters (100)', 'Flyers & posters (100)'), unit: b('100 pcs', '100 pcs'),
    desc: b('Flyers za A5 za rangi kamili pamoja na design. Njia rahisi ya kutangaza biashara au tukio lako.', 'Full-colour A5 flyers including design. An easy way to promote your business or event.') },
]

export const ALL_ITEMS = [...PRODUCTS, ...SERVICE_ITEMS]

// ---------------- OFA ZA WIKI (Offers & countdown) ----------------
// Ofa zinaisha kila Jumamosi saa 2:00 usiku (zinajirudia kila wiki).
// Kwa ofa ya tarehe maalum, weka endsAt: '2026-12-24T20:00:00+03:00'
export const OFFERS = [
  { id: 'o1', itemId: 'p5', oldPrice: 12000, price: 9500, badge: b('-21%', '-21%'),
    title: b('Madaftari ya muhula mpya', 'New-term exercise books'),
    note: b('Dazeni moja ya madaftari ya kurasa 96', 'One dozen 96-page exercise books') },
  { id: 'o2', itemId: 's4', oldPrice: 25000, price: 20000, badge: b('Design BURE', 'FREE design'),
    title: b('Business cards + design', 'Business cards + design'),
    note: b('Kadi 100 pande mbili, design imejumuishwa', '100 double-sided cards, design included') },
  { id: 'o3', itemId: 's3', oldPrice: 15000, price: 12000, badge: b('-20%', '-20%'),
    title: b('Banner kwa mita²', 'Banner per m²'),
    note: b('Kwa oda ya mita 2 au zaidi wiki hii', 'On orders of 2 m² or more this week') },
]

// ---------------- DESIGN STUDIO (Omba quote) ----------------
export const DESIGN_TYPES = [
  { id: 'wedding', icon: 'Heart', label: b('Kadi za harusi / send-off', 'Wedding / send-off cards'), base: 2500, per: 'unit', unit: b('kadi', 'card'), min: 50, days: b('siku 3–5', '3–5 days') },
  { id: 'logo', icon: 'Gem', label: b('Logo & brand', 'Logo & brand'), base: 50000, per: 'job', unit: b('kazi', 'project'), min: 1, days: b('siku 2–4', '2–4 days') },
  { id: 'cards', icon: 'IdCard', label: b('Business cards', 'Business cards'), base: 250, per: 'unit', unit: b('kadi', 'card'), min: 100, days: b('siku 1', '1 day') },
  { id: 'flyer', icon: 'FileImage', label: b('Flyers & posters', 'Flyers & posters'), base: 350, per: 'unit', unit: b('nakala', 'copy'), min: 50, days: b('siku 1–2', '1–2 days') },
  { id: 'banner', icon: 'RectangleHorizontal', label: b('Banner / roll-up', 'Banner / roll-up'), base: 15000, per: 'unit', unit: b('mita²', 'm²'), min: 1, days: b('siku 1–2', '1–2 days') },
  { id: 'tshirt', icon: 'Shirt', label: b('T-shirts & promo', 'T-shirts & promo'), base: 15000, per: 'unit', unit: b('kipande', 'piece'), min: 10, days: b('siku 2–3', '2–3 days') },
]
export const DESIGN_EXTRAS = [
  { id: 'rush', label: b('Haraka (ndani ya saa 24)', 'Rush (within 24 hours)'), pct: 25 },
  { id: 'premium', label: b('Karatasi/kitambaa cha kifahari', 'Premium paper/fabric'), pct: 20 },
  { id: 'delivery', label: b('Delivery Kibaha', 'Delivery within Kibaha'), flat: 3000 },
]

// ---------------- PORTFOLIO (kazi zetu) ----------------
// Picha za mfano — badilisha na picha halisi za kazi za Desc Point (weka kwenye public/portfolio/)
export const PORTFOLIO_CATS = [
  { id: 'all', label: b('Zote', 'All') },
  { id: 'cards', label: b('Kadi', 'Cards') },
  { id: 'brand', label: b('Branding', 'Branding') },
  { id: 'print', label: b('Printing', 'Printing') },
  { id: 'apparel', label: b('T-shirts', 'Apparel') },
]
export const PORTFOLIO = [
  { id: 'w1', cat: 'cards', img: u('photo-1633037773384-27d7ac0491e7', 1200), title: b('Kadi za harusi – Neema & Daudi', 'Wedding cards – Neema & Daudi'), detail: b('Kadi 200, karatasi ya kifahari na utepe wa dhahabu', '200 cards, premium stock with gold ribbon'), tall: true },
  { id: 'w2', cat: 'brand', img: u('photo-1718670013921-2f144aba173a', 1200), title: b('Business cards za duka la vipodozi', 'Business cards for a beauty shop'), detail: b('Design + kadi 300, 350gsm matte', 'Design + 300 cards, 350gsm matte') },
  { id: 'w3', cat: 'print', img: u('photo-1693031630369-bd429a57f115', 1200), title: b('Banner ya kampeni ya shule', 'School campaign banner'), detail: b('Flex banner mita 3 × 1', '3 × 1 m flex banner') },
  { id: 'w4', cat: 'apparel', img: u('photo-1562157873-818bc0726f68', 1200), title: b('T-shirts za kongamano la kanisa', 'Church conference T-shirts'), detail: b('T-shirt 120, rangi 4', '120 shirts, 4 colours'), tall: true },
  { id: 'w5', cat: 'brand', img: u('photo-1581079289196-67865ea83118', 1200), title: b('Brand identity ya mgahawa', 'Restaurant brand identity'), detail: b('Logo, rangi, menu na stickers', 'Logo, palette, menu and stickers') },
  { id: 'w6', cat: 'cards', img: u('photo-1741893043659-ca8b82a8b637', 1200), title: b('Seti ya mialiko ya send-off', 'Send-off invitation suite'), detail: b('Kadi, bahasha na kadi za asante', 'Cards, envelopes and thank-you notes') },
  { id: 'w7', cat: 'print', img: u('photo-1693031630146-568e2f72db0e', 1200), title: b('Vitabu vya mitihani ya shule', 'School exam booklets'), detail: b('Nakala 1,500 zimebanwa na kukatwa', '1,500 copies stapled and trimmed') },
  { id: 'w8', cat: 'brand', img: u('photo-1436918898788-ebce04d38e46', 1200), title: b('Mihuri ya ofisi', 'Office stamps'), detail: b('Mihuri 6 self-inking kwa kampuni', '6 self-inking stamps for a company'), tall: true },
  { id: 'w9', cat: 'print', img: u('photo-1642480532034-362360552ccb', 1200), title: b('Flyers za ufunguzi wa duka', 'Shop opening flyers'), detail: b('Flyers 500 za A5 rangi kamili', '500 full-colour A5 flyers') },
]

// ---------------- UFUATILIAJI WA ODA ----------------
// Hali ya oda inasomwa kutoka public/orders.json (hariri faili hilo kwenye GitHub).
export const ORDER_STEPS = [
  { id: 'received', label: b('Imepokelewa', 'Received'), icon: 'Inbox' },
  { id: 'design', label: b('Design / maandalizi', 'Design / prep'), icon: 'PenTool' },
  { id: 'printing', label: b('Inachapwa', 'Printing'), icon: 'Printer' },
  { id: 'ready', label: b('Tayari kuchukuliwa', 'Ready for pickup'), icon: 'PackageCheck' },
  { id: 'delivered', label: b('Imekabidhiwa', 'Delivered'), icon: 'BadgeCheck' },
]

// ---------------- VIFURUSHI VYA SHULE ----------------
export const SCHOOL_PACKS = [
  {
    id: 'k1', price: 25000,
    name: b('Kifurushi cha Awali', 'Early Years Pack'),
    level: b('Chekechea & Darasa 1–2', 'Nursery & Grades 1–2'),
    items: [b('Madaftari 6', '6 exercise books'), b('Penseli 6 + kifutio + kichongeo', '6 pencils + eraser + sharpener'), b('Crayons pakiti 1', '1 pack of crayons'), b('Rula & mkasi wa watoto', 'Ruler & kids’ scissors'), b('Mfuko wa plastiki wa vitabu', 'Plastic book bag')],
  },
  {
    id: 'k2', price: 40000, featured: true,
    name: b('Kifurushi cha Msingi', 'Primary Pack'),
    level: b('Darasa 3–7', 'Grades 3–7'),
    items: [b('Madaftari 12 (counter books)', '12 counter books'), b('Kalamu 6 + penseli 6', '6 pens + 6 pencils'), b('Mathematical set', 'Mathematical set'), b('Kamusi ndogo', 'Pocket dictionary'), b('Covers & labels za majina', 'Covers & name labels'), b('Mfuko wa shule', 'School bag')],
  },
  {
    id: 'k3', price: 60000,
    name: b('Kifurushi cha Sekondari', 'Secondary Pack'),
    level: b('Kidato 1–6', 'Forms 1–6'),
    items: [b('Counter books 10 (kubwa)', '10 large counter books'), b('Kalamu 10 + highlighters', '10 pens + highlighters'), b('Scientific calculator', 'Scientific calculator'), b('Mathematical set', 'Mathematical set'), b('Graph book & ruled pads', 'Graph book & ruled pads'), b('File & folder', 'File & folder')],
  },
]

// Ushuhuda wa mfano — badilisha na wa wateja halisi kabla ya kwenda live
export const TESTIMONIALS = [
  { name: 'Mwalimu Rehema', role: b('Shule ya Msingi, Kibaha', 'Primary school, Kibaha'), service: b('Printing ya mitihani', 'Exam printing'), text: b('Mitihani yetu ya mwisho wa muhula wanaichapa wao kila mara. Kazi safi, kwa wakati, na bei inaeleweka.', 'They print our end-of-term exams every time. Clean work, on time, and fair prices.') },
  { name: 'Juma Salim', role: b('Mfanyabiashara, Madafu', 'Shop owner, Madafu'), service: b('Logo & banner', 'Logo & banner'), text: b('Walinitengenezea logo, business cards na banner ya duka. Wateja wanauliza nani alinitengenezea!', 'They made my logo, business cards and shop banner. Customers keep asking who designed them!') },
  { name: 'Neema & Daudi', role: b('Maharusi, Kibaha', 'Newlyweds, Kibaha'), service: b('Kadi za harusi', 'Wedding cards'), text: b('Kadi zetu za harusi zilikuwa nzuri mno. Walisikiliza kila tulichotaka na wakaongeza ubunifu wao.', 'Our wedding cards were beautiful. They listened to everything we wanted and added their own creativity.') },
  { name: 'Baraka M.', role: b('Mwanafunzi wa chuo', 'University student'), service: b('HESLB & printing', 'HESLB & printing'), text: b('Walinisaidia maombi ya HESLB na kuprint documents zote siku moja. Huduma ya haraka sana.', 'They helped with my HESLB application and printed all my documents the same day. Very fast service.') },
  { name: 'Mama Asha', role: b('Mzazi, Zegereni', 'Parent, Zegereni'), service: b('Kifurushi cha shule', 'School pack'), text: b('Nilichukua kifurushi cha msingi kwa watoto wawili. Kila kitu kilikuwa tayari, hata majina yameandikwa kwenye madaftari.', 'I bought the primary pack for two children. Everything was ready, even the names written on the books.') },
  { name: 'Peter Kimaro', role: b('Meneja, kampuni ya usafirishaji', 'Manager, logistics company'), service: b('Receipt books & mihuri', 'Receipt books & stamps'), text: b('Receipt books na muhuri wa kampuni vilikuwa tayari ndani ya saa 24. Tumewapa kazi zetu zote za printing.', 'Receipt books and the company stamp were ready within 24 hours. We now give them all our printing.') },
  { name: 'Zainabu H.', role: b('Mjasiriamali wa vipodozi', 'Cosmetics entrepreneur'), service: b('Labels & stickers', 'Labels & stickers'), text: b('Labels za bidhaa zangu zimefanya biashara yangu ionekane ya kimataifa. Mauzo yamepanda kweli.', 'My product labels make my brand look international. Sales have really gone up.') },
  { name: 'Mchungaji Elia', role: b('Kanisa, Kibaha', 'Church, Kibaha'), service: b('T-shirts & banners', 'T-shirts & banners'), text: b('T-shirt 120 za kongamano zilikuwa safi na zilifika kabla ya siku. Tutaendelea kufanya kazi nao.', '120 conference T-shirts were perfect and arrived early. We will keep working with them.') },
  { name: 'Fatma Said', role: b('Mwanafunzi, kidato cha sita', 'Form six student'), service: b('NECTA & TCU', 'NECTA & TCU'), text: b('Walinielekeza hatua kwa hatua kwenye maombi ya chuo. Sikuhitaji kwenda mjini kabisa.', 'They guided me step by step through my college application. I didn’t need to travel to town at all.') },
]

export const FAQS = [
  { q: b('Naweza kupakia faili hapa na kuchukua baadaye?', 'Can I upload my file here and collect later?'), a: b('Ndiyo. Tumia sehemu ya "Pakia faili", chagua aina ya printing, kisha tuma kwa WhatsApp. Utapata namba ya oda ya kufuatilia, na tutakujulisha kazi ikiwa tayari.', 'Yes. Use the "Upload file" section, choose your print options and send on WhatsApp. You get an order number to track, and we’ll tell you when it’s ready.') },
  { q: b('Nitafuatiliaje oda yangu?', 'How do I track my order?'), a: b('Kila oda ina namba kama DPS-261011-AB3. Iingize kwenye sehemu ya "Fuatilia oda" kuona hatua iliyofikia.', 'Every order has a number like DPS-261011-AB3. Enter it in "Track order" to see its progress.') },
  { q: b('Mnafanya delivery?', 'Do you deliver?'), a: b('Ndiyo, ndani ya Kibaha na maeneo ya karibu kwa oda za bulk na vifurushi vya shule. Wasiliana nasi kupata gharama ya usafiri.', 'Yes, within Kibaha and nearby for bulk orders and school packs. Contact us for the delivery fee.') },
  { q: b('Design ya logo au kadi inachukua muda gani?', 'How long does a logo or card design take?'), a: b('Kazi ndogo kama business cards au flyers ni siku 1. Logo na brand identity ni siku 2–4 pamoja na marekebisho.', 'Small jobs like business cards or flyers take 1 day. Logos and brand identity take 2–4 days including revisions.') },
  { q: b('Mnapokea malipo gani?', 'Which payments do you accept?'), a: b('Taslimu, M-Pesa, Mixx by Yas, Airtel Money, HaloPesa na benki kwa oda kubwa.', 'Cash, M-Pesa, Mixx by Yas, Airtel Money, HaloPesa and bank transfer for large orders.') },
  { q: b('Naweza kuweka website hii kama app kwenye simu?', 'Can I install this website as an app?'), a: b('Ndiyo. Bonyeza "Weka App" juu ya ukurasa (au "Add to Home screen" kwenye browser). Itafunguka kama app hata mtandao ukiwa dhaifu.', 'Yes. Tap "Install app" at the top (or "Add to Home screen" in your browser). It opens like an app, even on a weak connection.') },
]
