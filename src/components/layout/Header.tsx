import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
interface Props { onMenuClick: () => void }
export function Header({ onMenuClick }: Props) {
  const darkMode = useAppStore((state) => state.darkMode)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  return <header className="topbar"><div className="topbar-left"><button className="icon-button menu-trigger" onClick={onMenuClick} aria-label="Mở menu"><Menu size={20} /></button><div className="breadcrumb">Workspace <span>/</span> <b>Overview</b></div></div>
    <div className="topbar-right"><label className="global-search"><Search size={16} /><input placeholder="Tìm kiếm..." aria-label="Tìm kiếm" /><kbd>⌘ K</kbd></label><button className="icon-button theme-button" onClick={toggleTheme} aria-label="Đổi giao diện">{darkMode ? <Sun size={19} /> : <Moon size={19} />}</button><button className="notification-button" aria-label="Thông báo"><Bell size={19} /><i /></button><div className="top-user"><div className="avatar">PA</div><div><b>Phú Admin</b><small>Administrator</small></div><ChevronDown size={15} /></div></div>
  </header>
}
