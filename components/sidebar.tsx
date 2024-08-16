import { useSidebarStore } from '@/store/sidebar-store'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Tooltip } from '@nextui-org/tooltip'
import { FaAnglesLeft } from 'react-icons/fa6'
import SidebarDropdownMenu from './sidebar-dropdown-menu'
import { ReactNode, useEffect } from 'react'
import { useUser } from '@/provider/user-provider'
import Link from 'next/link'

import {
  IoBarChart,
  IoCalendar,
  IoCheckbox,
  IoCloudSharp,
  IoDocumentText,
  IoExtensionPuzzle,
  IoGolf,
  IoHome,
  IoLogoEuro,
  IoSettingsSharp,
  IoToday
} from 'react-icons/io5'
import { usePathname } from 'next/navigation'

const sidebarButtons: {
  icon: ReactNode
  label: string
  tooltip: string
  href: string
}[] = [
  {
    icon: <IoSettingsSharp />,
    label: 'Settings',
    tooltip: 'Manage your account and settings',
    href: '/settings'
  },
  {
    icon: <IoHome />,
    label: 'Home',
    tooltip: 'See what your friends are doing',
    href: '/home'
  },
  {
    icon: <IoBarChart />,
    label: 'Dashboard',
    tooltip: 'A centralized place to manage your productivity',
    href: '/dashboard'
  },
  {
    icon: <IoCloudSharp />,
    label: 'Day Rating',
    tooltip: 'Rate your days',
    href: '/day-rating'
  },
  {
    icon: <IoCheckbox />,
    label: 'Tasks',
    tooltip: 'Schedule tasks that you need to complete',
    href: '/tasks'
  },
  {
    icon: <IoDocumentText />,
    label: 'Quick Notes',
    tooltip: 'Write quick notes that you need to remember',
    href: '/quick-notes'
  },
  {
    icon: <IoToday />,
    label: 'Planner',
    tooltip: 'Plan your days and keep track of your progress',
    href: '/planner'
  },
  {
    icon: <IoLogoEuro />,
    label: 'Budget',
    tooltip: 'Keep track of your budget and expenses',
    href: '/budget'
  },
  {
    icon: <IoGolf />,
    label: 'Goals',
    tooltip: 'Set your goals and track your progress',
    href: '/goals'
  },
  {
    icon: <IoExtensionPuzzle />,
    label: 'Habit Tracker',
    tooltip: 'Track your habits and stay motivated',
    href: '/habit-tracker'
  },
  {
    icon: <IoCalendar />,
    label: 'Weekly Plan',
    tooltip: 'Plan your week ahead',
    href: '/weekly-plan'
  }
]

const Sidebar = () => {
  const { user } = useUser()
  const sidebarOpened = useSidebarStore((state) => state.sidebarOpened)
  const setSidebarValue = useSidebarStore((state) => state.setSidebarValue)
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar)
  const pathname = usePathname()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div
      className="min-w-64 max-w-64 h-screen bg-neutral-100 border-r-1 px-3"
      style={{ display: sidebarOpened ? 'block' : 'none' }}
    >
      <div className="h-14 flex items-center">
        <SidebarDropdownMenu>
          <div
            className="w-full p-2 rounded-lg hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-150 flex items-center gap-2 h-[40px] cursor-default"
            onClick={() => console.log('show popover')}
          >
            <Avatar src={user?.user_metadata.picture} className="w-8 h-8" />
            <div>
              <h5 className="text-small text-neutral-800 font-semibold">
                {user?.user_metadata.name}
              </h5>
              <p className="text-[12px] text-neutral-500">Premium</p>
            </div>

            <Tooltip
              showArrow
              content="Close sidebar"
              size="sm"
              delay={400}
              closeDelay={150}
            >
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
        </SidebarDropdownMenu>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {sidebarButtons.map((button) => (
          <Tooltip
            key={button.label}
            content={button.tooltip}
            delay={400}
            closeDelay={0}
            placement="right"
            showArrow
          >
            <Button
              as={Link}
              href={button.href ?? '#'}
              size="sm"
              variant="light"
              className={`w-full justify-start text-small text-neutral-600 font-bold ${
                pathname === button.href ? 'bg-neutral-200' : ''
              }`}
            >
              {button.icon}
              {button.label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
