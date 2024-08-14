'use client'

import { useUser } from '@/provider/user-provider'
import { redirect } from 'next/navigation'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Button } from '@nextui-org/button'

const Notebook = () => {
  const { user } = useUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full">
            <Button>Create new notebook</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notebook
