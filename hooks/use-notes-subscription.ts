'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@/provider/user-provider'

export interface Note {
  title: string
  content: JSON | null
  id: string
  user_id: string
  created_at: string
}

export const useNotesSubscription = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const { user } = useUser()

  useEffect(() => {
    const getNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
      if (error) throw error

      setNotes(data)
      setLoading(false)
    }
    getNotes()
  }, [])

  useEffect(() => {
    supabase
      .channel('user-notes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notes' },
        (payload) => {
          console.log('this is the payload', payload)
          console.log([...notes, payload.new])
          setNotes([...notes, payload.new as Note])
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notes' },
        (payload) => {
          console.log('this is the payload', payload)
          const filteredNotes = notes.filter((note: Note) => note.id !== payload.old.id)
          setNotes(filteredNotes)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notes' },
        (payload) => {
          console.log('this is the payload', payload)
          const mappedNotes = notes.map((note: Note) => {
            if (note.id === payload.new.id) {
              return payload.new
            }
            return note
          })
          setNotes(mappedNotes)
        }
      )
      .subscribe()
  }, [notes, supabase, setNotes])

  return [notes, loading]
}
