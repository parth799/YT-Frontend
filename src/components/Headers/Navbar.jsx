/* eslint-disable no-unused-vars */
import { useState } from "react";
import Logo from "../components/Logo";
import Search from "../components/Search";
import { CiSearch } from "react-icons/ci";
import { SlMenu } from "react-icons/sl";
import SearchForSmallScreen from "../components/SearchForSmallScreen";
import { IoMdLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/Slice/authSlice";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth?.userData?.username);
  const profileImg = useSelector((state) => state.auth.userData?.avatar?.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(userLogout());
    // Clear localStorage on logout
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const sidePanelItems = [
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
  ];

  return (
    <>
      <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
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
          {openSearch && (
            <SearchForSmallScreen
              open={openSearch}
              setOpenSearch={setOpenSearch}
            />
          )}
        </div>

        {authStatus ? (
          <div className="flex items-center gap-2">
            <img
              src={profileImg}
              alt="profileImg"
              className="rounded-full w-10 h-10 object-cover sm:block hidden"
            />
            <span className="text-white hidden sm:inline-block">
              
                <div
                  className="hidden sm:flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border text-white border-slate-600"
                  onClick={logout}
                >
                  <IoMdLogOut size={25} />
                  <span className="text-base">Logout</span>
                </div>
              
            </span>
          </div>
        ) : (
          <div className="space-x-2 hidden sm:flex">
            <Link to={"/login"}>
              <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2 text-white">
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 p-2 text-white">
                Sign up
              </Button>
            </Link>
          </div>
        )}

        <div className="sm:hidden block">
          <div className="text-white">
            <SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} />
          </div>
        </div>

        {toggleMenu && (
          <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] rounded-lg outline-none z-50">
            <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <IoCloseCircleOutline
                size={35}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            </div>

            <div className="flex flex-col justify-between h-full py-5 px-3">
              <div className="flex flex-col gap-5">
                {sidePanelItems.map((item) => (
                  <NavLink
                    to={item.url}
                    key={item.title}
                    onClick={() => setToggleMenu(false)}
                    className={({ isActive }) =>
                      isActive ? "bg-purple-500" : ""
                    }
                  >
                    <div className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500">
                      <div>{item.icon}</div>
                      <span className="text-lg">{item.title}</span>
                    </div>
                  </NavLink>
                ))}
              </div>

              {!authStatus ? (
                <div className="flex flex-col space-y-5 mb-3">
                  <Link to={"/login"}>
                    <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-2 px-3 text-white">
                      Login
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button className="w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-2 px-3 text-white">
                      Sign up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
                  onClick={logout}
                >
                  <IoMdLogOut size={25} />
                  <span className="text-base">Logout</span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
