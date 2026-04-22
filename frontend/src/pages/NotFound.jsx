import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-32 flex flex-col items-center text-center animate-fade-in gap-6">

      <h1 className="text-[10rem] font-bold text-[#1A1A2E] leading-none animate-slide-up">
        4<span className="text-[#E94560]">0</span>4
      </h1>

      <h2 className="text-2xl font-bold text-[#1A1A2E] animate-slide-up">
        Page introuvable
      </h2>

      <p className="text-gray-500 max-w-md animate-slide-up-delay">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>

      <Link
        to="/"
        className="mt-4 bg-[#E94560] text-white px-8 py-3 rounded hover:bg-[#c73652] transition-colors font-medium animate-slide-up-delay"
      >
        Retour à l'accueil
      </Link>

    </div>
  )
}

export default NotFound
