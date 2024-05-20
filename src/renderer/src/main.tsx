import './assets/main.css'
import './assets/backgrounds.css'
import './assets/fonts.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { AccountContextProvider } from './context/Client/Account/Account'

// FONT AWESOME ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <AccountContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AccountContextProvider>
  </BrowserRouter>
)
