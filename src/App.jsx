import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Showcase from './components/Showcase'
import Prices from './components/Prices'
import Products from './components/Products'
import School from './components/School'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Floating from './components/Floating'
import OrderDrawer from './components/OrderDrawer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [cart, setCart] = useState({})
  const [open, setOpen] = useState(false)

  const add = (p) => setCart((c) => ({ ...c, [p.id]: { ...p, qty: (c[p.id]?.qty || 0) + 1 } }))
  const setQty = (id, qty) =>
    setCart((c) => {
      const n = { ...c }
      if (qty <= 0) delete n[id]
      else n[id] = { ...n[id], qty }
      return n
    })
  const count = Object.values(cart).reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500" />
      <Navbar count={count} onCart={() => setOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        <Showcase cart={cart} onAdd={add} setQty={setQty} />
        <Services />
        <Prices />
        <Products onAdd={add} cart={cart} />
        <School />
        <WhyUs />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Floating count={count} onCart={() => setOpen(true)} />
      <OrderDrawer open={open} onClose={() => setOpen(false)} cart={cart} setQty={setQty} clear={() => setCart({})} />
    </>
  )
}
