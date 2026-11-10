import { useMemo, useState } from 'react'
import { Download, Search, Eye } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { DataTable } from '../components/common/DataTable'
import { Modal } from '../components/common/Modal'
import { StatusBadge } from '../components/common/StatusBadge'
import { orders } from '../data/mockData'
import type { Order } from '../types'
export function Orders() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [date, setDate] = useState('All')
  const [selected, setSelected] = useState<Order | null>(null)
  const filtered = useMemo(() => orders.filter((item) => `${item.id} ${item.customer} ${item.email}`.toLowerCase().includes(query.toLowerCase()) && (status === 'All' || item.status === status) && (date === 'All' || item.date >= date)), [query, status, date])
  const exportCsv = () => { const header = ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status', 'Items']; const rows = filtered.map((item) => [item.id, item.customer, item.email, item.date, item.total, item.status, item.items]); const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n'); const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })); const link = document.createElement('a'); link.href = url; link.download = 'orders.csv'; link.click(); URL.revokeObjectURL(url) }
  const columns = [
    { key: 'id', label: 'Order', render: (item: Order) => <b className="table-strong">{item.id}</b> },
    { key: 'customer', label: 'Customer', render: (item: Order) => <div><b>{item.customer}</b><small className="block-muted">{item.email}</small></div> },
    { key: 'date', label: 'Date', render: (item: Order) => item.date },
    { key: 'items', label: 'Items', render: (item: Order) => `${item.items} items` },
    { key: 'status', label: 'Status', render: (item: Order) => <StatusBadge status={item.status} /> },
    { key: 'total', label: 'Total', render: (item: Order) => <b>${item.total.toFixed(2)}</b> },
    { key: 'action', label: '', align: 'right' as const, render: (item: Order) => <button className="icon-button" onClick={() => setSelected(item)} aria-label="Xem đơn hàng"><Eye size={17} /></button> },
  ]
  return <><PageHeader title="Orders" description="Track, review and manage customer orders." action={<button className="button button-secondary" onClick={exportCsv}><Download size={16} /> Export CSV</button>} /><section className="panel table-panel"><div className="toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders..." /></label><div className="toolbar-filters"><select className="select-control" value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Completed</option><option>Processing</option><option>Pending</option><option>Cancelled</option></select><select className="select-control" value={date} onChange={(event) => setDate(event.target.value)}><option value="All">All dates</option><option value="2026-11-09">Since Nov 9</option><option value="2026-11-08">Since Nov 8</option><option value="2026-11-07">Since Nov 7</option></select></div></div><DataTable columns={columns} rows={filtered} rowKey={(item) => item.id} /></section>
    {selected && <Modal title={`Order ${selected.id}`} onClose={() => setSelected(null)}><div className="order-detail"><div className="detail-line"><span>Customer</span><b>{selected.customer}</b></div><div className="detail-line"><span>Email</span><b>{selected.email}</b></div><div className="detail-line"><span>Order date</span><b>{selected.date}</b></div><div className="detail-line"><span>Items</span><b>{selected.items}</b></div><div className="detail-line"><span>Status</span><StatusBadge status={selected.status} /></div><div className="detail-total"><span>Total amount</span><strong>${selected.total.toFixed(2)}</strong></div></div><div className="modal-actions"><button className="button button-primary" onClick={() => setSelected(null)}>Done</button></div></Modal>}
  </>
}
