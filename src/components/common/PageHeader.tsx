import type { ReactNode } from 'react'
interface Props { title: string; description: string; action?: ReactNode }
export function PageHeader({ title, description, action }: Props) {
  return <div className="page-header"><div><h1>{title}</h1><p>{description}</p></div>{action && <div className="page-action">{action}</div>}</div>
}
