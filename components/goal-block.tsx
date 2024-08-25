import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import CloseButton from './close-button'
import GoalDotsIcon from './goal-dots-icon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface GoalBlockProps {
  children: React.ReactNode
  id: string
}

const GoalBlock: React.FC<GoalBlockProps> = ({ children, id }) => {
  const [showButtons, setShowButtons] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      className="border border-neutral-200 rounded-lg bg-white flex justify-between items-center p-1.5  transition-colors shadow-sm"
      onMouseOver={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="p-1">{children}</div>
      <div className="flex items-center">
        <GoalDotsIcon className={twMerge(showButtons ? 'block' : 'hidden')} />
        <CloseButton className={twMerge(showButtons ? 'block' : 'hidden')} />
      </div>
    </div>
  )
}

export default GoalBlock
