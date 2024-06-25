import './assets/main.css'
import './assets/backgrounds.css'
import './assets/fonts.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// language stuff
import i18next from 'i18next'
import globalEn from './translations/en/global.json'
import globalKr from './translations/kr/global.json'
import { I18nextProvider } from 'react-i18next'
import { LanguageContextProvider } from './context/Client/Language/Language'

import { AccountContextProvider } from './context/Client/Account/Account'

// FONT AWESOME ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// initialise i18next
i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('appLanguage') || 'en',
  resources: {
    en: {
      translation: globalEn
    },
    kr: {
      translation: globalKr
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <LanguageContextProvider>
        <AccountContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </AccountContextProvider>
      </LanguageContextProvider>
    </I18nextProvider>
  </BrowserRouter>
)
