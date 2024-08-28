import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Draggable } from 'react-beautiful-dnd'

import CloseButton from './close-button'
import GoalDotsIcon from './goal-dots-icon'

interface GoalBlockProps {
  children: React.ReactNode
  id: string
  index: number
}

const GoalBlock: React.FC<GoalBlockProps> = ({ children, id, index }) => {
  const [showButtons, setShowButtons] = useState(false)

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          className="border border-neutral-200 rounded-lg bg-white flex justify-between items-center p-1.5  transition-colors shadow-sm hover:z-50 hover:cursor-grab active:cursor-grabbing"
          onMouseOver={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="p-1">{children}</div>
          <div className="flex items-center">
            <GoalDotsIcon className={twMerge(showButtons ? 'block' : 'hidden')} />
            <CloseButton className={twMerge(showButtons ? 'block' : 'hidden')} />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default GoalBlock
