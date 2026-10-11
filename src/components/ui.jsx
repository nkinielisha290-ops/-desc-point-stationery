import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ImageOff } from 'lucide-react'

export const tsh = (n) => 'TSh ' + n.toLocaleString('en-US')
const EASE = [0.22, 1, 0.36, 1]

// Sehemu inaingia kwa kupanda + blur kuondoka
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

// Watoto wanaingia mmoja baada ya mwingine
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
export const rise = {
  hidden: { opacity: 0, y: 36, scale: 0.96, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
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
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClass}`}
            initial={{ y: '110%', rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionTitle({ eyebrow, title, accent, sub, light = false, center = true }) {
  const words = title.split(' ').length
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <motion.p
        className={`eyebrow inline-flex items-center gap-2 ${light ? 'text-gold-300' : ''}`}
        initial={{ opacity: 0, x: center ? 0 : -20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span className="inline-block h-px w-8 bg-current" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ originX: 0 }} />
        {eyebrow}
      </motion.p>
      <h2 className={`mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl ${light ? 'text-white' : 'text-ink'}`} style={{ textWrap: 'balance' }}>
        <WordsUp text={title} />
        {accent && <WordsUp text={accent} delay={words * 0.07} wordClass="gold-text font-display italic" />}
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

// Kadi inayoinama kufuata kipanya (3D tilt) + mwanga wa dhahabu
export function TiltCard({ children, className = '', variants }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 18 })
  const glow = useTransform([mx, my], ([x, y]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,210,63,.22), transparent 45%)`)
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { mx.set(0.5); my.set(0.5) }
  return (
    <motion.div variants={variants} onPointerMove={move} onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className={`group/tilt relative ${className}`}>
      {children}
      <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100" />
    </motion.div>
  )
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
  return <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className={className} />
}
