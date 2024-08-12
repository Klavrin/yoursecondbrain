'use client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

const Tasks = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="flex flex-col items-center">Tasks</div>
      </div>
    </div>
  )
}

export default Tasks
