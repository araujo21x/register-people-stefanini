import { useState } from "react"
import { usePeople as usePeopleService } from "../../../../app/services/people.service"

export function usePeople() {
  const [page, setPage] = useState(1)
  const LIMIT = 15

  const { data, isLoading, error } =  usePeopleService(page, LIMIT)

  return { data, isLoading, error, page, setPage }
}