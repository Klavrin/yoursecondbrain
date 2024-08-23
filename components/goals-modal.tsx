import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal'

interface GoalsModalProps {
  modalOpened: boolean
  setModalOpened: (value: boolean) => void
  setBlocks: (value: any) => void
}

const GoalsModal: React.FC<GoalsModalProps> = ({
  modalOpened,
  setModalOpened,
  setBlocks
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleAddBlock = () => {
    setBlocks((blocks: any) => [...blocks, inputValue])
    setInputValue('')
    setModalOpened(false)
  }

  return (
    <Modal isOpen={modalOpened} onOpenChange={() => setModalOpened(false)}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add a new goal</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Goal title"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleAddBlock}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default GoalsModal
