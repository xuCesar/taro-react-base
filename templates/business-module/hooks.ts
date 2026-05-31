import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/core/queryKeys'
import { queryClient } from '@/lib/react-query'
import {
  type Create__PascalModule__Params,
  type __PascalModule__ListParams,
  create__PascalModule__Api,
  get__PascalModule__DetailApi,
  get__PascalModule__ListApi
} from '@/api/endpoints/__camelModule__'

export function use__PascalModule__List(params: __PascalModule__ListParams = {}) {
  return useQuery({
    queryKey: queryKeys.__camelModule__.list(params),
    queryFn: () => get__PascalModule__ListApi(params)
  })
}

export function use__PascalModule__Detail(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.__camelModule__.detail(id),
    queryFn: () => get__PascalModule__DetailApi({ id }),
    enabled: enabled && !!id
  })
}

export function useCreate__PascalModule__() {
  return useMutation({
    mutationFn: (params: Create__PascalModule__Params) => create__PascalModule__Api(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.__camelModule__.all })
    }
  })
}
