import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { DataTable } from '../components/common/DataTable'
import { Pagination } from '../components/common/Pagination'
import { Modal } from '../components/common/Modal'
import { StatusBadge } from '../components/common/StatusBadge'
import { useAppStore } from '../store/useAppStore'
import { usePagination } from '../hooks/usePagination'
import type { Product, ProductStatus } from '../types'
const blank: Product = { id: '', name: '', category: 'Home & Living', price: 0, stock: 0, status: 'Active', sku: '' }
export function Products() {
  const products = useAppStore((state) => state.products)
  const categories = useAppStore((state) => state.categories)
  const add = useAppStore((state) => state.addProduct)
  const update = useAppStore((state) => state.updateProduct)
  const remove = useAppStore((state) => state.deleteProduct)
  const toast = useAppStore((state) => state.toast)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('name')
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<Product>(blank)
  const [errors, setErrors] = useState<string[]>([])
  const filtered = useMemo(() => products.filter((item) => `${item.name} ${item.sku} ${item.category}`.toLowerCase().includes(query.toLowerCase()) && (status === 'All' || item.status === status)).sort((a, b) => sort === 'price' ? a.price - b.price : sort === 'stock' ? a.stock - b.stock : a.name.localeCompare(b.name)), [products, query, status, sort])
  const pagination = usePagination(filtered, 6)
  const openCreate = () => { setForm({ ...blank, id: `PR-${Date.now().toString().slice(-5)}` }); setErrors([]); setEditing(null) }
  const openEdit = (item: Product) => { setForm({ ...item }); setErrors([]); setEditing(item) }
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: string[] = []
    if (!form.name.trim()) nextErrors.push('Vui lòng nhập tên sản phẩm.')
    if (!form.sku.trim()) nextErrors.push('Vui lòng nhập SKU.')
    if (form.price <= 0) nextErrors.push('Giá phải lớn hơn 0.')
    if (form.stock < 0) nextErrors.push('Tồn kho không được âm.')
    setErrors(nextErrors)
    if (nextErrors.length) return
    if (editing) { update(form); toast('Đã cập nhật sản phẩm.') } else { add(form); toast('Đã thêm sản phẩm mới.') }
    setEditing(null)
    setForm(blank)
  }
  const columns = [
    { key: 'product', label: 'Product', render: (item: Product) => <div className="product-name-cell"><div className="product-thumb">{item.name.slice(0, 2).toUpperCase()}</div><div><b>{item.name}</b><small>{item.sku}</small></div></div> },
    { key: 'category', label: 'Category', render: (item: Product) => item.category },
    { key: 'price', label: 'Price', render: (item: Product) => <b>${item.price.toFixed(2)}</b> },
    { key: 'stock', label: 'Stock', render: (item: Product) => <span className={item.stock < 10 ? 'stock-low' : ''}>{item.stock} units</span> },
    { key: 'status', label: 'Status', render: (item: Product) => <StatusBadge status={item.status} /> },
    { key: 'actions', label: '', align: 'right' as const, render: (item: Product) => <div className="row-actions"><button className="icon-button" onClick={() => openEdit(item)} aria-label={`Sửa ${item.name}`}><Pencil size={16} /></button><button className="icon-button danger-hover" onClick={() => { if (window.confirm(`Xóa sản phẩm "${item.name}"?`)) { remove(item.id); toast('Đã xóa sản phẩm.', 'info') } }} aria-label={`Xóa ${item.name}`}><Trash2 size={16} /></button></div> },
  ]
  return <><PageHeader title="Products" description="Manage your products, inventory and pricing." action={<button className="button button-primary" onClick={openCreate}><Plus size={17} /> Add product</button>} />
    <section className="panel table-panel"><div className="toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); pagination.setPage(1) }} placeholder="Search products..." /></label><div className="toolbar-filters"><select className="select-control" value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Active</option><option>Draft</option><option>Out of stock</option></select><select className="select-control" value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Sort: Name</option><option value="price">Sort: Price</option><option value="stock">Sort: Stock</option></select></div></div>
      <DataTable columns={columns} rows={pagination.pageItems} rowKey={(item) => item.id} /><Pagination page={pagination.page} pageCount={pagination.pageCount} total={pagination.total} pageSize={6} onChange={pagination.setPage} /></section>
    {(editing !== null || form.id !== '') && <Modal title={editing ? 'Edit product' : 'Add product'} onClose={() => { setEditing(null); setForm(blank) }}><form className="form-stack" onSubmit={save}>
      <label>Product name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Ceramic Vase" /></label>
      <div className="form-grid"><label>SKU<input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} placeholder="HOM-001" /></label><label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></label></div>
      <div className="form-grid"><label>Price ($)<input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} /></label><label>Stock<input type="number" min="0" value={form.stock} onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })} /></label></div>
      <label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ProductStatus })}><option>Active</option><option>Draft</option><option>Out of stock</option></select></label>
      {errors.map((error) => <p className="form-error" key={error}>{error}</p>)}<div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => { setEditing(null); setForm(blank) }}>Cancel</button><button className="button button-primary" type="submit">Save product</button></div>
    </form></Modal>}
  </>
}
