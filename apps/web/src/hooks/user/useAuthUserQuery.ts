import { useQuery } from '@tanstack/react-query'

import BACKEND_API from '@/backend'

export const useAuthUserQuery = (token: string) => {
  return useQuery({
    queryKey: ['userData'],
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
