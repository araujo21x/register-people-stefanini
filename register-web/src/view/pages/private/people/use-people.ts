import { useState } from "react"
import { usePeople as usePeopleService, type PeopleListResponse } from "../../../../app/services/people.service"

interface UsePeopleReturn {
  data: PeopleListResponse;
  isLoading: boolean;
  page: number;
  handleSetPage: (newPage: number) => void;
}

export function usePeople(): UsePeopleReturn {
  const [page, setPage] = useState(1)
  const LIMIT = 15

  const { data, isLoading } = usePeopleService(page, LIMIT)

  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  return { data: data || { people: [], count: 0 }, isLoading, page, handleSetPage }
}