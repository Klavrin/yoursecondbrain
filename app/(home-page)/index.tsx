'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/store/user-store'
import Link from 'next/link'

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
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <h1>Everybody is doing their best. So should you.</h1>
            <Link href="/dashboard" className="text-[#006fee] hover:underline" color="">
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
