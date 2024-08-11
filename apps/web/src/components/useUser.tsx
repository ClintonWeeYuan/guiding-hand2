import Cookies from 'js-cookie'

import { useAuthUserQuery } from '@/hooks/user/useAuthUserQuery'

const useUser = () => {
  const cookies = Cookies.get()
  const token = cookies?.authToken
  const { data: user, isLoading: loading } = useAuthUserQuery(token)

  return { user, token, loading }
}

export default useUser
