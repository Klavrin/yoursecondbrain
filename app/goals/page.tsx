'use client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { twMerge } from 'tailwind-merge'

const data = [
  {
    title: 'To do',
    color: 'bg-orange-50',
    titleContainerColor: 'bg-orange-100',
    circleColor: 'bg-orange-300',
    titleColor: 'text-orange-500'
  },
  {
    title: 'In progress',
    color: 'bg-blue-50',
    titleContainerColor: 'bg-blue-100',
    circleColor: 'bg-blue-300',
    titleColor: 'text-blue-500'
  },
  {
    title: 'Done',
    color: 'bg-green-50',
    titleContainerColor: 'bg-green-100',
    circleColor: 'bg-green-300',
    titleColor: 'text-green-500'
  }
]

const Goals = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions goalsFeedOptions />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full grid grid-cols-3 gap-2">
            {data.map((item) => (
              <div className={twMerge('p-2', item.color)}>
                <div
                  className={twMerge(
                    'flex items-center gap-1 px-2  rounded-xl w-min',
                    item.titleContainerColor
                  )}
                >
                  <div className={twMerge('w-2 h-2 rounded-full', item.circleColor)} />
                  <h2 className={twMerge('whitespace-nowrap', item.titleColor)}>
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goals
