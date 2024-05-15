import { ReactElement } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink } from 'react-router-dom'
import { SideNav, TopNav } from '../../components'

import "./Home.css"

import planets from "../../assets/images/ADOFAI_Planets.png"

const Home = (): ReactElement => {


  return (
    <>
      <TopNav></TopNav>

      <SideNav></SideNav>

      {/* Main section of page */}
      <div id="pageMain">

        {/* Page header, e.g. "Welcome to ADOFAI Browser..." */}
        <div id="pageHeader">

          <div id="headerLogo" className="">
            <h1 id="pageLogo" className="text">AD<img id="logoPlanets-Page" src={planets} alt="O"/>FAI Browser</h1>
          </div>

          <div id="headerTitle">
            <p>Home</p>
          </div>

        </div>

        <div id="pageContent">

          <div></div>

        </div>

      </div>
    </>
  )
}

export default Home
