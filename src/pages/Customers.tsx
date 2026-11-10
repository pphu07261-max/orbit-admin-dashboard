import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { DataTable } from '../components/common/DataTable'
import { Pagination } from '../components/common/Pagination'
import { usePagination } from '../hooks/usePagination'
import { customers } from '../data/mockData'
import type { Customer } from '../types'
export function Customers() {
  const [query, setQuery] = useState('')
  const [minimum, setMinimum] = useState('All')
  const filtered = useMemo(() => customers.filter((item) => `${item.name} ${item.email} ${item.location}`.toLowerCase().includes(query.toLowerCase()) && (minimum === 'All' || (minimum === '5+' ? item.orders >= 5 : item.orders >= 10))), [query, minimum])
  const pagination = usePagination(filtered, 5)
  const columns = [
    { key: 'customer', label: 'Customer', render: (item: Customer) => <div className="customer-cell"><span className="mini-avatar">{item.name.split(' ').map((part) => part[0]).join('')}</span><div><b>{item.name}</b><small>{item.email}</small></div></div> },
    { key: 'location', label: 'Location', render: (item: Customer) => item.location },
    { key: 'orders', label: 'Orders', render: (item: Customer) => <b>{item.orders}</b> },
    { key: 'spent', label: 'Total spent', render: (item: Customer) => <b>${item.spent.toLocaleString('en-US')}</b> },
    { key: 'joined', label: 'Joined', render: (item: Customer) => item.joined },
  ]
  return <><PageHeader title="Customers" description="Understand your customers and their purchase activity." /><section className="panel table-panel"><div className="toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); pagination.setPage(1) }} placeholder="Search customers..." /></label><select className="select-control" value={minimum} onChange={(event) => setMinimum(event.target.value)}><option value="All">All customers</option><option value="5+">5+ orders</option><option value="10+">10+ orders</option></select></div><DataTable columns={columns} rows={pagination.pageItems} rowKey={(item) => item.id} /><Pagination page={pagination.page} pageCount={pagination.pageCount} total={pagination.total} pageSize={5} onChange={pagination.setPage} /></section></>
}
