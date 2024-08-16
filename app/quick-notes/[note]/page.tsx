'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { createClient } from '@/utils/supabase/client'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Editor from '@/components/editor'
import Loading from '@/components/loading'

const supabase = createClient()

const QuickNotes = ({ params }: { params: { note: string } }) => {
  const [note, setNote] = useState()
  const [contentLength, setContentLength] = useState(0)
  const selectionBoxRoot = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const getNote = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', params.note)

      if (error) {
        // TODO: 404 page
        return
      }
      setNote(data[0])
    }
    getNote()
  }, [params.note])

  if (!note) return <Loading />

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center mx-auto mt-4">
          <ScrollShadow ref={selectionBoxRoot} className="w-full h-[calc(100vh-92px)]">
            <Editor
              contentLength={contentLength}
              setContentLength={setContentLength}
              noteId={note.id}
              note={note}
            />
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
