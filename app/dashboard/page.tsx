'use client'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center">Dashboard</div>
      </div>
    </div>
  )
}

export default Dashboard
