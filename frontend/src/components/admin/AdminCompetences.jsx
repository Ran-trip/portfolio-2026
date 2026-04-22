import { useEffect, useState } from 'react'
import { getCompetences, addCompetence, deleteCompetence } from '../../api'
import { FaTrash } from 'react-icons/fa'

const icones = [
  // Frontend
  { value: 'FaReact',        label: 'React' },
  { value: 'SiNextdotjs',    label: 'Next.js' },
  { value: 'FaVuejs',        label: 'Vue.js' },
  { value: 'SiNuxt',         label: 'Nuxt.js' },
  { value: 'FaAngular',      label: 'Angular' },
  { value: 'SiSvelte',       label: 'Svelte' },
  { value: 'SiGatsby',       label: 'Gatsby' },
  { value: 'FaHtml5',        label: 'HTML5' },
  { value: 'FaCss3Alt',      label: 'CSS3' },
  { value: 'SiSass',         label: 'Sass' },
  { value: 'SiTailwindcss',  label: 'Tailwind CSS' },
  { value: 'SiRedux',        label: 'Redux' },
  { value: 'SiTypescript',   label: 'TypeScript' },
  { value: 'FaJs',           label: 'JavaScript' },
  { value: 'SiVite',         label: 'Vite' },
  { value: 'SiWebpack',      label: 'Webpack' },
  // Backend
  { value: 'FaNodeJs',       label: 'Node.js' },
  { value: 'FaPhp',          label: 'PHP' },
  { value: 'SiLaravel',      label: 'Laravel' },
  { value: 'SiSymfony',      label: 'Symfony' },
  { value: 'FaPython',       label: 'Python' },
  { value: 'SiDjango',       label: 'Django' },
  { value: 'SiFlask',        label: 'Flask' },
  { value: 'FaJava',         label: 'Java' },
  { value: 'SiSpring',       label: 'Spring' },
  { value: 'SiRuby',         label: 'Ruby' },
  { value: 'SiRubyonrails',  label: 'Ruby on Rails' },
  { value: 'SiGo',           label: 'Go' },
  { value: 'SiRust',         label: 'Rust' },
  // Base de données
  { value: 'SiMysql',        label: 'MySQL' },
  { value: 'SiPostgresql',   label: 'PostgreSQL' },
  { value: 'SiMongodb',      label: 'MongoDB' },
  { value: 'SiRedis',        label: 'Redis' },
  { value: 'SiSqlite',       label: 'SQLite' },
  // DevOps & Cloud
  { value: 'FaDocker',       label: 'Docker' },
  { value: 'SiKubernetes',   label: 'Kubernetes' },
  { value: 'FaAws',          label: 'AWS' },
  { value: 'SiGooglecloud',  label: 'Google Cloud' },
  { value: 'SiNginx',        label: 'Nginx' },
  { value: 'SiApache',       label: 'Apache' },
  { value: 'SiFirebase',     label: 'Firebase' },
  // Autres
  { value: 'FaGitAlt',       label: 'Git' },
  { value: 'SiGithub',       label: 'GitHub' },
  { value: 'SiGitlab',       label: 'GitLab' },
  { value: 'SiGraphql',      label: 'GraphQL' },
  { value: 'FaLinux',        label: 'Linux' },
  { value: 'FaWordpress',    label: 'WordPress' },
]

function AdminCompetences({ token }) {
  const [competences, setCompetences] = useState([])
  const [form, setForm] = useState({ nom: '', categorie: 'frontend', icone: '' })
  const [succes, setSucces] = useState(false)

  const load = () => getCompetences().then(setCompetences)
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addCompetence(form, token)
    setForm({ nom: '', categorie: 'frontend', icone: '' })
    setSucces(true)
    setTimeout(() => setSucces(false), 3000)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette compétence ?')) return
    await deleteCompetence(id, token)
    load()
  }

  const frontend = competences.filter((c) => c.categorie === 'frontend')
  const backend  = competences.filter((c) => c.categorie === 'backend')

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Compétences</h2>

      {/* Formulaire ajout */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 mb-8 max-w-lg">
        <h3 className="font-semibold text-[#1A1A2E]">Ajouter une compétence</h3>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#1A1A2E]">Nom</label>
          <input type="text" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560]" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#1A1A2E]">Catégorie</label>
          <select value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560]">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#1A1A2E]">Icône</label>
          <select value={form.icone} onChange={(e) => setForm({ ...form, icone: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560]">
            <option value="">-- Choisir une icône --</option>
            {icones.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="bg-[#E94560] text-white px-6 py-2 rounded hover:bg-[#c73652] transition-colors text-sm font-medium">
            Ajouter
          </button>
          {succes && <span className="text-green-600 text-sm">✓ Compétence ajoutée</span>}
        </div>
      </form>

      {/* Listes */}
      {[['Frontend', frontend], ['Backend', backend]].map(([cat, list]) => (
        <div key={cat} className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">{cat}</h3>
          <div className="flex flex-col gap-2">
            {list.map((c) => (
              <div key={c.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium text-[#1A1A2E] text-sm">{c.nom}</span>
                  {c.icone && <span className="text-xs text-gray-400 ml-2">({c.icone})</span>}
                </div>
                <button onClick={() => handleDelete(c.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
            {list.length === 0 && <p className="text-gray-400 text-sm">Aucune compétence.</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminCompetences
