// universally applied application css styles
import './assets/main.css'
import './assets/backgrounds.css'
import './assets/fonts.css'

import React from 'react'

// imports for basic multi-page application/website functionality
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// i18next translation functionality libraries
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

// translation json files to interface with i18next
import globalEn from './translations/en/global.json'
import globalKr from './translations/kr/global.json'

// context providers for root render
import { LanguageContextProvider } from './context/Client/Language/Language'
import { AccountContextProvider } from './context/Client/Account/Account'
import { LevelContextProvider } from './context/Web/Levels/LevelContext'
import { DifficultyContextProvider } from './context/Web/Difficulty/DifficultyContext'

// imports for Fontawesome SVG library
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas)
library.add(far)
library.add(fab)


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
      <DifficultyContextProvider>
        <LevelContextProvider>
          <LanguageContextProvider>
            <AccountContextProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </AccountContextProvider>
          </LanguageContextProvider>
        </LevelContextProvider>
      </DifficultyContextProvider>
    </I18nextProvider>
  </BrowserRouter>
)
