'use client'

import { useRef, useState } from 'react'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import toast from 'react-hot-toast'
import Editor from '@/components/editor'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

const QuickNotes = () => {
  const [contentLength, setContentLength] = useState(0)
  const selectionBoxRoot = useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center mx-auto mt-4">
          <ScrollShadow ref={selectionBoxRoot} className="w-full h-[calc(100vh-92px)]">
            <Editor contentLength={contentLength} setContentLength={setContentLength} />
          </ScrollShadow>
        </div>
        <div className="h-3">
          <h6 className="text-small w-full text-end">{contentLength}/1000 characters</h6>
        </div>
      </div>
    </div>
  )
}

export default QuickNotes
