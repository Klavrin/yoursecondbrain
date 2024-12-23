import { create } from 'zustand'

interface useThemeStoreProps {
  theme: string
  toggleTheme: () => void
}

export const useThemeStore = create<useThemeStoreProps>((set) => ({
  theme: 'light',
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'light' : 'dark' }))
  }
}))
