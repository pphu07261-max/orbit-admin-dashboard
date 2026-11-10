interface Props { status: string }
export function StatusBadge({ status }: Props) {
  const tone = status === 'Completed' || status === 'Active' ? 'green' : status === 'Processing' ? 'blue' : status === 'Cancelled' || status === 'Out of stock' || status === 'Inactive' ? 'red' : 'amber'
  return <span className={`status-badge ${tone}`}><i />{status}</span>
}
