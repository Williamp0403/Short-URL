import { BarChart, Close, DashboardCustomize, InsertLink, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function BurgerMenu () {
  const [ isOpen, setIsOpen ] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="block relative md:hidden">
      <IconButton onClick={handleMenu}>
        <Menu fontSize="medium"/>
      </IconButton>
        <div className={`${ isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-[calc(100vw-80px)] bg-zinc-900 transition-transform duration-300 ease-in-out z-50`}>
        <div className="p-2">
          <div className="p-3 flex justify-end">
            <IconButton onClick={handleMenu}>
              <Close fontSize="medium"/>
            </IconButton>
          </div>
          <div className="flex flex-col gap-4 justify-center items-start px-2">
            <NavLink to="/dashboard" className={({ isActive }) => `${ isActive ? 'bg-sky-600/70' : 'hover:text-sky-600'} rounded-full py-4 px-6 font-semibold w-full space-x-3 `} onClick={handleMenu}>
              <DashboardCustomize />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/links" className={({ isActive }) => `${ isActive ? 'bg-sky-600/70' : 'hover:text-sky-600'} rounded-full py-4 px-6 font-semibold w-full space-x-3 `} onClick={handleMenu}>
              <InsertLink />
              <span>Enlaces</span>
            </NavLink>
            <NavLink to="/statistics" className={({ isActive }) => `${ isActive ? 'bg-sky-600/70' : 'hover:text-sky-600'} rounded-full py-4 px-6 font-semibold w-full space-x-3 `} onClick={handleMenu}>
              <BarChart/>
              <span>Estadísticas</span> 
            </NavLink>
          </div>
        </div>
      </div>
      {
        isOpen && <div onClick={handleMenu} className="fixed top-0 right-0 left-0 bottom-0 h-screen bg-zinc-700 opacity-75"></div>
      }
    </div>
  )
}