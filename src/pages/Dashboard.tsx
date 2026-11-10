import { ArrowDownRight, ArrowUpRight, CreditCard, Package, ShoppingBag, Users } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '../components/common/PageHeader'
import { RevenueChart } from '../components/dashboard/RevenueChart'
import { DataTable } from '../components/common/DataTable'
import { StatusBadge } from '../components/common/StatusBadge'
import { orders, revenueByPeriod, topProducts } from '../data/mockData'
import { useAppStore } from '../store/useAppStore'
import type { Order } from '../types'
type Period = keyof typeof revenueByPeriod
const currency = (value: number) => `$${value.toLocaleString('en-US')}`
export function Dashboard() {
  const [period, setPeriod] = useState<Period>('30d')
  const productCount = useAppStore((state) => state.products.length)
  const stats = [
    { label: 'Total revenue', value: '$48,294', change: '+12.8%', positive: true, icon: CreditCard, note: 'vs. previous period' },
    { label: 'Total orders', value: '1,482', change: '+8.2%', positive: true, icon: ShoppingBag, note: 'vs. previous period' },
    { label: 'Total customers', value: '8,549', change: '+5.4%', positive: true, icon: Users, note: 'vs. previous period' },
    { label: 'Total products', value: String(productCount), change: '+2.1%', positive: true, icon: Package, note: 'in your catalog' },
  ]
  const columns = [
    { key: 'id', label: 'Order ID', render: (item: Order) => <b className="table-strong">{item.id}</b> },
    { key: 'customer', label: 'Customer', render: (item: Order) => <div className="customer-cell"><span className="mini-avatar">{item.customer.split(' ').map((part) => part[0]).join('')}</span><span>{item.customer}</span></div> },
    { key: 'date', label: 'Date', render: (item: Order) => <span className="muted">{item.date}</span> },
    { key: 'status', label: 'Status', render: (item: Order) => <StatusBadge status={item.status} /> },
    { key: 'total', label: 'Amount', align: 'right' as const, render: (item: Order) => <b>{currency(item.total)}</b> },
  ]
  return <><PageHeader title="Dashboard" description="Here's what's happening with your store today." action={<button className="button button-secondary" onClick={() => window.print()}>Download report</button>} />
    <div className="stats-grid">{stats.map((stat) => <div className="stat-card" key={stat.label}><div className="stat-top"><span>{stat.label}</span><div className="stat-icon"><stat.icon size={18} /></div></div><div className="stat-value">{stat.value}</div><div className="stat-foot"><span className="trend positive"><ArrowUpRight size={14} />{stat.change}</span><span>{stat.note}</span></div></div>)}</div>
    <section className="panel chart-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track your store performance over time</p></div><select className="select-control period-select" value={period} onChange={(event) => setPeriod(event.target.value as Period)}><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="3m">Last 3 months</option><option value="12m">Last 12 months</option></select></div><div className="chart-summary"><strong>$48,294.00</strong><span className="trend positive"><ArrowUpRight size={15} /> 12.8%</span><small> compared to previous period</small></div><RevenueChart data={revenueByPeriod[period]} /></section>
    <div className="dashboard-lower"><section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent orders</h2><p>You have {orders.length} recent orders</p></div><a className="text-link" href="/orders">View all</a></div><DataTable columns={columns} rows={orders.slice(0, 5)} rowKey={(item) => item.id} /></section>
      <section className="panel top-products-panel"><div className="panel-heading"><div><h2>Top products</h2><p>Best performing products</p></div><a className="text-link" href="/products">View all</a></div><div className="top-products-list">{topProducts.map((product, index) => <div className="top-product" key={product.name}><div className={`product-thumb thumb-${index}`}>{product.initials}</div><div className="top-product-info"><b>{product.name}</b><small>{product.category} · {product.sold} sold</small></div><strong>{currency(product.revenue)}</strong></div>)}</div><div className="top-products-note"><ArrowDownRight size={15} /> Product performance is based on mock sales data.</div></section></div>
  </>
}
