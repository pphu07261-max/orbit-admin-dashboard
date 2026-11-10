import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Pencil, Trash2, Search, Folder } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { DataTable } from '../components/common/DataTable'
import { Modal } from '../components/common/Modal'
import { StatusBadge } from '../components/common/StatusBadge'
import { useAppStore } from '../store/useAppStore'
import type { Category } from '../types'
const empty: Category = { id: '', name: '', description: '', status: 'Active' }
export function Categories() {
  const categories = useAppStore((state) => state.categories)
  const products = useAppStore((state) => state.products)
  const add = useAppStore((state) => state.addCategory)
  const update = useAppStore((state) => state.updateCategory)
  const remove = useAppStore((state) => state.deleteCategory)
  const toast = useAppStore((state) => state.toast)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState<Category>(empty)
  const [error, setError] = useState('')
  const filtered = useMemo(() => categories.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [categories, query])
  const openNew = () => { setForm({ ...empty, id: `CAT-${Date.now().toString().slice(-4)}` }); setEditing(null); setError('') }
  const openEdit = (item: Category) => { setForm({ ...item }); setEditing(item); setError('') }
  const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!form.name.trim()) { setError('Tên danh mục là bắt buộc.'); return } if (editing) { update(form); toast('Đã cập nhật danh mục.') } else { add(form); toast('Đã thêm danh mục.') } setEditing(null); setForm(empty) }
  const columns = [
    { key: 'name', label: 'Category', render: (item: Category) => <div className="category-cell"><div className="category-icon"><Folder size={18} /></div><div><b>{item.name}</b><small>{item.description}</small></div></div> },
    { key: 'count', label: 'Products', render: (item: Category) => <span className="count-pill">{products.filter((product) => product.category === item.name).length} products</span> },
    { key: 'status', label: 'Status', render: (item: Category) => <StatusBadge status={item.status} /> },
    { key: 'actions', label: '', align: 'right' as const, render: (item: Category) => <div className="row-actions"><button className="icon-button" onClick={() => openEdit(item)} aria-label="Sửa danh mục"><Pencil size={16} /></button><button className="icon-button danger-hover" onClick={() => { if (window.confirm(`Xóa danh mục "${item.name}"?`)) { remove(item.id); toast('Đã xóa danh mục.', 'info') } }} aria-label="Xóa danh mục"><Trash2 size={16} /></button></div> },
  ]
  return <><PageHeader title="Categories" description="Organize your catalog into clear product groups." action={<button className="button button-primary" onClick={openNew}><Plus size={17} /> Add category</button>} /><section className="panel table-panel"><div className="toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories..." /></label><span className="muted small-text">{filtered.length} categories</span></div><DataTable columns={columns} rows={filtered} rowKey={(item) => item.id} /></section>
    {(editing !== null || form.id !== '') && <Modal title={editing ? 'Edit category' : 'Add category'} onClose={() => { setEditing(null); setForm(empty) }}><form className="form-stack" onSubmit={save}><label>Category name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Accessories" /></label><label>Description<textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Short description..." /></label><label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as Category['status'] })}><option>Active</option><option>Inactive</option></select></label>{error && <p className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => { setEditing(null); setForm(empty) }}>Cancel</button><button type="submit" className="button button-primary">Save category</button></div></form></Modal>}
  </>
}
