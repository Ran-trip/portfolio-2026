import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaCheckCircle } from 'react-icons/fa'
import { getSettings, sendContact } from '../api'

function Contact() {
  const [settings, setSettings] = useState({})
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [envoye, setEnvoye] = useState(false)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur(null)
    const res = await sendContact(form)
    if (res.success) {
      setEnvoye(true)
      setForm({ nom: '', email: '', message: '' })
      setTimeout(() => setEnvoye(false), 4000)
    } else {
      setErreur(res.error || 'Une erreur est survenue')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-20 animate-fade-in">

      <div className="mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold text-[#1A1A2E] mb-4">Contact</h1>
        <p className="text-gray-500">Une question ou un projet ? Écrivez-moi.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 animate-slide-up">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Nom</label>
            <input type="text" name="nom" value={form.nom} onChange={handleChange} required placeholder="John Doe"
              className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560] transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@exemple.com"
              className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560] transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={6} placeholder="Votre message..."
              className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560] transition-colors resize-none" />
          </div>
          {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
          <button type="submit" className="bg-[#E94560] text-white px-6 py-3 rounded hover:bg-[#c73652] transition-colors font-medium">
            Envoyer le message
          </button>
        </form>

        <div className="flex flex-col gap-6 md:w-64 animate-slide-up-delay">
          <h2 className="text-xl font-bold text-[#1A1A2E]">Me retrouver</h2>
          <div className="flex flex-col gap-4">
            <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-gray-500 hover:text-[#E94560] transition-colors">
              <FaEnvelope size={20} className="text-[#E94560]" />
              <span className="text-sm">{settings.email}</span>
            </a>
            {settings.github && (
              <a href={settings.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-[#E94560] transition-colors">
                <FaGithub size={20} className="text-[#E94560]" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-[#E94560] transition-colors">
                <FaLinkedin size={20} className="text-[#E94560]" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {envoye && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up">
          <FaCheckCircle size={20} className="text-green-400" />
          <span>Message envoyé avec succès !</span>
        </div>
      )}

    </div>
  )
}

export default Contact
