import { ReactElement } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import './SideNav.css'

const SideNav = (): ReactElement => {


  return (
    <>

      {/* Left Side of Window */}
      <div id="navSide" className="navSideShow">

        {/* Top section of side nav */}
        <div id="navSideTop" className="navSideSection">

          {/* account icon */}
          <div id="navSideAccount" className="navSideItem">
            <NavLink
              id="sideAccountLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/account"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-circle-user' as IconProp}
                id="sideAccountIcon"
                className="navSideIcon faIcon"
                size="xl"
              />
              <p id="sideAccountText" className="navSideText">Account</p>
            </NavLink>
          </div>

          {/* browse icon */}
          <div id="navSideBrowse" className="navSideItem">
            <NavLink
              id="sideBrowseLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/levels"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-magnifying-glass' as IconProp}
                id="sideBrowseIcon"
                className="navSideIcon faIcon"
                size="xl"
              />
              <p id="sideBrowseText" className="navSideText">Browse</p>
            </NavLink>
          </div>

          {/* submissions icon */}
          <div id="navSideSubmit" className="navSideItem">
            <NavLink
              id="sideSubmitLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/submissions"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-paper-plane' as IconProp}
                id="sideSubmitIcon"
                className="navSideIcon faIcon"
                size="xl"
              />
              <span id="sideSubmitText" className="navSideText">Submit</span>
            </NavLink>
          </div>

          {/* community icon */}
          <div id="navSideCommunity" className="navSideItem">
            <NavLink
              id="sideCommunityLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/community"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-users' as IconProp}
                id="sideCommunityIcon"
                className="navSideIcon faIcon"
                size="lg"
              />
              <p id="sideCommunityText" className="navSideText">Community</p>
            </NavLink>
          </div>

          {/* community icon */}
          <div id="navSideLeaderboard" className="navSideItem">
            <NavLink
              id="sideLeaderboardLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/leaderboards"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-trophy' as IconProp}
                id="sideLeaderboardIcon"
                className="navSideIcon faIcon"
                size="xl"
              />
              <p id="sideLeaderboardText" className="navSideText">Leaderboard</p>
            </NavLink>
          </div>

          {/* about icon */}
          <div id="navSideAbout" className="navSideItem">
            <NavLink
              id="sideAboutLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/about"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-circle-info' as IconProp}
                id="sideAboutIcon"
                className="navSideIcon faIcon"
                size="xl"
              />
              <p id="sideAboutText" className="navSideText">About</p>
            </NavLink>
          </div>

        </div>

        {/* bottom section of side nav */}
        <div id="navSideBottom" className="navSideSection">

          {/* language icon */}
          <div id="navSideLanguage" className="navSideItem">
            <FontAwesomeIcon
              icon={'fa-solid fa-language' as IconProp}
              id="sideLanguageIcon"
              className="navSideIcon faIcon"
              size="lg"
            />
            <p id="sideLanguageText" className="navSideText">Language</p>
          </div>

          {/* settings icon */}
          <div id="navSideSettings" className="navSideItem">
            <NavLink
              id="sideSettingsLink"
              className={({ isActive }) =>
                isActive ? 'navSideLink sideActivePage' : 'navSideLink sideInactivePage'
              }
              to="/settings"
            >
              <FontAwesomeIcon
                icon={'fa-solid fa-gear' as IconProp}
                id="sideSettingsIcon"
                className="navSideIcon faIcon"
                size="xl"
              />
              <p id="sideSettingsText" className="navSideText">Settings</p>
            </NavLink>
          </div>

          {/*help icon */}
          <div id="navSideHelp" className="navSideItem">
            <FontAwesomeIcon
              icon={'fa-solid fa-circle-question' as IconProp}
              id="sideHelpIcon"
              className="navSideIcon faIcon"
              size="xl"
            />
            <p id="sideHelpText" className="navSideText">Want Help?</p>
          </div>

          {/* report icon */}
          {/*<div id="navSideReport" className="navSideItem">*/}
          {/*  <FontAwesomeIcon*/}
          {/*    icon={'fa-solid fa-bug' as IconProp}*/}
          {/*    id="sideReportIcon"*/}
          {/*    className="navSideIcon faIcon"*/}
          {/*    size="xl"*/}
          {/*  />*/}
          {/*  <p id="sideReportText" className="navSideText">Report Issue</p>*/}
          {/*</div>*/}

        </div>

      </div>

    </>
  )
}

export default SideNav
