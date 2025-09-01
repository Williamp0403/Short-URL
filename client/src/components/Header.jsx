import { NavLink } from "react-router-dom";

export function Header () {
  return (
    <header className="flex flex-col sticky top-0 left-0 right-0 backdrop-blur-lg border-b border-zinc-600 sm:px-8 p-5 text-sm sm:text-base">
      <nav className="flex justify-between items-center">
        <NavLink className='font-bold text-sky-600' to='/'>
          <h1>Short URL</h1>
        </NavLink>
        <div className="flex items-center space-x-4 sm:space-x-10">
          <NavLink to='/register' className={({ isActive }) => `py-1 sm:py-2 cursor-pointer font-semibold relative ${ isActive ? "text-sky-500 after:w-full" : "text-white after:w-0 hover:text-sky-400" } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-sky-500 after:transition-all after:duration-400`}>
            <h1>Registrarse</h1>
          </NavLink>
          <NavLink to='/login' className={({ isActive }) => `py-1 sm:py-2 cursor-pointer font-semibold relative ${ isActive ? "text-sky-500 after:w-full" : "text-white after:w-0 hover:text-sky-400" } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-sky-500 after:transition-all after:duration-400`} >
            <h1>Iniciar sesión</h1>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}