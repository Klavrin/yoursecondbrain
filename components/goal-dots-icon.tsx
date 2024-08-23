import { twMerge } from 'tailwind-merge'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'

const GoalDotsIcon = ({ className }: { className?: string }) => {
  return (
    <Dropdown showArrow>
      <DropdownTrigger>
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
      </DropdownTrigger>
      <DropdownMenu aria-label="Goal Block Actions">
        <DropdownItem key="rename">Rename</DropdownItem>
        <DropdownItem key="add-tag">Add tag</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default GoalDotsIcon
