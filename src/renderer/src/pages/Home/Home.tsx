import { ReactElement, useContext, useEffect } from 'react' /* , useCallback */
// import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { AccountContext } from '../../context/Client/Account/Account'
import { LanguageContext } from '../../context/Client/Language/Language'

import { CombinedNav } from '../../components' /* Navigation Component */

import './Home.css'

import planets from '../../assets/images/ADOFAI_Planets.png'

const Home = (): ReactElement => {
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { loginState } = useContext(AccountContext)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    if (loginState == 'login') {
      document.getElementById('userText')!.innerHTML = ', ' + 'Nebulaas' + '!'
    } else if (loginState == 'logout') {
      document.getElementById('userText')!.innerHTML = ', ' + t('home.user') + '!'
    }

    console.log(loginState)
  }, [loginState, language])

  return (
    <>
      <CombinedNav></CombinedNav>
      {/*<TopNav SetWelcomeText={SetWelcomeText} curState={curState} username={username}></TopNav>*/}

      {/*<SideNav></SideNav>*/}

      {/* Main section of page */}
      <div id="pageHome">

        {/* The page content */}
        <div id="homeContent">

          {/* Page header, e.g. "Welcome to ADOFAI Browser..." */}
          <header id="homeHeader">

            <div id="homeHeaderLogo" className="">
              <h1 id="homeLogoText" className="text">
                AD
                <img id="homeLogoPlanets" src={planets} alt="O" />
                FAI Browser
              </h1>
            </div>

            <div id="homeAccount">
              {/*<p id="accountWelcome">Welcome, {Username}!</p>*/}
              <div id="accountWelcome">
                <p id="welcomeText" style={{ margin: 0, padding: 0 }}>
                  {t('home.welcome')}
                </p>
                <p id="userText" style={{ margin: 0, padding: 0 }}>
                  , User!
                </p>
              </div>
            </div>

          </header>

          <div id="homeBody">

          <div id="homeBrowse">

            </div>

            <div id="homeSubmissions">

            </div>

            <div id="homeLeaderboard">

            </div>

            <div id="homeCommunity">

            </div>

          </div>

          <footer id="homeFooter">

          <div id="homeAbout">


            </div>

          </footer>

        </div>

      </div>
    </>
  )
}

export default Home
