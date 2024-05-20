/* temporary stuff for functionality purposes */

/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AccountContext = createContext()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AccountContextProvider = (props) => {
  const storedState = localStorage.getItem('accountLoginState') || 'logout'
  const [loginState, setLoginState] = useState(storedState)

  useEffect(() => {
    localStorage.setItem('accountLoginState', loginState)
  }, [loginState])

  return (
    <AccountContext.Provider value={{ loginState, setLoginState }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountContextProvider }
