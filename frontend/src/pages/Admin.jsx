import { useState, useEffect } from 'react'
import { login } from '../api'
import AdminDashboard from '../components/admin/AdminDashboard'

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'))
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErreur(null)
    const res = await login(password)
    setLoading(false)
    if (res.token) {
      localStorage.setItem('admin_token', res.token)
      setToken(res.token)
    } else {
      setErreur('Mot de passe incorrect')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  useEffect(() => {
    const onUnauthorized = () => {
      localStorage.removeItem('admin_token')
      setToken(null)
      setErreur('Session expirée, veuillez vous reconnecter.')
    }
    window.addEventListener('unauthorized', onUnauthorized)
    return () => window.removeEventListener('unauthorized', onUnauthorized)
  }, [])

  if (token) return <AdminDashboard token={token} onLogout={handleLogout} />

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Backoffice</h1>
        <p className="text-gray-400 text-sm mb-8">Connectez-vous pour accéder à l'administration.</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1A1A2E]">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#E94560] transition-colors"
            />
          </div>
          {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#E94560] text-white px-6 py-3 rounded hover:bg-[#c73652] transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admin
