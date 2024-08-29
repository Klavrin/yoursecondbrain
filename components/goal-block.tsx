import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Draggable } from 'react-beautiful-dnd'
import { GoalBlockItem } from '@/app/goals/page'
import type { setBlockItemsType } from '@/app/goals/page'

import CloseButton from './close-button'
import GoalDotsIcon from './goal-dots-icon'

interface GoalBlockProps {
  children: React.ReactNode
  id: string
  groupIndex: number
  index: number
  setBlockItems: setBlockItemsType
}

const GoalBlock: React.FC<GoalBlockProps> = ({
  children,
  id,
  groupIndex,
  index,
  setBlockItems
}) => {
  const [showButtons, setShowButtons] = useState(false)

  const handleDeleteGoalBlock = () => {
    setBlockItems((blockItems) => {
      const newBlockItems = [...blockItems]
      newBlockItems[groupIndex] = newBlockItems[groupIndex].filter(
        (item: { id: string; value: string }) => item.id !== id
      )
      return newBlockItems
    })
  }

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
            <CloseButton
              className={twMerge(showButtons ? 'block' : 'hidden')}
              onClick={handleDeleteGoalBlock}
            />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default GoalBlock
