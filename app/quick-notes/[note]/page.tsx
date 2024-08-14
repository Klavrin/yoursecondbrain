'use client'

import { useRef, useState } from 'react'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import toast from 'react-hot-toast'
import Editor from '@/components/editor'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

const QuickNotes = () => {
  const selectionBoxRoot = useRef<HTMLDivElement | null>(null)

  // const handleStarterKitChange = (data: any) => {
  //   console.log(data)

  //   if (data.length > 1000) {
  //     toast(
  //       'Quick notes cannot exceed 1000 characters. They are called quick notes for a reason!'
  //     )
  //     return
  //   }
  //   setValue(data)
  // }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center mx-auto mt-4">
          <ScrollShadow ref={selectionBoxRoot} className="w-full h-[calc(100vh-92px)]">
            <Editor />
          </ScrollShadow>
        </div>
        <div className="h-3">
          <h6 className="text-small"> words</h6>
        </div>
      </div>
    </div>
  )
}

export default QuickNotes
