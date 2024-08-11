import { useMutation } from '@tanstack/react-query'

import BACKEND_API from '@/lib/backendApi'
import { UserLoginParams } from 'types'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async ({ email, password }: UserLoginParams) =>
      (
        await BACKEND_API.users.loginUser({
          email,
          password,
        })
      ).data,
  })
