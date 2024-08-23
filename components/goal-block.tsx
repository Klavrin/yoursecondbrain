import { useState } from 'react'
import CloseButton from './close-button'
import { twMerge } from 'tailwind-merge'

interface GoalBlockProps {
  children: React.ReactNode
}

const GoalDotsIcon = ({ className }: { className?: string }) => {
  return (
    <button className="p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={twMerge('bi bi-three-dots-vertical ', className)}
        viewBox="0 0 16 16"
      >
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      </svg>
    </button>
  )
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
