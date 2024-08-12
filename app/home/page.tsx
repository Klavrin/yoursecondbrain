'use client'

import Link from 'next/link'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

const Home = () => {
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
