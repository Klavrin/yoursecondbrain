import { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import NestedList from '@editorjs/nested-list'
//@ts-ignore
import Checklist from '@editorjs/checklist' // misses types
//@ts-ignore
import Table from '@editorjs/table' // misses types
import toast from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

interface EditorProps {
  contentLength: number
  setContentLength: (contentLen: number) => void
  note: any
}

const supabase = createClient()

const Editor: React.FC<EditorProps> = ({ contentLength, setContentLength, note }) => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = (e.clipboardData || window.clipboardData).getData('text')
      if (contentLength + pastedData.length > 1000) {
        toast.error(
          'Note not saved. Quick notes are limited to 1000 characters. Try pasting less than 1000 characters.'
        )
      }
    }
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [])

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (contentLength >= 1000 && e.key !== 'Backspace') {
        e.preventDefault()
        toast.error('Quick notes are limited to 1000 characters')
      }
    }

    document.addEventListener('keydown', keyDown)
    return () => document.removeEventListener('keydown', keyDown)
  }, [contentLength])

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        data: JSON.parse(note.content),
        tools: {
          paragraph: Paragraph,
          header: Header,
          checklist: Checklist,
          nestedList: NestedList,
          table: Table
        },
        placeholder: 'Type here to write...',
        onChange: async (api) => {
          const editorContent = await api.saver.save()

          const getNumberOfChars = (content: any) => {
            let contentLen = 0

            const countItems = (
              items: any,
              type: 'nestedList' | 'checklist' | 'table' = 'nestedList',
              itemsLen: number = 0
            ) => {
              items.forEach((item: any) => {
                if (type === 'nestedList') {
                  itemsLen += item.content.length
                  if (item.items.length > 0) {
                    itemsLen = countItems(item.items, 'nestedList', itemsLen)
                  }
                } else if (type === 'checklist') {
                  itemsLen += item.text.length
                } else {
                  item.forEach((i: string) => (itemsLen += i.length))
                }
              })

              return itemsLen
            }

            content.blocks.forEach((block: any) => {
              if (block.type === 'nestedList') {
                contentLen += countItems(block.data.items)
              } else if (block.type === 'paragraph' || block.type === 'header') {
                contentLen += block.data.text.length
              } else if (block.type === 'checklist') {
                contentLen += countItems(block.data.items, 'checklist')
              } else if (block.type === 'table') {
                contentLen = countItems(block.data.content, 'table', contentLen)
              }
            })

            if (contentLen > 1000) return 1000
            return contentLen
          }

          setContentLength(getNumberOfChars(editorContent))
          const { error } = await supabase
            .from('notes')
            .update({ content: JSON.stringify(editorContent) })
            .eq('id', note.id)

          if (error) throw error
        }
      })
      editorRef.current = editor
    }
  }, [setContentLength])

  return <div id="editorjs" />
}

export default Editor
