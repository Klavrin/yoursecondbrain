'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/store/user-store'

import Header from '@/components/header'

const Home = () => {
  const supabase = createClient()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) setUser(data.user)
    }
    getUser()
  }, [])

  return (
    <>
      <Header />
      <div>{user?.id}</div>
    </>
  )
}

export default Home
