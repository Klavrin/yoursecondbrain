import { useState } from 'react'
import CloseButton from './close-button'
import { twMerge } from 'tailwind-merge'

interface GoalBlockProps {
  children: React.ReactNode
}
const GoalBlock: React.FC<GoalBlockProps> = ({ children }) => {
  const [showCloseButton, setShowCloseButton] = useState(false)

  return (
    <div
      className="border border-neutral-200 rounded-lg bg-white flex justify-between items-center p-1.5"
      onMouseOver={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      <div className="p-1">{children}</div>
      <CloseButton className={twMerge(showCloseButton ? 'block' : 'hidden')} />
    </div>
  )
}

export default GoalBlock
