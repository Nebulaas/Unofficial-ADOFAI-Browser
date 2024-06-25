/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LanguageContext = createContext()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const LanguageContextProvider = (props) => {
  const storedLanguage = localStorage.getItem('appLanguage') || 'en'
  const [language, setLanguage] = useState(storedLanguage)

  useEffect(() => {
    localStorage.setItem('appLanguage', language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageContextProvider }
