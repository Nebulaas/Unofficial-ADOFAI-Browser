import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import './TopNav.css'

import planets from '../../assets/images/ADOFAI_Planets.png'

const TopNav = (): ReactElement => {

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

  return (
    <>

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
              <p id="topBrowseText" className="navTopText">Browse</p>
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
              <p id="topSubmitText" className="navTopText">Submit</p>
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
              <p id="topAboutText" className="navTopText">About</p>
            </NavLink>
          </div>

          <div id="navTopUser" className="navTopItem">
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
