import { forwardRef, useContext, useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AccountContext } from '../../../context/Client/Account/Account'

import './AccountLogin.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/display-name
const LoginDialogue = forwardRef((props, ref) => {
  const { t } = useTranslation()

  const [openDialogue, setOpenDialogue] = useState(false)

  function changeDialogueState(): void {
    setOpenDialogue(!openDialogue)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { setLoginState } = useContext(AccountContext)

  function DoLogin(toState): void {
    setLoginState(toState)
    changeDialogueState()
  }

  useImperativeHandle(ref, () => ({
    openDialogue: (): void => {
      changeDialogueState()
    }
  }))

  return (
    <>

      {/* background overlay element for dialogue box */}
      <div
        className="dialogueOverlay"
        style={{ display: openDialogue ? 'block' : 'none' }}
        onClick={changeDialogueState}
      ></div>

      {/* login/logout dialogue box */}
      <div
        className={`loginDialogue ${openDialogue ? 'dialogueScaleUp' : 'dialogueScaleDown'}`}
        style={{ display: openDialogue ? 'block' : 'none' }}
      >
        <div className={'dialogue'}>

          <p id="loginDialogueText" className="dialogueText">
            {t('loginDialogue.prompt')}
          </p>

          <div className={'options'}>

            <div id="loginOption" className="dialogueOption" onClick={() => DoLogin('login')}>
              <p id="loginOptionText" className="optionText">
                {t('loginDialogue.login')}
              </p>
            </div>

            <div id="logoutOption" className="dialogueOption" onClick={() => DoLogin('logout')}>
              <p id="logoutOptionText" className="optionText">
                {t('loginDialogue.logout')}
              </p>
            </div>

            <div id="cancelOption" className="dialogueOption" onClick={changeDialogueState}>
              <p id="cancelOptionText" className="optionText">
                {t('loginDialogue.cancel')}
              </p>
            </div>

          </div>

        </div>
      </div>

    </>
  )
})

export default LoginDialogue
