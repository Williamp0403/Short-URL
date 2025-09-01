import { NavLink } from "react-router-dom";
import { BurgerMenu } from "./BurgerMenu";
import { ModalLogout } from "./Modal/ModalLogout";

export function HeaderPrivate() {
  return (
    <header className="flex flex-col sticky top-0 bg-zinc-900 border-b border-zinc-600 sm:px-8 p-5 text-sm sm:text-base z-15">
      <nav className="flex justify-between items-center">
        <NavLink to='/dashboard' className='font-bold text-sky-600'>
          <h1 className="text-base">Short URL</h1>
        </NavLink>
        <div className="hidden md:flex items-center space-x-4 sm:space-x-20">
          <NavLink to='/dashboard' className={({ isActive }) => `py-1 sm:py-2 cursor-pointer font-semibold relative ${isActive ? "text-sky-500 after:w-full" : "text-white after:w-0 hover:text-sky-400"} after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-sky-500 after:transition-all after:duration-400`}>
            <h1>Dashboard</h1>
          </NavLink>
          <NavLink to='/links' className={({ isActive }) => `py-1 sm:py-2 cursor-pointer font-semibold relative ${isActive ? "text-sky-500 after:w-full" : "text-white after:w-0 hover:text-sky-400"} after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-sky-500 after:transition-all after:duration-400`} >
            <h1>Enlaces</h1>
          </NavLink>
          <NavLink to='/statistics' className={({ isActive }) => `py-1 sm:py-2 cursor-pointer font-semibold relative ${isActive ? "text-sky-500 after:w-full" : "text-white after:w-0 hover:text-sky-400"} after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-sky-500 after:transition-all after:duration-400`} >
            <h1>Estadísticas</h1>
          </NavLink>
          <ModalLogout />
        </div>
        <BurgerMenu />
      </nav>
    </header>
  )
}