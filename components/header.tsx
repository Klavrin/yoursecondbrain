'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'

import { useUserStore } from '@/store/user-store'
import { redirect } from 'next/navigation'

const Header = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!user) {
    redirect('/log-in')
  }

  return (
    <header className="w-full h-12 flex items-center px-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
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
          <DropdownItem
            key="logout"
            color="danger"
            closeOnSelect={false}
            onClick={onOpen}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled
      >
        <ModalContent>
          <ModalHeader>Are you sure you want to log out?</ModalHeader>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              No
            </Button>
            <Button color="primary" onPress={handleSignOut}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </header>
  )
}

export default Header
