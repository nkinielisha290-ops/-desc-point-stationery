import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'

export const tsh = (n) => 'TSh ' + n.toLocaleString('en-US')
const EASE = [0.22, 1, 0.36, 1]

// Sehemu inaingia kwa kupanda + blur kuondoka
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: Math.min(y, 24) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.2), ease: EASE }}
    >
      {children}
    </M>
  )
}

// Watoto wanaingia mmoja baada ya mwingine
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
export const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}
export function Stagger({ children, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </M>
  )
}

// Maneno ya kichwa yanapanda moja moja
export function WordsUp({ text, className = '', delay = 0, wordClass = '' }) {
  return (
    <motion.span className={`inline ${className} ${wordClass}`} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: Math.min(delay, 0.15), ease: EASE }}>
      {text}{' '}
    </motion.span>
  )
}

export function SectionTitle({ eyebrow, title, accent, sub, light = false, center = false }) {
  return (
    <div className={`mb-8 max-w-2xl sm:mb-10 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`text-sm font-semibold ${light ? 'text-gold-300' : 'text-royal-500 dark:text-gold-300'}`}>{eyebrow}</p>}
      <h2 className={`h-sec mt-2 ${light ? '!text-white' : ''}`}>{title}{accent ? ' ' + accent : ''}</h2>
      {sub && <p className={`mt-3 text-[17px] leading-relaxed ${light ? 'text-white/70' : 'text-ink/60'}`}>{sub}</p>}
    </div>
  )
}

// Kadi ya kawaida (zamani ilikuwa ya 3D; imeondolewa ili kuscroll kuwe kwa haraka)
export function TiltCard({ children, className = '', variants }) {
  return <motion.div variants={variants} className={`relative ${className}`}>{children}</motion.div>
}

// Picha yenye fallback nzuri kama mtandao ukizuia
export function SafeImg({ src, alt, className = '' }) {
  const [err, setErr] = useState(false)
  if (err)
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-navy-800 to-royal-600 text-gold-300 ${className}`}>
        <ImageOff className="h-8 w-8 opacity-60" />
      </div>
    )
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setErr(true)} className={className} />
}
