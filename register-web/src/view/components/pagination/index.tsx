import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/shadcn/components/ui/pagination"
import { useDefaultPagination, type GenericPaginationProps } from "./use-default-pagination"




export function DefaultPagination({
  page,
  totalItens,
  itensPerPage = 15,
  onPageChange,
  showEllipsis = true,
  className,
}: GenericPaginationProps) {
  const { getPageNumbers, getTotalPages } = useDefaultPagination()
  if (totalItens <= 1) return null

  const totalPages = getTotalPages(totalItens, itensPerPage)
  const pageNumbers = getPageNumbers(page, totalPages)

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 1}
            onClick={e => {
              e.preventDefault()
              if (page > 1) onPageChange(page - 1)
            }}
          />
        </PaginationItem>
        {pageNumbers.map((p, idx) =>
          p === "ellipsis" && showEllipsis ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : typeof p === "number" ? (
            <PaginationItem key={p}>
              <PaginationLink

                isActive={p === page}
                onClick={e => {
                  e.preventDefault()
                  if (p !== page) onPageChange(p)
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : null
        )}
        <PaginationItem>
          <PaginationNext
            aria-disabled={page === totalPages}
            onClick={e => {
              e.preventDefault()
              if (page < totalPages) onPageChange(page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

