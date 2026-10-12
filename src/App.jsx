import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider } from './lib/store'
import { RouterProvider, useRoute } from './lib/router'
import Header from './components/layout/Header'
import Footer from './components/Footer'
import Floating from './components/Floating'
import OrderDrawer from './components/OrderDrawer'
import Home from './pages/Home'
import { BookingPage, CvPage, InvitePage, QuotePage } from './pages/Tools'
import { AboutPage, CoursePage, DesignPage, OffersPage, OnlinePage, PortfolioPage, PrintingPage, ServicesPage, ShopPage, TrackPage } from './pages/Pages'

function Page() {
  const { page, param } = useRoute()
  const PAGES = {
    home: <Home />, printing: <PrintingPage />, design: <DesignPage />, 'kazi-zetu': <PortfolioPage />,
    mtandaoni: <OnlinePage />, duka: <ShopPage cat={param} />, kozi: <CoursePage />, ofa: <OffersPage />,
    fuatilia: <TrackPage />, huduma: <ServicesPage />, kuhusu: <AboutPage />,
    miadi: <BookingPage />, cv: <CvPage />, mwaliko: <InvitePage />, nukuu: <QuotePage />,
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main key={page + (param || '')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
        {PAGES[page] || <Home />}
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <Header />
        <Page />
        <Footer />
        <Floating />
        <OrderDrawer />
      </RouterProvider>
    </AppProvider>
  )
}
