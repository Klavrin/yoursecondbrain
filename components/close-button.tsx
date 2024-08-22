import { twMerge } from 'tailwind-merge'

interface CloseButtonProps {
  onClick?: () => void
  className?: string
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      role="button"
      aria-label="Close"
      className={twMerge(
        'appearance-none select-none top-1 right-1 rtl:left-1 rtl:right-[unset] p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2',
        className
      )}
      type="button"
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  )
}

export default CloseButton
