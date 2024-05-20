// import { createContext, useEffect, useState } from 'react'
//
// const UserContext = createContext()
//
// const UserContextProvider = (props) => {
//   const storedLanguage = localStorage.getItem('appLanguage') || 'us'
//   const [language, setLanguage] = useState(storedLanguage)
//
//   useEffect(() => {
//     localStorage.setItem('appLanguage', language)
//   }, [language])
//
//   return (
//     // eslint-disable-next-line react/prop-types
//     <UserContext.Provider value={{ language, setLanguage }}>{props.children}</UserContext.Provider>
//   )
// }

// export default { UserContext, UserContextProvider }
