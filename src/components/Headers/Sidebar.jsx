// import React from 'react'

import { BiHistory, BiLike } from "react-icons/bi"
import { HiOutlineVideoCamera } from "react-icons/hi2"
import { IoFolderOutline } from "react-icons/io5";
import { RiHome6Line } from "react-icons/ri"
import { TbUserCheck } from "react-icons/tb";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const username = useSelector((state) => state.auth.userData?.username);
  const sidebarItems =[
    {
      icon: <RiHome6Line size={25} />,
      title:"Home",
      url:"/",
    },
    {
      icon: <BiLike size={25} />,
      title:"Liked Videos",
      url:"/liked-videos",
    },
    {
      icon: <BiHistory size={25} />,
      title:"History",
      url:"/history",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title:"My Content",
      url:`/channel/${username}`,
    },
    {
      icon: <IoFolderOutline size={25} />,
      title:"Collections",
      url:"/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title:"Subscriptions",
      url:"/subscriptions",
    },
  ]

  const bottomBarItems = [
    {
        icon: <RiHome6Line size={25} />,
        title: "Home",
        url: "/",
    },
    {
        icon: <BiHistory size={25} />,
        title: "History",
        url: "/history",
    },
    {
        icon: <IoFolderOutline size={25} />,
        title: "Collections",
        url: "/collections",
    },
    {
        icon: <TbUserCheck size={25} />,
        title: "Subscriptions",
        url: "/subscriptions",
    },
];

  return (
    <>
    <div className="sm:block hidden">
      <div className="text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between">
        <div className="flex flex-col gap-4 mt-5">
          {sidebarItems.map((item) => (
            <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) =>
              isActive ? "bg-purple-500" : ""
          }
            ><div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600">
            {item.icon}
            <span className="text-base hidden md:block">
                {item.title}
            </span>
        </div></NavLink>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
