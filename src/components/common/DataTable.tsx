import type { ReactNode } from 'react'
interface Column<T> { key: string; label: string; render: (item: T) => ReactNode; align?: 'left' | 'right' }
interface Props<T> { columns: Column<T>[]; rows: T[]; rowKey: (item: T) => string; emptyText?: string }
export function DataTable<T>({ columns, rows, rowKey, emptyText = 'Không có dữ liệu phù hợp.' }: Props<T>) {
  return <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th className={column.align === 'right' ? 'align-right' : ''} key={column.key}>{column.label}</th>)}</tr></thead>
    <tbody>{rows.length ? rows.map((row) => <tr key={rowKey(row)}>{columns.map((column) => <td className={column.align === 'right' ? 'align-right' : ''} key={column.key}>{column.render(row)}</td>)}</tr>) : <tr><td colSpan={columns.length} className="empty-cell">{emptyText}</td></tr>}</tbody>
  </table></div>
}
