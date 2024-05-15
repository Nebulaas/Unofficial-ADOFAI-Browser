import { ReactElement } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink } from 'react-router-dom'
import { SideNav, TopNav } from '../../components'

import "./Settings.css"

import planets from "../../assets/images/ADOFAI_Planets.png"

const Settings = (): ReactElement => {


  return (
    <>
      <TopNav></TopNav>

      <SideNav></SideNav>

      {/* Main section of page */}
      <div id="pageMain">

        {/* Page header, e.g. "Welcome to __" */}
        <div id="pageHeader">
          <div id="headerLogo">
            <h1 id="pageLogo" className="text">AD<img id="logoPlanets-Page" src={planets} alt="O"/>FAI Browser</h1>
          </div>

          <div id="headerTitle">
            <p>Settings</p>
          </div>

        </div>

      </div>
    </>
  )
}

export default Settings
