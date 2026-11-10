import type { ReactNode } from 'react'
import { X } from 'lucide-react'
interface Props { title: string; onClose: () => void; children: ReactNode; wide?: boolean }
export function Modal({ title, onClose, children, wide = false }: Props) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-head"><h2 id="modal-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Đóng"><X size={18} /></button></div>
      {children}
    </section>
  </div>
}
