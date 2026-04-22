import { useEffect, useState } from 'react'
import { getProjects, createProject, updateProject, deleteProject, uploadImage } from '../../api'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const emptyForm = {
  titre: '', description: '', image: '', tags: '',
  github: '', demo: '', contexte: '', fonctionnalites: '',
  defis: '', duree: '', annee: '', ordre: 0,
}

function AdminProjects({ token }) {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [succes, setSucces] = useState(false)

  const load = () => getProjects().then(setProjects)
  useEffect(() => { load() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const res = await uploadImage(file, token)
    if (res.url) setForm((prev) => ({ ...prev, image: res.url }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      fonctionnalites: form.fonctionnalites.split('\n').map((f) => f.trim()).filter(Boolean),
    }
    if (editId) await updateProject(editId, data, token)
    else await createProject(data, token)
    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    setSucces(true)
    setTimeout(() => setSucces(false), 3000)
    load()
  }

  const handleEdit = (project) => {
    setForm({
      ...project,
      tags: (project.tags || []).join(', '),
      fonctionnalites: (project.fonctionnalites || []).join('\n'),
    })
    setEditId(project.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return
    await deleteProject(id, token)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#1A1A2E]">Projets</h2>
        <button
          onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(!showForm) }}
          className="flex items-center gap-2 bg-[#E94560] text-white px-4 py-2 rounded hover:bg-[#c73652] transition-colors text-sm font-medium"
        >
          <FaPlus size={12} /> Nouveau projet
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 mb-8">
          <h3 className="font-semibold text-[#1A1A2E]">{editId ? 'Modifier le projet' : 'Nouveau projet'}</h3>

          {[
            { label: 'Titre *', name: 'titre' },
            { label: 'Description', name: 'description' },
            { label: 'GitHub', name: 'github' },
            { label: 'Démo', name: 'demo' },
            { label: 'Durée (ex: 3 semaines)', name: 'duree' },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#1A1A2E]">{label}</label>
              <input type="text" name={name} value={form[name] || ''} onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560]" />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Date du projet</label>
            <input
              type="date"
              name="annee"
              value={form.annee || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Tags (séparés par des virgules)</label>
            <input type="text" name="tags" value={form.tags || ''} onChange={handleChange} placeholder="React, Node.js, MySQL"
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560]" />
          </div>

          {[
            { label: 'Contexte', name: 'contexte' },
            { label: 'Défis techniques', name: 'defis' },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#1A1A2E]">{label}</label>
              <textarea name={name} value={form[name] || ''} onChange={handleChange} rows={3}
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560] resize-none" />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Fonctionnalités (une par ligne)</label>
            <textarea name="fonctionnalites" value={form.fonctionnalites || ''} onChange={handleChange} rows={4}
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#E94560] resize-none" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1A1A2E]">Image</label>
            {form.image && <img src={`http://localhost:8000${form.image}`} alt="" className="w-32 h-20 object-cover rounded border border-gray-200" />}
            <input type="file" accept="image/*" onChange={handleUpload}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#E94560] file:text-white hover:file:bg-[#c73652] cursor-pointer" />
          </div>

          <div className="flex gap-3 mt-2">
            <button type="submit" className="bg-[#E94560] text-white px-6 py-2 rounded hover:bg-[#c73652] transition-colors text-sm font-medium">
              {editId ? 'Modifier' : 'Ajouter'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="border border-gray-300 text-gray-500 px-6 py-2 rounded hover:bg-gray-100 transition-colors text-sm">
              Annuler
            </button>
          </div>
        </form>
      )}

      {succes && <p className="text-green-600 text-sm font-medium mb-4">✓ Projet sauvegardé</p>}

      {/* Liste */}
      <div className="flex flex-col gap-3">
        {projects.map((p) => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
            {p.image ? (
              <img src={`http://localhost:8000${p.image}`} alt="" className="w-16 h-12 object-cover rounded flex-shrink-0" />
            ) : (
              <div className="w-16 h-12 bg-gray-100 rounded flex-shrink-0" />
            )}
            <div className="flex-grow">
              <p className="font-medium text-[#1A1A2E]">{p.titre}</p>
              <p className="text-xs text-gray-400">{(p.tags || []).join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="p-2 text-gray-400 hover:text-[#E94560] transition-colors">
                <FaEdit size={16} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-gray-400 text-sm">Aucun projet. Créez-en un !</p>}
      </div>
    </div>
  )
}

export default AdminProjects
