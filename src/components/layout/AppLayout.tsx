import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { ToastHost } from '../common/ToastHost'
import { useAppStore } from '../../store/useAppStore'
export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const darkMode = useAppStore((state) => state.darkMode)
  return <div className={`app-shell ${darkMode ? 'dark' : ''}`}><Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /><div className="main-shell"><Header onMenuClick={() => setMobileOpen(true)} /><main className="main-content"><Outlet /></main></div><ToastHost /></div>
}
