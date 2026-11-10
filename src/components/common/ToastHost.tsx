import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
export function ToastHost() {
  const toasts = useAppStore((state) => state.toasts)
  const removeToast = useAppStore((state) => state.removeToast)
  return <div className="toast-host" aria-live="polite">{toasts.map((toast) => {
    const Icon = toast.type === 'error' ? AlertCircle : toast.type === 'info' ? Info : CheckCircle2
    return <div className={`toast toast-${toast.type}`} key={toast.id}><Icon size={18} /><span>{toast.message}</span><button onClick={() => removeToast(toast.id)} aria-label="Đóng thông báo"><X size={15} /></button></div>
  })}</div>
}
