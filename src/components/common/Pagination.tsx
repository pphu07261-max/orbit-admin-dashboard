import { ChevronLeft, ChevronRight } from 'lucide-react'
interface Props { page: number; pageCount: number; total: number; pageSize: number; onChange: (page: number) => void }
export function Pagination({ page, pageCount, total, pageSize, onChange }: Props) {
  if (total === 0) return null
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return <div className="pagination"><span>Hiển thị <b>{from}–{to}</b> trong <b>{total}</b></span><div><button className="icon-button" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Trang trước"><ChevronLeft size={17} /></button><span className="page-number">{page} / {pageCount}</span><button className="icon-button" disabled={page >= pageCount} onClick={() => onChange(page + 1)} aria-label="Trang sau"><ChevronRight size={17} /></button></div></div>
}
