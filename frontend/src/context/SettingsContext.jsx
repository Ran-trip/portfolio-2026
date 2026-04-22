import { createContext, useContext, useEffect, useState } from 'react'
import { getSettings } from '../api'

const SettingsContext = createContext({})

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({})

  const reload = () => getSettings().then(setSettings)

  useEffect(() => { reload() }, [])

  return (
    <SettingsContext.Provider value={{ settings, reload }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
