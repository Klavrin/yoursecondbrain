'use client'

import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/store/user-store'
import { redirect } from 'next/navigation'
import { IoSearch } from 'react-icons/io5'
import { FaAnglesRight } from 'react-icons/fa6'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Kbd } from '@nextui-org/kbd'
import Avatar from '../../components/avatar'
import UserStreak from '@/components/user-streak'
import { Tooltip } from '@nextui-org/tooltip'
import { useSidebarStore } from '@/store/sidebar-store'

const Header = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const sidebarOpened = useSidebarStore((state) => state.sidebarOpened)
  const setSidebarValue = useSidebarStore((state) => state.setSidebarValue)
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
    <>
      <header className="w-full h-14 flex items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          {!sidebarOpened && (
            <Tooltip showArrow content="Open sidebar" size="sm" placement="bottom-start">
              <Button
                size="sm"
                variant="light"
                className="min-h-[32px] min-w-[38px] ml-auto"
                onClick={() => setSidebarValue(true)}
              >
                <FaAnglesRight size={14} />
              </Button>
            </Tooltip>
          )}

          <Button className="text-normal-800 w-64 flex justify-between bg-neutral-100 border-1">
            <div className="flex gap-1">
              <IoSearch size={20} />
              Quick search...
            </div>
            <Kbd keys={['command']}>K</Kbd>
          </Button>
        </div>

        <div className="flex gap-6">
          <UserStreak days={1} />
          <Avatar onOpen={onOpen} />
        </div>
      </header>

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
    </>
  )
}

export default Header
