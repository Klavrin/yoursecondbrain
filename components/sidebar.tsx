import { useSidebarStore } from '@/store/sidebar-store'
import { useUserStore } from '@/store/user-store'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Tooltip } from '@nextui-org/tooltip'
import { FaAnglesLeft } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

const Sidebar = () => {
  const user = useUserStore((state) => state.user)
  const sidebarOpened = useSidebarStore((state) => state.sidebarOpened)
  const setSidebarValue = useSidebarStore((state) => state.setSidebarValue)

  console.log(sidebarOpened)

  return (
    <div
      className="min-w-64 h-screen bg-neutral-100 border-r-1 px-3"
      style={{ display: sidebarOpened ? 'block' : 'none' }}
    >
      <div className="h-14 flex items-center">
        <div className="w-full p-2 rounded-lg hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-150 flex items-center gap-2 h-[40px]">
          <Avatar src={user?.user_metadata.picture} className="w-8 h-8" />
          <div>
            <h5 className="text-small text-neutral-800 font-semibold">
              {user?.user_metadata.name}
            </h5>
            <p className="text-[12px] text-neutral-500">Premium</p>
          </div>
          <Tooltip showArrow content="Close sidebar" size="sm">
            <Button
              size="sm"
              variant="light"
              className="min-h-[32px] min-w-[38px] ml-auto"
              onClick={() => setSidebarValue(false)}
            >
              <FaAnglesLeft size={14} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
