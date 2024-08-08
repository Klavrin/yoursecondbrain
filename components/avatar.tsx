import { useUserStore } from '@/store/user-store'
import { Avatar as UserAvatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'
import React from 'react'

interface AvatarProps {
  onOpen: () => void
}

const Avatar: React.FC<AvatarProps> = ({ onOpen }) => {
  const user = useUserStore((state) => state.user)

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <UserAvatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name={user?.user_metadata.name}
          size="sm"
          src={user?.user_metadata.picture}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{user?.user_metadata.name}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="plugins">Plugins</DropdownItem>
        <DropdownItem key="logout" color="danger" closeOnSelect={false} onClick={onOpen}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Avatar
