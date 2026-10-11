import { motion, useScroll, useSpring } from 'framer-motion'
import { AppProvider } from './lib/store'
import Navbar from './components/Navbar'
import OfferBar from './components/OfferBar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Showcase from './components/Showcase'
import PrintUpload from './components/PrintUpload'
import Services from './components/Services'
import Offers from './components/Offers'
import Prices from './components/Prices'
import DesignStudio from './components/DesignStudio'
import Portfolio from './components/Portfolio'
import Products from './components/Products'
import School from './components/School'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import OrderTracker from './components/OrderTracker'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Floating from './components/Floating'
import OrderDrawer from './components/OrderDrawer'

function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500" />
}

export default function App() {
  return (
    <AppProvider>
      <Progress />
      <Navbar />
      <main>
        <Hero />
        <OfferBar />
        <Marquee />
        <Showcase />
        <PrintUpload />
        <Services />
        <Offers />
        <Prices />
        <DesignStudio />
        <Portfolio />
        <Products />
        <School />
        <WhyUs />
        <Process />
        <Testimonials />
        <OrderTracker />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Floating />
      <OrderDrawer />
    </AppProvider>
  )
}
