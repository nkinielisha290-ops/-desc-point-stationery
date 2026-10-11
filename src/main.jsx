import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// PWA: sajili service worker kwenye website halisi tu (si kwenye dev wala preview)
if ('serviceWorker' in navigator && import.meta.env.PROD && location.protocol === 'https:' && !window.__DPS_PREVIEW__) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
