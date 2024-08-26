import { useState } from "react"
import Logo from "../miniComponents/Logo"
import Search from "../miniComponents/Search"
import { CiSearch } from "react-icons/ci"
import { SlMenu } from "react-icons/sl"

function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)



  return (
    <>
      <nav className="w-full bg-[#0E0F0F] flex justify-between p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50 ">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Logo />
        </div>

        <div className="w-full sm:w-1/3 hidden sm:block">
            <Search />
        </div>

        <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
          <CiSearch 
          size={30}
          fontWeight={"bold"}
          onClick={() => setOpenSearch((prev) => !prev)}
          />
          {
            openSearch && (
              <div className="absolute top-10 left-10 w-full">
                <input 
                  type="text"
                  className="w-full px-4 py-2 rounded-md text-gray-800"
                  placeholder="Search"
                />
              </div>
            )
          }
        </div>

        <div className="sm:hidden block">
          <div className="text-white">
            <SlMenu
            size={24}
            onClick={() => setToggleMenu((prev) => !prev)}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
