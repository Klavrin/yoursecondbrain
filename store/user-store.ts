import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'

interface useUserStoreProps {
  user: User | null
  setUser: (newUserObject: User | null) => void
  userSignOut: void
}

const useUserStore = create<useUserStoreProps>((set) => ({
  user: null,
  setUser: (newUserObject: User | null) => set(() => ({ user: newUserObject })),
  userSignOut: set(() => ({ user: null }))
}))
