'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/store/user-store'

import Header from '@/app/(home-page)/header'
import Loading from '@/components/loading'
import Sidebar from '@/components/sidebar'

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
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="flex justify-center">
          <h3 className="text-2xl pt-5 font-bold">Hello, {user?.user_metadata.name}</h3>
        </div>
      </div>
    </div>
  )
}

export default Home
