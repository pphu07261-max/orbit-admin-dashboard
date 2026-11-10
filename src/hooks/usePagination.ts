import { useMemo, useState } from 'react'
export function usePagination<T>(items: T[], pageSize = 6) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = useMemo(() => items.slice((currentPage - 1) * pageSize, currentPage * pageSize), [items, currentPage, pageSize])
  return { pageItems, page: currentPage, pageCount, setPage, total: items.length }
}
