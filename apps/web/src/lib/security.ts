import Cookies from 'js-cookie'

import { TokenDetails } from 'types'

export const storeToken = async (token: string): Promise<void> => {
  Cookies.set('authToken', token, {
    secure: true,
    sameSite: 'Strict',
  })
}

export const getTokenDetails = (): TokenDetails | null => {
  const token = Cookies.get('authToken')

  return token ? JSON.parse(atob(token.split('.')[1] ?? '')) : null
}
