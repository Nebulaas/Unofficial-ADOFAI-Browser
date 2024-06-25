import { forwardRef, useContext, useImperativeHandle, useState } from 'react'

import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

import '../Language/LanguageDialogue.css'

import { LanguageContext } from '../../context/Client/Language/Language'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/display-name
const LanguageDialogue = forwardRef((props, ref) => {

  const { t } = useTranslation()

  const [openDialogue, setOpenDialogue] = useState(false)

  function changeDialogueState(): void {
    setOpenDialogue(!openDialogue)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { setLanguage } = useContext(LanguageContext)

  function handleChangeLanguage(newLanguage): void {
    i18next.changeLanguage(newLanguage).then(() => {
      setLanguage(newLanguage)
    })
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

      {/* language change dialogue box */}
      <div
        className={`languageDialogue ${openDialogue ? 'dialogueScaleUp' : 'dialogueScaleDown'}`}
        style={{ display: openDialogue ? 'block' : 'none' }}
      >
        <div className={'dialogue'}>

          <p id="languageDialogueText" className="dialogueText">
            {t('languageDialogue.prompt')}
          </p>

          <div className={'options'}>

            <div id="englishOption" className="dialogueOption" onClick={() => handleChangeLanguage('en')}>
              <p id="englishOptionText" className="optionText">
                English (en)
              </p>
            </div>

            <div id="koreanOption" className="dialogueOption" onClick={() => handleChangeLanguage('kr')}>
              <p id="koreanOptionText" className="optionText">
                한국어 (ko)
              </p>
            </div>

            <div id="cancelOption" className="dialogueOption" onClick={changeDialogueState}>
              <p id="cancelOptionText" className="optionText">
                {t('languageDialogue.cancel')}
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  )
})

export default LanguageDialogue
