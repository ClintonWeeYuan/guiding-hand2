import { useQuery } from '@tanstack/react-query'

import BACKEND_API from '@/lib/backendApi'

export const useAuthUserQuery = (token: string) => {
  return useQuery({
    queryKey: ['userData', token],
    queryFn: async () => {
      const res = await BACKEND_API.users.getUser({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.data
    },
  })
}
