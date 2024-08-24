import { useState } from "react"
import Logo from "../miniComponents/Logo"
import Search from "../miniComponents/Search"

function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)



  return (
    <>
      <nav className="w-full bg-[#0E0F0F] flex justify-between p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50 ">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Logo />
        </div>

        <div className="w-full sm:w-1/3 hidden sm:block">
            <Search />
        </div>
      </nav>
    </>
  )
}

export default Navbar
