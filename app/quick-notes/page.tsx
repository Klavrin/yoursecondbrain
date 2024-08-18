'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/provider/user-provider'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { isEmptyOrWhitespace } from '@/utils/is-empty-or-whitespace'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useNotesSubscription, type Note } from '@/hooks/use-notes-subscription'

const supabase = createClient()

const Notebook = () => {
  // const [notes, setNotes] = useState<Note[]>([])
  const notes = useNotesSubscription()
  const [noteTitle, setNoteTitle] = useState('')
  const { user } = useUser()

  console.log('notes', notes)

  if (!user) {
    redirect('/')
  }

  const handleCreateNote = async () => {
    if (isEmptyOrWhitespace(noteTitle)) {
      toast.error('Please enter a note title.')
      return
    }

    const { error } = await supabase.from('notes').insert({
      title: noteTitle
    })
    if (error) throw error
    setNoteTitle('')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full">
            <Input
              placeholder="Note title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <Button onClick={handleCreateNote}>Create new note</Button>

            <div>
              {notes.map((note: Note) => (
                <Button as={Link} href={`/quick-notes/${note.id}`} key={note.id}>
                  {note.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notebook
