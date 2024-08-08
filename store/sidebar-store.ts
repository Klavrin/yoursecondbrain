import { create } from 'zustand'

interface useSidebarStoreProps {
  sidebarOpened: boolean
  toggleSidebar: () => void
  setSidebarValue: (value: boolean) => void
}

export const useSidebarStore = create<useSidebarStoreProps>((set) => ({
  sidebarOpened: localStorage.getItem('sidebar-opened')
    ? JSON.parse(localStorage.getItem('sidebar-opened') as string)
    : true,
  toggleSidebar: () => {
    set((state) => {
      localStorage.setItem('sidebar-opened', JSON.stringify(!state.sidebarOpened))
      return { sidebarOpened: !state.sidebarOpened }
    })
  },
  setSidebarValue: (value: boolean) => {
    localStorage.setItem('sidebar-opened', JSON.stringify(value))
    set(() => ({ sidebarOpened: value }))
  }
}))
