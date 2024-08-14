'use client'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import StarterKit from '@yoopta/starter-kit'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { useRef, useState } from 'react'

const QuickNotes = () => {
  const [value, setValue] = useState<any>()
  const selectionBoxRoot = useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center mx-auto mt-4">
          <ScrollShadow ref={selectionBoxRoot} className="w-full h-[calc(100vh-72px)]">
            <StarterKit
              value={value}
              onChange={(data) => setValue(data)}
              selectionBoxRoot={selectionBoxRoot}
              style={{ width: 650 }}
              placeholder="Start typing here..."
              className="mx-auto"
            />
          </ScrollShadow>
        </div>
      </div>
    </div>
  )
}

export default QuickNotes
