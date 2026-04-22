import { useEffect, useState } from 'react'
import { getSettings, updateSettings, uploadImage, changePassword } from '../../api'
import { useSettings } from '../../context/SettingsContext'

function Field({ label, name, type = 'text', textarea = false, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#1A1A2E]">{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={4}
          className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560] resize-none" />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange}
          className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560]" />
      )}
    </div>
  )
}

function ImageField({ label, champ, value, onUpload }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#1A1A2E]">{label}</label>
      {value && (
        <img src={`http://localhost:8000${value}`} alt="" className="w-24 h-24 object-cover rounded border border-gray-200" />
      )}
      <input type="file" accept="image/*" onChange={(e) => onUpload(e, champ)}
        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#E94560] file:text-white hover:file:bg-[#c73652] cursor-pointer" />
    </div>
  )
}

function AdminSettings({ token }) {
  const { reload } = useSettings()
  const [mdp, setMdp] = useState({ ancien: '', nouveau: '', confirmation: '' })
  const [mdpMsg, setMdpMsg] = useState(null)

  const handleMdpSubmit = async (e) => {
    e.preventDefault()
    setMdpMsg(null)
    if (mdp.nouveau !== mdp.confirmation) {
      setMdpMsg({ type: 'error', text: 'Les mots de passe ne correspondent pas' })
      return
    }
    const res = await changePassword(mdp.ancien, mdp.nouveau, token)
    if (res.success) {
      setMdp({ ancien: '', nouveau: '', confirmation: '' })
      setMdpMsg({ type: 'success', text: '✓ Mot de passe mis à jour' })
    } else {
      setMdpMsg({ type: 'error', text: res.error || 'Erreur' })
    }
  }

  const [form, setForm] = useState({
    nom: '', titre: '', bio: '', email: '',
    github: '', linkedin: '', logo: '', photo: '',
    autre_titre: '', autre_texte: '', autre_image: '',
  })
  const [succes, setSucces] = useState(false)

  useEffect(() => {
    getSettings().then((data) => setForm((prev) => ({ ...prev, ...data })))
  }, [])

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleUpload = async (e, champ) => {
    const file = e.target.files[0]
    if (!file) return
    const res = await uploadImage(file, token)
    if (res.url) setForm((prev) => ({ ...prev, [champ]: res.url }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateSettings(form, token)
    reload()
    setSucces(true)
    setTimeout(() => setSucces(false), 3000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Paramètres</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">

        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-[#1A1A2E]">Informations générales</h3>
          <Field label="Nom" name="nom" value={form.nom} onChange={handleChange} />
          <Field label="Titre" name="titre" value={form.titre} onChange={handleChange} />
          <Field label="Bio" name="bio" textarea value={form.bio} onChange={handleChange} />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Field label="GitHub" name="github" value={form.github} onChange={handleChange} />
          <Field label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-[#1A1A2E]">Images</h3>
          <ImageField label="Logo (navbar)" champ="logo" value={form.logo} onUpload={handleUpload} />
          <ImageField label="Photo (accueil & à propos)" champ="photo" value={form.photo} onUpload={handleUpload} />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-[#1A1A2E]">Autre compétence</h3>
          <Field label="Titre" name="autre_titre" value={form.autre_titre} onChange={handleChange} />
          <Field label="Texte" name="autre_texte" textarea value={form.autre_texte} onChange={handleChange} />
          <ImageField label="Image" champ="autre_image" value={form.autre_image} onUpload={handleUpload} />
        </div>

        <div className="flex items-center gap-4">
          <button type="submit"
            className="bg-[#E94560] text-white px-6 py-3 rounded hover:bg-[#c73652] transition-colors font-medium">
            Enregistrer
          </button>
          {succes && <span className="text-green-600 text-sm font-medium">✓ Modifications sauvegardées</span>}
        </div>
      </form>

      {/* Changement de mot de passe */}
      <form onSubmit={handleMdpSubmit} className="flex flex-col gap-4 max-w-2xl mt-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-[#1A1A2E]">Changer le mot de passe</h3>
          {[
            { label: 'Ancien mot de passe', key: 'ancien' },
            { label: 'Nouveau mot de passe', key: 'nouveau' },
            { label: 'Confirmer le nouveau', key: 'confirmation' },
          ].map(({ label, key }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#1A1A2E]">{label}</label>
              <input
                type="password"
                value={mdp[key]}
                onChange={(e) => setMdp((prev) => ({ ...prev, [key]: e.target.value }))}
                required
                className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560]"
              />
            </div>
          ))}
          {mdpMsg && (
            <p className={`text-sm font-medium ${mdpMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {mdpMsg.text}
            </p>
          )}
          <button type="submit"
            className="bg-[#1A1A2E] text-white px-6 py-3 rounded hover:bg-[#E94560] transition-colors font-medium w-fit">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings
