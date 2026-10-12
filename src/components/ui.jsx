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

export function SectionTitle({ eyebrow, title, accent, sub, light = false, center = true }) {
  const words = title.split(' ').length
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <motion.p
        className={`eyebrow ${light ? '!text-gold-300' : ''}`}
        initial={{ opacity: 0, x: center ? 0 : -20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow}
      </motion.p>
      <h2 className={`mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl ${light ? 'text-white' : 'text-ink'}`} style={{ textWrap: 'balance' }}>
        <WordsUp text={title} />
        {accent && <WordsUp text={accent} delay={words * 0.07} wordClass="" />}
      </h2>
      {sub && (
        <motion.p className={`mt-4 text-lg ${light ? 'text-white/70' : 'text-ink/65'}`}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.35 }}>
          {sub}
        </motion.p>
      )}
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
