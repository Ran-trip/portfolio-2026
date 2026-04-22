import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext'

function Navbar() {
  const { settings } = useSettings()
  const logo = settings.logo || null
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <nav className="bg-[#1A1A2E] px-8 py-4">
      <div className="flex items-center justify-between">

        <NavLink to="/" className="flex items-center gap-3">
          {logo ? (
            <img src={`http://localhost:8000${logo}`} alt="logo" className="h-10 w-auto rounded-md" />
          ) : (
            <div className="h-10 w-10 rounded-md bg-[#E94560] flex items-center justify-center font-bold text-white text-lg">
              P
            </div>
          )}
          <span className="text-white font-bold text-xl">{settings.nom || 'Mon Portfolio'}</span>
        </NavLink>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-8 list-none">
          {[
            { to: '/', label: 'Accueil' },
            { to: '/about', label: 'À propos' },
            { to: '/projects', label: 'Projets' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? 'text-[#E94560] font-semibold' : 'text-white hover:text-[#E94560]'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bouton hamburger mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label="Menu"
        >
          {menuOuvert ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOuvert && (
        <ul className="md:hidden flex flex-col items-center gap-6 list-none pt-6 pb-2">
          {[
            { to: '/', label: 'Accueil' },
            { to: '/about', label: 'À propos' },
            { to: '/projects', label: 'Projets' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMenuOuvert(false)}
                className={({ isActive }) =>
                  isActive ? 'text-[#E94560] font-semibold text-lg' : 'text-white hover:text-[#E94560] text-lg'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
