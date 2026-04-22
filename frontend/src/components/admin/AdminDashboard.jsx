import { useState } from 'react'
import { FaCog, FaProjectDiagram, FaCode, FaSignOutAlt } from 'react-icons/fa'
import AdminSettings from './AdminSettings'
import AdminProjects from './AdminProjects'
import AdminCompetences from './AdminCompetences'

const tabs = [
  { id: 'settings',    label: 'Paramètres', icon: <FaCog size={16} /> },
  { id: 'projects',    label: 'Projets',    icon: <FaProjectDiagram size={16} /> },
  { id: 'competences', label: 'Compétences',icon: <FaCode size={16} /> },
]

function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('settings')

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] text-white flex flex-col min-h-screen">
        <div className="px-6 py-8 border-b border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Backoffice</p>
          <p className="font-bold text-lg">Portfolio Admin</p>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-[#E94560] text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-colors w-full"
          >
            <FaSignOutAlt size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'settings'    && <AdminSettings token={token} />}
        {activeTab === 'projects'    && <AdminProjects token={token} />}
        {activeTab === 'competences' && <AdminCompetences token={token} />}
      </main>

    </div>
  )
}

export default AdminDashboard
