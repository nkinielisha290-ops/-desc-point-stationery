// =============================================================
//  DESC POINT STATIONERY — taarifa zote za biashara ziko hapa.
//  Badilisha namba, bei na bidhaa hapa tu; website itajibadilisha.
// =============================================================

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
    { name: 'Tawi la Madafu', area: 'Madafu, Kibaha – Pwani', map: 'Madafu, Kibaha, Tanzania' },
    { name: 'Tawi la Zegereni', area: 'Zegereni, Kibaha – Pwani', map: 'Zegereni, Kibaha, Tanzania' },
  ],
  hours: { label: 'Jumatatu – Jumamosi', time: 'Saa 2:00 asubuhi – Saa 2:00 usiku', open: 8, close: 20, closedDay: 0 },
  social: { instagram: '#', facebook: '#', tiktok: '#' },
}

export const waLink = (text) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`

const u = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const IMAGES = {
  hero: '/hero.jpg',
  heroAlt: u('photo-1513542789411-b6a5d4f31634', 1200),
  about: u('photo-1654931800100-2ecf6eee7c64', 1200),
  school: u('photo-1725801731069-baa524d6bd4c', 1200),
  paper: u('photo-1470790376778-a9fbc86d70e2', 1600),
}

// ---------------- HUDUMA (Services) ----------------
export const SERVICE_GROUPS = [
  {
    id: 'print',
    title: 'Printing & Nakala',
    icon: 'Printer',
    blurb: 'Kuanzia ukurasa mmoja hadi maelfu — haraka, safi, na rangi zinazong’aa.',
    items: ['Printing nyeusi & nyeupe', 'Printing ya rangi (A4, A3)', 'Photocopy (moja hadi bulk)', 'Scanning kwenda PDF / email', 'Printing ya picha (photo paper)', 'Passport size & ID photos'],
  },
  {
    id: 'finish',
    title: 'Finishing',
    icon: 'Layers',
    blurb: 'Mpe kazi yako muonekano wa kitaalamu unaodumu.',
    items: ['Lamination (ID, A4, A3)', 'Spiral binding', 'Thermal / hard-cover binding', 'Cutting & trimming', 'Stapling & booklet making', 'Kuweka plastiki kwenye vyeti'],
  },
  {
    id: 'design',
    title: 'Graphic Design',
    icon: 'PenTool',
    blurb: 'Quality arts and designing — hii ndiyo roho yetu.',
    items: ['Logo & brand identity', 'Business cards', 'Flyers, posters & brochures', 'Kadi za harusi, send-off & mialiko', 'Banners & roll-up stands', 'Social media posters'],
  },
  {
    id: 'branding',
    title: 'Branding & Promo',
    icon: 'Shirt',
    blurb: 'Weka jina la biashara yako kila mahali.',
    items: ['T-shirt printing', 'Mug & cup printing', 'Stickers & labels', 'Mihuri (rubber stamps)', 'Receipt & invoice books', 'Certificates & ID cards'],
  },
  {
    id: 'online',
    title: 'Huduma za Mtandaoni',
    icon: 'Globe',
    blurb: 'Usihangaike na foleni — tunakusaidia kujaza na kutuma.',
    items: ['Usajili & namba ya NIDA', 'TIN ya TRA', 'Mkopo wa HESLB', 'Maombi ya vyuo (TCU / NACTVET)', 'Ajira Portal & CV', 'Matokeo ya NECTA & leseni (BRELA)'],
  },
  {
    id: 'office',
    title: 'Huduma za Ofisi',
    icon: 'Briefcase',
    blurb: 'Ofisi yako ndogo iko hapa kila siku.',
    items: ['Typing & secretarial', 'Kuandika barua & CV', 'Email & internet', 'Kutuma documents (email/WhatsApp)', 'Kuandaa mitihani ya shule', 'Bulk printing kwa shule & makampuni'],
  },
]

// ---------------- BEI (Price list) ----------------
// Bei za mfano — thibitisha na mteja kabla ya ku-deploy.
export const PRICES = [
  { item: 'Photocopy A4 (nyeusi)', price: 100, unit: 'ukurasa' },
  { item: 'Printing A4 (nyeusi)', price: 200, unit: 'ukurasa' },
  { item: 'Printing A4 (rangi)', price: 500, unit: 'ukurasa' },
  { item: 'Scanning', price: 500, unit: 'ukurasa' },
  { item: 'Lamination A4', price: 1500, unit: 'kipande' },
  { item: 'Spiral binding', price: 2000, unit: 'kitabu' },
  { item: 'Passport size (picha 4)', price: 3000, unit: 'seti' },
  { item: 'Business cards (100)', price: 25000, unit: 'boksi' },
]

// ---------------- BIDHAA (Products) ----------------
export const CATEGORIES = ['Zote', 'Shule', 'Ofisi', 'Sanaa', 'Karatasi']

export const PRODUCTS = [
  { id: 'p1', name: 'Seti ya kalamu za rangi', cat: 'Shule', price: 3500, unit: 'seti', img: u('photo-1567855354833-ac2c4f967b0c', 1000), tag: 'Maarufu',
    desc: 'Kalamu 4 za rangi tofauti zinazoandika laini bila kukatika. Nzuri kwa notes, kusahihisha na ku-highlight.' },
  { id: 'p2', name: 'Penseli za rangi (pakiti 24)', cat: 'Sanaa', price: 8000, unit: 'pakiti', img: u('photo-1513542789411-b6a5d4f31634', 1000),
    desc: 'Rangi 24 zinazong’aa kwa michoro, ramani na kazi za sanaa za shule. Ncha imara isiyovunjika haraka.' },
  { id: 'p3', name: 'Rimu ya karatasi A4 (500)', cat: 'Karatasi', price: 13000, unit: 'rimu', img: u('photo-1631173716529-fd1696a807b0', 1000), tag: 'Bulk',
    desc: 'Karatasi nyeupe 80gsm, kurasa 500. Inafaa printer, photocopy na ofisi. Punguzo kwa rimu 5 au zaidi.' },
  { id: 'p4', name: 'Mkasi wa ofisi', cat: 'Ofisi', price: 2500, unit: 'kipande', img: u('photo-1615988938302-bd2a5a7023bc', 1000),
    desc: 'Mkasi wenye makali ya chuma cha pua na mshiko laini. Unakata karatasi, kadi na plastiki kwa urahisi.' },
  { id: 'p5', name: 'Madaftari (dazeni 1)', cat: 'Shule', price: 12000, unit: 'dazeni', img: u('photo-1601001435957-74f0958a93fb', 1000), tag: 'Back to school',
    desc: 'Madaftari 12 ya kurasa 96 yenye mistari. Karatasi nzito isiyopenya wino. Bei maalum kwa shule.' },
  { id: 'p6', name: 'Markers za ubaoni', cat: 'Ofisi', price: 1500, unit: 'kipande', img: u('photo-1551925608-12e169132446', 1000),
    desc: 'Whiteboard markers zinazofutika bila kuacha doa. Zinapatikana bluu, nyeusi, nyekundu na kijani.' },
  { id: 'p7', name: 'Penseli HB (dazeni)', cat: 'Shule', price: 3000, unit: 'dazeni', img: u('photo-1497864149936-d3163f0c0f4b', 1000),
    desc: 'Penseli 12 za HB kwa kuandika na kuchora. Zinachongeka vizuri na hazikatiki ovyo.' },
  { id: 'p8', name: 'Kadi za salamu & bahasha', cat: 'Karatasi', price: 2000, unit: 'kadi', img: u('photo-1513077202514-c511b41bd4c7', 1000),
    desc: 'Kadi za birthday, shukrani na pongezi pamoja na bahasha. Tunaweza kuandika jina na ujumbe wako.' },
  { id: 'p9', name: 'Organizer ya mezani + vifaa', cat: 'Ofisi', price: 18000, unit: 'seti', img: u('photo-1456735190827-d1262f71b8a3', 1000), tag: 'Mpya',
    desc: 'Organizer ya mezani yenye kalamu, sticky notes na karatasi za rangi. Mezani pako panakuwa nadhifu.' },
  { id: 'p10', name: 'Crayons za watoto', cat: 'Sanaa', price: 4000, unit: 'pakiti', img: u('photo-1629652487043-fb2825838f8c', 1000),
    desc: 'Crayons salama kwa watoto wa chekechea na darasa la awali. Rangi angavu zinazodumu.' },
  { id: 'p11', name: 'Notebook ya kifahari', cat: 'Ofisi', price: 7000, unit: 'kipande', img: u('photo-1621413268056-ce8911fe1563', 1000),
    desc: 'Notebook ya jalada gumu kwa vikao, mipango na shajara. Zawadi nzuri kwa mfanyakazi au mwalimu.' },
  { id: 'p12', name: 'Seti ya ofisi (calculator, stapler...)', cat: 'Ofisi', price: 25000, unit: 'seti', img: u('photo-1654931800100-2ecf6eee7c64', 1000),
    desc: 'Calculator, stapler, mkasi na notepad kwa pamoja. Kila kitu ofisi mpya inahitaji siku ya kwanza.' },
]

// ---------------- HUDUMA ZENYE BEI (kwa carousel na cart) ----------------
export const SERVICE_ITEMS = [
  { id: 's1', name: 'Printing ya rangi A4', cat: 'Printing', price: 500, unit: 'ukurasa', img: u('photo-1503694978374-8a2fa686963a', 1000), tag: 'Haraka',
    desc: 'Printing ya rangi yenye ubora wa juu kwa ripoti, picha, vyeti na matangazo. Tuma faili WhatsApp, chukua ikiwa tayari.' },
  { id: 's2', name: 'Photocopy nyeusi A4', cat: 'Printing', price: 100, unit: 'ukurasa', img: u('photo-1553013983-15241ab69e57', 1000),
    desc: 'Nakala safi na zinazosomeka, kuanzia ukurasa mmoja hadi maelfu. Bei maalum kwa mitihani ya shule.' },
  { id: 's3', name: 'Banner printing', cat: 'Branding', price: 15000, unit: 'mita²', img: u('photo-1693031630369-bd429a57f115', 1000), tag: 'Maarufu',
    desc: 'Banner za flex zenye rangi zisizofifia kwa jua. Kwa maduka, sherehe, kampeni na matukio. Design ni bure kwa oda ya mita 2+.' },
  { id: 's4', name: 'Business cards (100)', cat: 'Design', price: 25000, unit: 'boksi', img: u('photo-1718670013921-2f144aba173a', 1000),
    desc: 'Kadi 100 za biashara pande mbili, karatasi nzito ya 300gsm. Design ya kitaalamu imejumuishwa.' },
  { id: 's5', name: 'Kadi za harusi & send-off', cat: 'Design', price: 2500, unit: 'kadi', img: u('photo-1633037773384-27d7ac0491e7', 1000), tag: 'Kisanii',
    desc: 'Kadi za mialiko zilizobuniwa kwa ladha yenu, pamoja na bahasha. Oda ya kuanzia kadi 50.' },
  { id: 's6', name: 'Logo & brand identity', cat: 'Design', price: 50000, unit: 'kazi', img: u('photo-1581079289196-67865ea83118', 1000),
    desc: 'Logo ya kipekee, rangi na fonts za brand yako, pamoja na marekebisho mpaka uridhike. Tayari ndani ya siku 2–4.' },
  { id: 's7', name: 'T-shirt printing', cat: 'Branding', price: 15000, unit: 'kipande', img: u('photo-1562157873-818bc0726f68', 1000),
    desc: 'T-shirt pamoja na printing ya logo au ujumbe wako. Kwa vikundi, kampeni, harusi na timu za kazi.' },
  { id: 's8', name: 'Mihuri (rubber stamp)', cat: 'Branding', price: 25000, unit: 'muhuri', img: u('photo-1436918898788-ebce04d38e46', 1000),
    desc: 'Muhuri wa ofisi, shule au kampuni wenye wino wa ndani (self-inking). Unakuwa tayari ndani ya saa 24.' },
  { id: 's9', name: 'Binding & lamination', cat: 'Finishing', price: 2000, unit: 'kitabu', img: u('photo-1693031630146-568e2f72db0e', 1000),
    desc: 'Spiral binding kwa ripoti, tasnifu na proposals, pamoja na lamination ya vyeti na vitambulisho.' },
  { id: 's10', name: 'Huduma za mtandaoni', cat: 'Mtandaoni', price: 5000, unit: 'huduma', img: u('photo-1516131206008-dd041a9764fd', 1000),
    desc: 'Tunakusaidia NIDA, TIN ya TRA, HESLB, TCU, Ajira Portal na BRELA. Unaondoka na nakala ya maombi yako.' },
  { id: 's11', name: 'Passport size photos', cat: 'Printing', price: 3000, unit: 'picha 4', img: u('photo-1510511336377-1a9caa095849', 1000),
    desc: 'Picha za passport papo hapo kwa NIDA, pasipoti, shule na maombi ya kazi. Background nyeupe au bluu.' },
  { id: 's12', name: 'Flyers & posters (100)', cat: 'Design', price: 35000, unit: '100 pcs', img: u('photo-1642480532034-362360552ccb', 1000),
    desc: 'Flyers za A5 za rangi kamili pamoja na design. Njia rahisi ya kutangaza biashara au tukio lako.' },
]

// ---------------- VIFURUSHI VYA SHULE ----------------
export const SCHOOL_PACKS = [
  {
    name: 'Kifurushi cha Awali',
    level: 'Chekechea & Darasa 1–2',
    price: 25000,
    items: ['Madaftari 6', 'Penseli 6 + kifutio + kichongeo', 'Crayons pakiti 1', 'Rula & mkasi wa watoto', 'Mfuko wa plastiki wa vitabu'],
  },
  {
    name: 'Kifurushi cha Msingi',
    level: 'Darasa 3–7',
    price: 40000,
    featured: true,
    items: ['Madaftari 12 (counter books)', 'Kalamu 6 + penseli 6', 'Mathematical set', 'Kamusi ndogo', 'Covers & labels za majina', 'Mfuko wa shule'],
  },
  {
    name: 'Kifurushi cha Sekondari',
    level: 'Kidato 1–6',
    price: 60000,
    items: ['Counter books 10 (kubwa)', 'Kalamu 10 + highlighters', 'Scientific calculator', 'Mathematical set', 'Graph book & ruled pads', 'File & folder'],
  },
]

// Ushuhuda wa mfano — badilisha na wa wateja halisi kabla ya kwenda live
export const TESTIMONIALS = [
  { name: 'Mwalimu Rehema', role: 'Shule ya Msingi, Kibaha', service: 'Printing ya mitihani', text: 'Mitihani yetu ya mwisho wa muhula wanaichapa wao kila mara. Kazi safi, kwa wakati, na bei inaeleweka.' },
  { name: 'Juma Salim', role: 'Mfanyabiashara, Madafu', service: 'Logo & banner', text: 'Walinitengenezea logo, business cards na banner ya duka. Wateja wanauliza nani alinitengenezea!' },
  { name: 'Neema & Daudi', role: 'Maharusi, Kibaha', service: 'Kadi za harusi', text: 'Kadi zetu za harusi zilikuwa nzuri mno. Walisikiliza kila tulichotaka na wakaongeza ubunifu wao.' },
  { name: 'Baraka M.', role: 'Mwanafunzi wa chuo', service: 'HESLB & printing', text: 'Walinisaidia maombi ya HESLB na kuprint documents zote siku moja. Huduma ya haraka sana.' },
  { name: 'Mama Asha', role: 'Mzazi, Zegereni', service: 'Kifurushi cha shule', text: 'Nilichukua kifurushi cha msingi kwa watoto wawili. Kila kitu kilikuwa tayari, hata majina yameandikwa kwenye madaftari.' },
  { name: 'Peter Kimaro', role: 'Meneja, kampuni ya usafirishaji', service: 'Receipt books & mihuri', text: 'Receipt books na muhuri wa kampuni vilikuwa tayari ndani ya saa 24. Tumewapa kazi zetu zote za printing.' },
  { name: 'Zainabu H.', role: 'Mjasiriamali wa vipodozi', service: 'Labels & stickers', text: 'Labels za bidhaa zangu zimefanya biashara yangu ionekane ya kimataifa. Mauzo yamepanda kweli.' },
  { name: 'Mchungaji Elia', role: 'Kanisa, Kibaha', service: 'T-shirts & banners', text: 'T-shirt 120 za kongamano zilikuwa safi na zilifika kabla ya siku. Tutaendelea kufanya kazi nao.' },
  { name: 'Fatma Said', role: 'Mwanafunzi, kidato cha sita', service: 'NECTA & TCU', text: 'Walinielekeza hatua kwa hatua kwenye maombi ya chuo. Sikuhitaji kwenda mjini kabisa.' },
]

export const FAQS = [
  { q: 'Naweza kutuma faili kwa WhatsApp na kuchukua baadaye?', a: 'Ndiyo. Tuma faili lako (PDF, Word, picha) kwa WhatsApp au email, tueleze idadi na aina ya printing, tutakupigia kazi ikiwa tayari.' },
  { q: 'Mnafanya delivery?', a: 'Ndiyo, ndani ya Kibaha na maeneo ya karibu kwa oda za bulk na vifurushi vya shule. Wasiliana nasi kupata gharama ya usafiri.' },
  { q: 'Design ya logo au kadi inachukua muda gani?', a: 'Kazi ndogo kama business cards au flyers ni siku 1. Logo na brand identity ni siku 2–4 pamoja na marekebisho.' },
  { q: 'Mnapokea malipo gani?', a: 'Taslimu, M-Pesa, Mixx by Yas, Airtel Money, HaloPesa na benki kwa oda kubwa.' },
  { q: 'Kuna punguzo kwa shule na makampuni?', a: 'Ndiyo. Oda za bulk (printing ya mitihani, receipt books, vifaa vya ofisi) zinapata bei maalum. Omba quotation.' },
]
