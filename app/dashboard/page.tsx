'use client'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

import { Card } from '@nextui-org/card'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full grid grid-cols-4 grid-rows-2 gap-2">
            <Card className="col-span-2 row-span-2 p-4">
              <h2 className="text-5xl font-bold text-neutral-800">0%</h2>
              <p className="text-base text-neutral-400">Habit completion rate</p>
            </Card>
            <Card className="col-span-2 p-4">
              <h2 className="text-5xl font-bold text-neutral-800">$0</h2>
              <p className="text-base text-neutral-400">Total earned</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-5xl font-bold text-neutral-800">0</h2>
              <p className="text-base text-neutral-400">Tasks due today</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-5xl font-bold text-neutral-800">0</h2>
              <p className="text-base text-neutral-400">Goals achieved</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
