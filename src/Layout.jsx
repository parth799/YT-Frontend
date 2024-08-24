// import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Headers/Navbar'
import Sidebar from './components/Headers/Sidebar'

function Layout() {
  return (
    <>
    <Navbar />
      <div className="sm:flex flex-none">
        <div className="">
            <Sidebar />
        </div>
        <div className="sm:flex-1">
            <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
