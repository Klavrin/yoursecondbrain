'use client'

import { createClient } from '@/utils/supabase/client'
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
import { Tabs, Tab } from '@nextui-org/tabs'
import Avatar from './avatar'
import UserStreak from '@/components/user-streak'
import { Tooltip } from '@nextui-org/tooltip'
import { useSidebarStore } from '@/store/sidebar-store'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  withFeedOptions?: boolean
  goalsFeedOptions?: boolean
}

const Header: React.FC<HeaderProps> = ({
  withFeedOptions = true,
  goalsFeedOptions = false
}) => {
  const sidebarOpened = useSidebarStore((state) => state.sidebarOpened)
  const setSidebarValue = useSidebarStore((state) => state.setSidebarValue)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/landing')
  }

  return (
    <>
      <header className="w-full h-14 flex items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          {!sidebarOpened && (
            <Tooltip
              showArrow
              content="Open sidebar"
              size="sm"
              placement="bottom-start"
              delay={400}
              closeDelay={150}
            >
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

          <Button className="text-normal-800 w-64 flex justify-between bg-neutral-100 border-1 text-neutral-500">
            <div className="flex gap-1">
              <IoSearch size={20} />
              Quick search...
            </div>
            <Kbd keys={['command']}>K</Kbd>
          </Button>

          {withFeedOptions && (
            <div className="flex flex-wrap gap-4">
              <Tooltip
                content={!goalsFeedOptions ? 'Feed Options' : 'Goals Tabs'}
                delay={400}
                closeDelay={200}
                showArrow
              >
                {!goalsFeedOptions ? (
                  <Tabs aria-label="Tabs radius">
                    <Tab key="for-you" title="For you" />
                    <Tab key="following" title="Following" />
                  </Tabs>
                ) : (
                  <Tabs aria-label="Tabs radius">
                    <Tab key="status-view" title="Status View" />
                    <Tab key="by-due-date" title="By Due Date" />
                    <Tab key="all-goals" title="All Goals" />
                  </Tabs>
                )}
              </Tooltip>
            </div>
          )}
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
