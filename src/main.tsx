import React, { startTransition } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './i18n'
import './index.css'
import { applyTheme, useUIStore } from './store/useUIStore'

applyTheme(useUIStore.getState().theme)

const rootEl = document.getElementById('root')!
const root = ReactDOM.createRoot(rootEl)
startTransition(() => {
  root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  )
})

// Drop the static first-paint hero once the real tree is mounted and painted.
const dropBootHero = () => {
  if (rootEl.childElementCount > 0) {
    requestAnimationFrame(() => document.getElementById('boot-hero')?.remove())
  } else {
    requestAnimationFrame(dropBootHero)
  }
}
requestAnimationFrame(dropBootHero)
