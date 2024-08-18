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
import { Card } from '@nextui-org/card'

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

  const handleDeleteNote = async (
    e: React.MouseEvent<HTMLButtonElement>,
    noteId: string
  ) => {
    e.stopPropagation()
    const { error } = await supabase.from('notes').delete().eq('id', noteId)
    if (error) throw error
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

            <div className="flex gap-2">
              {notes.map((note: Note) => (
                <Card key={note.id} className="w-1/3 p-2">
                  <Link href={`/quick-notes/${note.id}`}>
                    <h2 className="text-center mb-4">{note.title}</h2>
                  </Link>
                  <div className="flex gap-1">
                    <Button
                      color="danger"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteNote(e, note.id)
                      }}
                    >
                      Delete
                    </Button>
                    <Button color="primary" className="w-full">
                      Edit title
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notebook
