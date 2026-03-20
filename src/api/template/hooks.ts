import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/core/queryKeys'
import { getExampleListApi, getExampleDetailApi } from './module'

export function useExampleList() {
  return useQuery({
    queryKey: [...queryKeys.auth.all, 'example-list'],
    queryFn: () => getExampleListApi()
  })
}

export function useExampleDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: [...queryKeys.auth.all, 'example-detail', id],
    queryFn: () => getExampleDetailApi({ id }),
    enabled: enabled && !!id
  })
}
