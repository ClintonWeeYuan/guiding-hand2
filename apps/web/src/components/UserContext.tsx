import React, { createContext, useContext, useEffect, useState } from 'react'

import BACKEND_API from '@/backend'
import { UserInformation } from '@/backend/backendApi'

interface UserContextValue {
  userId: number | null
  isLoading: boolean
  logIn: (email: string, password: string) => Promise<void>
  user: UserInformation | undefined
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const userIdLocal = localStorage.getItem('userId')

      return userIdLocal ? Number(userIdLocal) : null
    }
    return null
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<UserInformation>()

  const logIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await BACKEND_API.users.loginUser({ email, password })
      setUserId(response.data.userId)
    } catch (error) {
      //TODO: display error messages with toasts
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const response = await BACKEND_API.users.getUser()
      setUser(response.data)
    } catch (error) {
      // TODO
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userIdLocal = localStorage.getItem('userId')
      if (userIdLocal) {
        fetchUser()
      } else {
        setIsLoading(false)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ userId, logIn, isLoading, user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
