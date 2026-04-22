import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../api'

function Home() {
  const [settings, setSettings] = useState({
    nom: '',
    titre: '',
    description: 'Je crée des expériences web modernes, rapides et élégantes.',
    photo: null,
  })

  useEffect(() => {
    getSettings().then((data) => setSettings((prev) => ({ ...prev, ...data })))
  }, [])

  return (
    <div className="animate-fade-in">
      <section className="max-w-5xl mx-auto px-8 py-24 flex flex-col md:flex-row items-stretch gap-12">

        <div className="flex-1 border-2 border-[#1A1A2E] rounded-lg p-10 flex flex-col gap-6 animate-slide-up shadow-md bg-white">
          <p className="text-[#E94560] font-medium tracking-widest uppercase text-sm">
            Bienvenue sur mon portfolio
          </p>
          <h1 className="text-5xl font-bold text-[#1A1A2E] leading-tight">
            Bonjour, je suis <br />
            <span className="text-[#E94560]">{settings.nom}</span>
          </h1>
          <p className="text-xl text-gray-500">{settings.titre}</p>
          <p className="text-gray-500">{settings.bio}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Link to="/projects" className="bg-[#E94560] text-white px-6 py-3 rounded hover:bg-[#c73652] transition-colors font-medium text-center">
              Voir mes projets
            </Link>
            <Link to="/contact" className="border border-[#1A1A2E] text-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors font-medium text-center">
              Me contacter
            </Link>
          </div>
        </div>

        <div className="w-full md:w-80 animate-slide-up-delay">
          {settings.photo ? (
            <img src={`http://localhost:8000${settings.photo}`} alt="hero" className="w-full h-full object-cover rounded-lg shadow-md" />
          ) : (
            <div className="w-full h-full min-h-80 bg-[#1A1A2E] rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image à ajouter</span>
            </div>
          )}
        </div>

      </section>
    </div>
  )
}

export default Home
