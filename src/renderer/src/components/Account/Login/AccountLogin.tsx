import { ReactElement, useContext, useState } from 'react'
import { AccountContext } from '../../../context/Client/Account/Account'

import './AccountLogin.css'

const LoginDialogue = (): ReactElement => {

  const [openDialog, setOpenDialog] = useState(false)

  function changeDialogState(): void {
    setOpenDialog(!openDialog)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loginState, setLoginState } = useContext(AccountContext)

  function DoLogin(toState): void {
    setLoginState(toState)
    changeDialogState()
  }

  return (
    <>

      <div
        className="dialogueOverlay"
        style={{ display: openDialog ? 'block' : 'none' }}
        onClick={changeDialogState}
      ></div>

      <div className={`loginDialog ${openDialog ? 'dialogScaleUp' : ''}`} style={{ display: openDialog ? 'block' : 'none' }}>
        <div className={'dialog'}>
          <div className="loginOption" onClick={() => DoLogin('login')}>
            Log In
          </div>
          <div className="logoutOption" onClick={() => DoLogin('logout')}>
            Log Out
          </div>
        </div>
      </div>

    </>
  )
}

export default LoginDialogue
