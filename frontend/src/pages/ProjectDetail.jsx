import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa'
import { getProject } from '../api'

function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getProject(id).then((data) => {
      if (data.error) setNotFound(true)
      else setProject(data)
    })
  }, [id])

  if (notFound) return (
    <div className="max-w-5xl mx-auto px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Projet introuvable</h1>
      <Link to="/projects" className="text-[#E94560] hover:underline">← Retour aux projets</Link>
    </div>
  )

  if (!project) return (
    <div className="max-w-5xl mx-auto px-8 py-20 text-center text-gray-400">Chargement...</div>
  )

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 animate-fade-in">

      <Link to="/projects" className="flex items-center gap-2 text-gray-500 hover:text-[#E94560] transition-colors mb-10">
        <FaArrowLeft size={14} /> Retour aux projets
      </Link>

      <div className="w-full h-72 bg-[#1A1A2E] rounded-lg shadow-md flex items-center justify-center mb-10 animate-slide-up overflow-hidden">
        {project.image ? (
          <img src={`http://localhost:8000${project.image}`} alt={project.titre} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-sm">Image à ajouter</span>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">{project.titre}</h1>
          <p className="text-gray-500">
            {project.annee ? new Date(project.annee).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : ''}
            {project.duree ? ` · ${project.duree}` : ''}
          </p>
        </div>
        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1A1A2E] text-white px-4 py-2 rounded hover:bg-[#E94560] transition-colors text-sm">
              <FaGithub size={16} /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[#1A1A2E] text-[#1A1A2E] px-4 py-2 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors text-sm">
              <FaExternalLinkAlt size={14} /> Voir la démo
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {(project.tags || []).map((tag) => (
          <span key={tag} className="text-sm bg-[#F5F5F5] text-[#1A1A2E] border border-gray-200 px-4 py-1 rounded-full font-medium">{tag}</span>
        ))}
      </div>

      <div className="flex flex-col gap-10 animate-slide-up-delay">
        {project.contexte && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Contexte</h2>
            <p className="text-gray-500 leading-relaxed">{project.contexte}</p>
          </div>
        )}
        {project.fonctionnalites?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Fonctionnalités</h2>
            <ul className="flex flex-col gap-2">
              {project.fonctionnalites.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-500">
                  <span className="text-[#E94560] font-bold mt-1">—</span>{f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.defis && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Défis techniques</h2>
            <p className="text-gray-500 leading-relaxed">{project.defis}</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default ProjectDetail
