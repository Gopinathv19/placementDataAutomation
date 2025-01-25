import React, { useState } from "react"
import "./header.css"
import Head from "../head/Head"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import GroupIcon from '@mui/icons-material/Group';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Header = ({ dark, setMode, onProfileSelect }) => {
  // Toogle Menu
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <section className='header'>
        <Head 
          dark={dark} 
          setMode={setMode} 
          onProfileSelect={onProfileSelect}
        />
        <header>
          <div className='container'>
            {/*<ul className='navMenu'>*/}
            <ul className={Mobile ? "navMenu-list" : "link"} onClick={() => setMobile(false)}>
              <li>
                <a href='/' className='navIcon'>
                  <LocalFireDepartmentIcon className='navIcon active' />
                  Performance Tracker
                </a>
              </li>
              <li>
                <GroupIcon className='navIcon' />
                <a href='/tracker/a'>A</a>
              </li>
              <li>
                <GroupIcon className='navIcon' />
                <a href='tracker/b'>B</a>
              </li>
              <li>
                <GroupIcon className='navIcon' />
                <a href='tracker/c'>C</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </section>
    </>
  )
}

export default Header
