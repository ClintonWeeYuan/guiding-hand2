import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenDetails } from '@/lib/security'

export const useTokenCheck = (redirectURL?: string) => {
  const tokenDetails = getTokenDetails()
  const navigate = useNavigate()

  useEffect(() => {
    const time = tokenDetails?.exp
    if (tokenDetails && time && time > Math.ceil(Date.now() / 1000)) {
      const url = redirectURL ? redirectURL : 'home'
      navigate(`/${url}`)
    }
  }, [navigate, redirectURL, tokenDetails])
}
