import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='container-fluid'>
            <Outlet/>
        </div>
        {/* <div>
            <Footer/>
        </div> */}
    </div>
  )
}

export default RootLayout;