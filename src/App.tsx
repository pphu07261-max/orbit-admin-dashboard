import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Products'
import { Categories } from './pages/Categories'
import { Orders } from './pages/Orders'
import { Customers } from './pages/Customers'
import { Analytics } from './pages/Analytics'
import { Messages } from './pages/Messages'
import { Settings } from './pages/Settings'
export default function App() {
  return <Routes><Route element={<AppLayout />}><Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/products" element={<Products />} /><Route path="/categories" element={<Categories />} /><Route path="/orders" element={<Orders />} /><Route path="/customers" element={<Customers />} /><Route path="/analytics" element={<Analytics />} /><Route path="/messages" element={<Messages />} /><Route path="/settings" element={<Settings />} /><Route path="*" element={<Navigate to="/dashboard" replace />} /></Route></Routes>
}
