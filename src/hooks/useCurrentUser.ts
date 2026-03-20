import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/core/queryKeys'
import { getCurrentUserApi } from '@/api/endpoints/user'

export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: queryKeys.user.current(),
    queryFn: () => getCurrentUserApi(),
    enabled
  })
}
