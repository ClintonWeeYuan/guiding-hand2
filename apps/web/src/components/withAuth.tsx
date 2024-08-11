import jwtDecode from 'jwt-decode'
import { ElementType, ReactNode, useEffect, useState } from 'react'
import { replace } from 'react-router-dom'

interface DecodedToken {
  exp: number
}

const withAuth = (WrappedComponent: ElementType) => {
  // eslint-disable-next-line react/display-name
  return (props: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    // const { toast } = useToast()

    useEffect(() => {
      // Next.js server side code will not run this useEffect hook
      const storedToken =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null

      if (storedToken) {
        try {
          const decodedToken: DecodedToken = jwtDecode(storedToken)
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token has expired
            // toast({
            //   title: 'Error',
            //   description: 'Session expired. Please login.',
            //   variant: 'destructive',
            //   duration: 1000,
            // })
            replace('/login')
            return
          }

          setToken(storedToken)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // Token is invalid
          // toast({
          //   title: 'Error',
          //   description: 'Invalid token. Please login.',
          //   variant: 'destructive',
          //   duration: 1000,
          // })
          replace('/login')
        }
      } else {
        replace('/login')
      }
    }, [])

    // token can be undefined when running server side. The component will be rerendered with token != null on the client side
    return token && <WrappedComponent {...props} />
  }
}

export default withAuth
