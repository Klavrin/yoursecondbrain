'use client'

import { createContext, useContext, ReactNode } from 'react'

const UserContext = createContext<any>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ user, children }: { user: any; children: ReactNode }) => {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}
