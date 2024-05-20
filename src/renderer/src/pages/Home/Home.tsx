import { ReactElement } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { NavLink } from 'react-router-dom'
import { SideNav, TopNav } from '../../components' /* Navigation Components */

import './Home.css'

import planets from '../../assets/images/ADOFAI_Planets.png'

const Home = (): ReactElement => {

  // updates the welcome message
  const curState = localStorage.getItem('accountLoginState') /*|| 'logout'*/
  let username = curState

  if (curState === 'login') {
    username = 'Nebulaas'
  } else if (curState === 'logout') {
    username = 'User'
  }

  return (
    <>
      <TopNav></TopNav>

      <SideNav></SideNav>


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
              <p id="accountWelcome">Welcome, {username}!</p>

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
