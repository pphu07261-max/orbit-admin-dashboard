import { NavLink } from 'react-router-dom'
import { Activity, BarChart3, ChevronLeft, ChevronRight, FolderKanban, LayoutDashboard, MessageSquare, Package, Settings, ShoppingCart, Users, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
interface Props { mobileOpen: boolean; onClose: () => void }
const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/categories', label: 'Categories', icon: FolderKanban },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
]
export function Sidebar({ mobileOpen, onClose }: Props) {
  const collapsed = useAppStore((state) => state.sidebarCollapsed)
  const toggle = useAppStore((state) => state.toggleSidebar)
  return <>
    {mobileOpen && <button className="drawer-scrim" onClick={onClose} aria-label="Đóng menu" />}
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Activity size={19} /></div>{!collapsed && <span>orbit<span className="brand-dot">.</span></span>}<button className="mobile-close icon-button" onClick={onClose} aria-label="Đóng"><X size={18} /></button></div>
      <div className="nav-caption">{!collapsed && 'WORKSPACE'}</div>
      <nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={onClose} title={collapsed ? label : undefined} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={19} /><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><NavLink to="/settings" onClick={onClose} title={collapsed ? 'Settings' : undefined} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Settings size={19} /><span>Settings</span></NavLink>
        <div className="workspace-card"><div className="workspace-avatar">O</div>{!collapsed && <div><b>Orbit workspace</b><small>Free plan</small></div>}</div>
        <button className="collapse-button" onClick={toggle} aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}>{collapsed ? <ChevronRight size={17} /> : <><ChevronLeft size={17} /> Thu gọn</>}</button>
      </div>
    </aside>
  </>
}
