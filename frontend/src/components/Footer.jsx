import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useSettings } from '../context/SettingsContext'

function Footer() {
  const { settings } = useSettings()

  return (
    <footer className="bg-[#1A1A2E] text-white mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center gap-8">

        <div className="text-center">
          <p className="text-2xl font-bold mb-2">{settings.nom}</p>
          <p className="text-gray-400 text-sm">{settings.titre}</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 list-none">
          <li><Link to="/" className="text-gray-400 hover:text-[#E94560] transition-colors text-sm">Accueil</Link></li>
          <li><Link to="/about" className="text-gray-400 hover:text-[#E94560] transition-colors text-sm">À propos</Link></li>
          <li><Link to="/projects" className="text-gray-400 hover:text-[#E94560] transition-colors text-sm">Projets</Link></li>
          <li><Link to="/contact" className="text-gray-400 hover:text-[#E94560] transition-colors text-sm">Contact</Link></li>
        </ul>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            {settings.github && (
              <a href={settings.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-[#E94560] transition-colors">
                <FaGithub size={22} />
              </a>
            )}
            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#E94560] transition-colors">
                <FaLinkedin size={22} />
              </a>
            )}
          </div>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-gray-400 hover:text-[#E94560] transition-colors text-sm">
              <MdEmail size={18} />
              <span>{settings.email}</span>
            </a>
          )}
        </div>

        <div className="w-full border-t border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {settings.nom}. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
