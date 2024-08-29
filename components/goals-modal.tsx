import { FormEvent, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal'
import { uuid } from 'uuidv4'
import { PressEvent } from '@react-types/shared'

interface GoalsModalProps {
  modalOpened: boolean
  setModalOpened: (value: boolean) => void
  setBlockItems: (value: any) => void
  index: number
}

const GoalsModal: React.FC<GoalsModalProps> = ({
  modalOpened,
  setModalOpened,
  setBlockItems,
  index
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleAddBlock = (e: FormEvent | PressEvent) => {
    if (e.type === 'submit') {
      e.preventDefault()
    }

    setBlockItems((blockItems: any) => {
      const i = +index
      const newBlockItems = [...blockItems]
      newBlockItems[i].push({ id: uuid(), value: inputValue })
      return newBlockItems
    })
    setInputValue('')
    setModalOpened(false)
  }

  return (
    <Modal isOpen={modalOpened} onOpenChange={() => setModalOpened(false)}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleAddBlock}>
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
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default GoalsModal
