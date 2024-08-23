import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import CloseButton from './close-button'
import GoalDotsIcon from './goal-dots-icon'

interface GoalBlockProps {
  children: React.ReactNode
}

const GoalBlock: React.FC<GoalBlockProps> = ({ children }) => {
  const [showCloseButton, setShowCloseButton] = useState(false)

  return (
    <div
      className="border border-neutral-200 rounded-lg bg-white flex justify-between items-center p-1.5  transition-colors shadow-sm"
      onMouseOver={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      <div className="p-1">{children}</div>
      <div className="flex items-center">
        <GoalDotsIcon className={twMerge(showCloseButton ? 'block' : 'hidden')} />
        <CloseButton className={twMerge(showCloseButton ? 'block' : 'hidden')} />
      </div>
    </div>
  )
}

export default GoalBlock
