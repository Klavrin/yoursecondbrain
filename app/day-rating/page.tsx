'use client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Button } from '@nextui-org/button'

const DayRating = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full">
            <h1>How would you rate your day?</h1>
            <div>
              <Button>Horrible</Button>
              <Button>Bad</Button>
              <Button>OK</Button>
              <Button>Good</Button>
              <Button>Amazing</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayRating
