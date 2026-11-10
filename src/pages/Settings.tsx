import { useState } from 'react'
import { PageHeader } from '../components/common/PageHeader'
import { useAppStore } from '../store/useAppStore'
const tabs = ['General', 'Profile', 'Security', 'Notifications', 'Appearance'] as const
type Tab = typeof tabs[number]
export function Settings() {
  const [tab, setTab] = useState<Tab>('General')
  const [storeName, setStoreName] = useState('Orbit Store')
  const [email, setEmail] = useState('admin@orbit.store')
  const [saved, setSaved] = useState(false)
  const darkMode = useAppStore((state) => state.darkMode)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const toast = useAppStore((state) => state.toast)
  const save = () => { setSaved(true); toast('Cài đặt đã được lưu (mock).'); window.setTimeout(() => setSaved(false), 1800) }
  return <><PageHeader title="Settings" description="Manage your workspace preferences and account." /><div className="settings-layout"><nav className="settings-tabs">{tabs.map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</nav><section className="panel settings-panel"><div className="settings-heading"><h2>{tab} settings</h2><p>Update your {tab.toLowerCase()} preferences here.</p></div>
    {tab === 'General' && <div className="form-stack settings-form"><label>Store name<input value={storeName} onChange={(event) => setStoreName(event.target.value)} /></label><label>Support email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Store description<textarea rows={3} defaultValue="A thoughtful collection of everyday essentials." /></label></div>}
    {tab === 'Profile' && <div className="form-stack settings-form"><div className="profile-edit"><div className="profile-large">PA</div><div><b>Phú Admin</b><small>Administrator</small></div></div><label>Full name<input defaultValue="Phú Admin" /></label><label>Email address<input type="email" defaultValue="admin@orbit.store" /></label><label>Role<input value="Administrator" disabled /></label></div>}
    {tab === 'Security' && <div className="form-stack settings-form"><label>Current password<input type="password" placeholder="Enter current password" /></label><label>New password<input type="password" placeholder="Enter new password" /></label><label>Confirm new password<input type="password" placeholder="Confirm new password" /></label><div className="setting-row"><div><b>Two-factor authentication</b><small>Add an extra layer of account security.</small></div><input type="checkbox" defaultChecked /></div></div>}
    {tab === 'Notifications' && <div className="form-stack settings-form">{['Order updates', 'New customer signups', 'Low stock alerts', 'Product reviews', 'Weekly performance report'].map((item, index) => <div className="setting-row" key={item}><div><b>{item}</b><small>Receive email notifications for {item.toLowerCase()}.</small></div><input type="checkbox" defaultChecked={index !== 3} /></div>)}</div>}
    {tab === 'Appearance' && <div className="form-stack settings-form"><div className="setting-row"><div><b>Dark mode</b><small>Switch between light and dark appearance.</small></div><button className={`toggle-switch ${darkMode ? 'on' : ''}`} onClick={toggleTheme} aria-label="Chuyển dark mode"><i /></button></div><div className="setting-row"><div><b>Compact sidebar</b><small>Save space by collapsing the navigation.</small></div><input type="checkbox" onChange={(event) => useAppStore.getState().setSidebarCollapsed(event.target.checked)} /></div></div>}
    <div className="settings-footer"><button className="button button-primary" onClick={save}>{saved ? 'Saved!' : 'Save changes'}</button></div>
  </section></div></>
}
