// react imports
import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { useTranslation } from 'react-i18next' // language import

import './TopNav.css'

import planets from '../../assets/images/ADOFAI_Planets.png'

import AccountLogin from '../Account/Login/AccountLogin' // login dialogue component

const TopNav = (): ReactElement => {
  const { t } = useTranslation()

  function activateNavSide(): void {
    /* When the triple bar icon is clicked, this will open/close the left-side navbar and animate the icon accordingly. */

    // Define relevant html elements
    const sideNav = document.getElementById('navSide')! // left side navbar
    const sideNavIcon = document.getElementById('topBarsIcon')! // triple bar symbol

    // if side nav currently open
    if (sideNav.classList.contains('navSideShow')) {
      // close side nav
      sideNav.classList.replace('navSideShow', 'navSideHide')
      // rotate icon left
      sideNavIcon.classList.replace('spinRight', 'spinLeft')
    }

    // if side nav currently closed
    else if (sideNav.classList.contains('navSideHide')) {
      // open side nav
      sideNav.classList.replace('navSideHide', 'navSideShow')
      // rotate icon right
      sideNavIcon.classList.replace('spinLeft', 'spinRight')
    }
  }

  const loginDialogueRef = React.useRef(null)

  function openLoginDialogue(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    loginDialogueRef.current.openDialogue()
  }

  return (
    <>
      {/* updateWelcomeText={updateWelcomeText} */}
      <AccountLogin ref={loginDialogueRef}></AccountLogin>

      {/* Top Section of Window */}
      <div id="navTop">

        {/* Left Side of Top Nav */}
        <div id="navTopLeft">

          {/* Burger Icon for side nav function */}
          <div id="navTopMenu" className="navTopItem" onClick={activateNavSide}>
            <FontAwesomeIcon
              icon={'fa-solid fa-bars' as IconProp}
              id="topBarsIcon"
              className="navTopIconLarge faIcon spinRight"
              size="xl"
            />
          </div>

          {/* App Logo (Temporary) */}
          <div id="navTopHome" className="navTopItem">
            <NavLink id="topHomeLink" className="navTopLink" to="/">
              <h1 id="topHomeLogo">
                AD
                <img id="topLogoPlanets" src={planets} alt="O" />
                FAI Browser
              </h1>
            </NavLink>
          </div>

        </div>


        {/* Right Side of Top Nav */}
        <div id="navTopRight">

          {/* Browse page */}
          <div id="navTopBrowse" className="navTopItem">
            <NavLink
              id="topBrowseLink"
              className={({ isActive }) =>
                isActive ? 'navTopLink topActivePage' : 'navTopLink topInactivePage'
              }
              to="/levels"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-magnifying-glass' as IconProp}
                id="topBrowseIcon"
                className="navTopIconSmall faIcon"
                size="sm"
              />
              <p id="topBrowseText" className="navTopText">
                {t('topNav.browse')}
              </p>
            </NavLink>
          </div>

          {/* Submissions page */}
          <div id="navTopSubmit" className="navTopItem">
            <NavLink
              id="topSubmitLink"
              className={({ isActive }) =>
                isActive ? 'navTopLink topActivePage' : 'navTopLink topInactivePage'
              }
              to="/submissions"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-paper-plane' as IconProp}
                id="topSubmitIcon"
                className="navTopIconSmall faIcon"
                size="sm"
              />
              <p id="topSubmitText" className="navTopText">
                {t('topNav.submit')}
              </p>
            </NavLink>
          </div>

          {/* About page */}
          <div id="navTopAbout" className="navTopItem">
            <NavLink
              id="topAboutLink"
              className={({ isActive }) =>
                isActive ? 'navTopLink topActivePage' : 'navTopLink topInactivePage'
              }
              to="/about"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-circle-info' as IconProp}
                id="topAboutIcon"
                className="navTopIconSmall faIcon"
                size="sm"
              />
              <p id="topAboutText" className="navTopText">
                {t('topNav.about')}
              </p>
            </NavLink>
          </div>

          <div id="navTopUser" className="navTopItem" onClick={openLoginDialogue}>
            <FontAwesomeIcon
              icon={'fa-solid fa-circle-user' as IconProp}
              id="topAccountIcon"
              className="navTopIconLarge faIcon"
              size="xl"
            />
          </div>

        </div>

      </div>

    </>
  )
}

export default TopNav
