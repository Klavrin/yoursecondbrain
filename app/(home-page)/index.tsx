'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/store/user-store'

import Header from '@/components/header'
import Loading from '@/components/loading'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        setUser(data.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Header />
      <div>{user?.id}</div>
    </>
  )
}

export default Home
