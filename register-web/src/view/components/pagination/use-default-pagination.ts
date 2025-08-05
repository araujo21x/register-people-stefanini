export interface GenericPaginationProps {
  page: number
  totalItens: number
  itensPerPage?: number
  onPageChange: (page: number) => void
  showEllipsis?: boolean
  className?: string
}


export function useDefaultPagination() {


  return { getPageNumbers, getTotalPages }
}

function getTotalPages(totalItens: number, itensPerPage: number) {
  return Math.ceil(totalItens / itensPerPage)
}

function getPageNumbers(current: number, total: number, maxVisible = 5) {
  const pages: (number | "ellipsis")[] = []
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  const left = Math.max(1, current - 1)
  const right = Math.min(total, current + 1)

  if (left > 2) {
    pages.push(1, "ellipsis")
  } else {
    for (let i = 1; i < left; i++) pages.push(i)
  }

  for (let i = left; i <= right; i++) pages.push(i)

  if (right < total - 1) {
    pages.push("ellipsis", total)
  } else {
    for (let i = right + 1; i <= total; i++) pages.push(i)
  }

  return pages
}

