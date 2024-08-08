'use client'

import { createClient } from '@/utils/supabase/client'
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
import Avatar from '../../components/avatar'

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
    <>
      <header className="w-full h-12 flex items-center px-4">
        <Avatar onOpen={onOpen} />
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
