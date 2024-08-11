import { useMutation } from '@tanstack/react-query'

import BACKEND_API from '@/lib/backendApi'
import { UserCreationParams } from 'types'

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      userRole,
    }: UserCreationParams) =>
      (
        await BACKEND_API.users.createUser({
          firstName,
          lastName,
          email,
          password,
          userRole,
        })
      ).data,
  })
