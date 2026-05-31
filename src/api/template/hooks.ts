import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/core/queryKeys'
import { queryClient } from '@/lib/react-query'
import {
  type CreateExampleParams,
  type ExampleListParams,
  createExampleApi,
  getExampleDetailApi,
  getExampleListApi
} from './module'

export function useExampleList(params: ExampleListParams = {}) {
  return useQuery({
    queryKey: queryKeys.template.list(params),
    queryFn: () => getExampleListApi(params)
  })
}

export function useExampleDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.template.detail(id),
    queryFn: () => getExampleDetailApi({ id }),
    enabled: enabled && !!id
  })
}

export function useCreateExample() {
  return useMutation({
    mutationFn: (params: CreateExampleParams) => createExampleApi(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.template.all })
    }
  })
}
