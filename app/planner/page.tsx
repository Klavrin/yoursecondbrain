'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Loading from '@/components/loading'

const Planner = () => {
  const [loading, setLaoading] = useState(true)

  useEffect(() => {
    setLaoading(false)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full">hello planner</div>
        </div>
      </div>
    </div>
  )
}

export default Planner
