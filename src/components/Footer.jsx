import { ArrowUp } from 'lucide-react'

const svg = (d) => ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d={d} /></svg>
const Instagram = svg('M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.6a5.2 5.2 0 100 10.4 5.2 5.2 0 000-10.4zm0 8.6a3.4 3.4 0 110-6.8 3.4 3.4 0 010 6.8zm5.4-9.9a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z')
const Facebook = svg('M14 13.5h2.5l1-4H14v-2c0-1 0-2 2-2h1.5V2.1C17.2 2.1 16 2 14.6 2 11.7 2 10 3.7 10 6.8v2.7H7v4h3V22h4v-8.5z')
const Music2 = svg('M16.6 5.8A4.3 4.3 0 0115.5 3h-3.1v12.4a2.6 2.6 0 11-1.8-2.5V9.7a5.7 5.7 0 104.9 5.7V9a7.4 7.4 0 004.3 1.4V7.3a4.3 4.3 0 01-3.2-1.5z')
import { BUSINESS } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-20 text-white">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 p-10 text-navy-950 sm:p-14">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border-[20px] border-navy-950/10" />
          <h2 className="max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">Una wazo? <em>Tulifanye liwe halisi.</em></h2>
          <p className="mt-3 max-w-xl text-navy-950/70">Kutoka kadi moja ya biashara hadi branding nzima ya kampuni — Desc Point iko tayari.</p>
          <a href="#mawasiliano" className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-950 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5">Anza sasa</a>
        </div>

        <div className="grid gap-10 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-16 w-16 rounded-full ring-2 ring-gold-400/60" />
              <span><b className="block font-display text-2xl">{BUSINESS.name}</b><span className="font-script text-xl text-gold-300">{BUSINESS.slogan}</span></span>
            </div>
            <p className="mt-5 max-w-sm text-white/55">Printing, design, branding, vifaa vya shule na ofisi, na huduma za mtandaoni — Kibaha, Pwani.</p>
            <div className="mt-6 flex gap-3">
              {[[Instagram, BUSINESS.social.instagram, 'Instagram'], [Facebook, BUSINESS.social.facebook, 'Facebook'], [Music2, BUSINESS.social.tiktok, 'TikTok']].map(([I, h, l]) => (
                <a key={l} href={h} aria-label={l} className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-gold-400 hover:text-navy-950"><I className="h-5 w-5" /></a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-gold-300">Viungo</p>
            <ul className="mt-4 space-y-2 text-white/60">
              {[['Huduma', '#huduma'], ['Bei', '#bei'], ['Bidhaa', '#bidhaa'], ['Vifurushi vya shule', '#shule'], ['Mawasiliano', '#mawasiliano']].map(([l, h]) => <li key={h}><a href={h} className="hover:text-white">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-gold-300">Tupo</p>
            <ul className="mt-4 space-y-2 text-white/60">
              {BUSINESS.branches.map((b) => <li key={b.name}>{b.area}</li>)}
              <li>{BUSINESS.hours.label}</li>
              <li>{BUSINESS.hours.time}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. Haki zote zimehifadhiwa.</p>
          <p>Website na <span className="text-gold-300">EllieTech Solutions</span></p>
          <a href="#" className="flex items-center gap-1 hover:text-white">Juu <ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none text-center font-display text-[22vw] font-black leading-[.8] text-white/[.03]">DPS</p>
    </footer>
  )
}
