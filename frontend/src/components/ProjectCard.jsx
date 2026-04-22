import { Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

function ProjectCard({ project }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden flex flex-col">

      {/* Image */}
      <Link to={`/projects/${project.id}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.titre}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-[#1A1A2E] flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image à ajouter</span>
          </div>
        )}
      </Link>

      {/* Contenu */}
      <div className="flex flex-col gap-3 p-6 flex-grow">
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold text-[#1A1A2E] hover:text-[#E94560] transition-colors">
            {project.titre}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm leading-relaxed flex-grow">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#F5F5F5] text-[#1A1A2E] border border-gray-200 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Liens */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E94560] transition-colors"
            >
              <FaGithub size={16} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E94560] transition-colors"
            >
              <FaExternalLinkAlt size={14} /> Démo
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="ml-auto text-sm text-[#E94560] font-medium hover:underline"
          >
            Voir plus →
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard
