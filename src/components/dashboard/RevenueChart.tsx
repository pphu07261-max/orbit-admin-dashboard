import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
interface Point { name: string; revenue: number }
interface Props { data: Point[] }
const money = (value: number) => `$${value.toLocaleString('en-US')}`
export function RevenueChart({ data }: Props) {
  return <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#635bff" stopOpacity={0.2} /><stop offset="95%" stopColor="#635bff" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid strokeDasharray="4 5" vertical={false} stroke="var(--chart-grid)" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(value: number) => `$${value / 1000}k`} /><Tooltip formatter={(value) => [money(Number(value)), 'Revenue']} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }} /><Area type="monotone" dataKey="revenue" stroke="#635bff" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 5, strokeWidth: 0 }} /></AreaChart></ResponsiveContainer></div>
}
