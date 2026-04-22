import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { getProjects } from '../api'

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  const mdOffsets = ['md:ml-[80px]', 'md:ml-[40px]', 'md:ml-0']

  return (
    <div className="max-w-5xl mx-auto px-8 py-20 animate-fade-in">

      <div className="mb-16 animate-slide-up">
        <h1 className="text-4xl font-bold text-[#1A1A2E] mb-4">Mes Projets</h1>
        <p className="text-gray-500">Une sélection de mes réalisations les plus récentes.</p>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col md:flex-row items-stretch gap-8 ${mdOffsets[index % mdOffsets.length]}`}
            style={{ opacity: 0, animation: `slideUp 0.6s ease ${index * 0.15}s forwards` }}
          >
            <Link to={`/projects/${project.id}`} className="flex-shrink-0 w-full md:w-72">
              {project.image ? (
                <img src={`http://localhost:8000${project.image}`} alt={project.titre} className="w-full h-52 object-cover rounded-lg shadow-md" />
              ) : (
                <div className="w-full h-52 bg-[#1A1A2E] rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image à ajouter</span>
                </div>
              )}
            </Link>

            <div className="flex flex-col gap-3 bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex-grow">
              <Link to={`/projects/${project.id}`}>
                <h3 className="text-xl font-bold text-[#1A1A2E] hover:text-[#E94560] transition-colors">{project.titre}</h3>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(project.tags || []).map((tag) => (
                  <span key={tag} className="text-xs bg-[#F5F5F5] text-[#1A1A2E] border border-gray-200 px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E94560] transition-colors">
                    <FaGithub size={16} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E94560] transition-colors">
                    <FaExternalLinkAlt size={14} /> Démo
                  </a>
                )}
                <Link to={`/projects/${project.id}`} className="ml-auto text-sm text-[#E94560] font-medium hover:underline">
                  Voir plus →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Projects
