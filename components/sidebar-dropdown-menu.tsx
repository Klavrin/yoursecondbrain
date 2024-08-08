import { useUserStore } from '@/store/user-store'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from '@nextui-org/dropdown'
import React, { ReactNode } from 'react'

interface SidebarDropdownMenuProps {
  children: ReactNode
}

const SidebarDropdownMenu: React.FC<SidebarDropdownMenuProps> = ({ children }) => {
  const user = useUserStore((state) => state.user)

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: 'before:bg-default-200', // change arrow background
        content: 'p-0 border-small border-divider bg-background'
      }}
      className="w-72"
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={['profile']}
        className="p-3"
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500'
          ]
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem isReadOnly key="profile" className="h-14 gap-2">
            <div className="flex items-center gap-2">
              <Avatar src={user?.user_metadata.picture} className="w-8 h-8" />
              <div>
                <h5 className="text-small text-neutral-800 font-semibold">
                  {user?.user_metadata.name}
                </h5>
                <p className="text-[12px] text-neutral-500">{user?.email}</p>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SidebarDropdownMenu
