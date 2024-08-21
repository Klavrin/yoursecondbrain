'use client'

import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Select, SelectItem } from '@nextui-org/select'
import { isEmptyOrWhitespace } from '@/utils/is-empty-or-whitespace'
import toast from 'react-hot-toast'
import { removeWhitespace } from '@/utils/remove-whitespace'

interface BudgetModalProps {
  modalOpened: boolean
  setModalOpened: (value: boolean) => void
  setIncome: (value: any) => void
}

enum Category {
  Salary = 'Salary',
  Gift = 'Gift',
  Teaching = 'Teaching',
  Gigs = 'Gigs',
  Parents = 'Parents',
  OnlineSales = 'Online Sales',
  Other = 'Other'
}

const categories = Array.from(Object.values(Category))

const BudgetModal: React.FC<BudgetModalProps> = ({
  modalOpened,
  setModalOpened,
  setIncome
}) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('0.00')
  const [category, setCategory] = useState<Category>(Category.Salary)

  const handleCreateNewRow = () => {
    if (isEmptyOrWhitespace(name) || isEmptyOrWhitespace(amount)) {
      toast.error('Please enter a name and an amount.')
      return
    }

    setIncome((rows: { name: string; amount: number; category: Category }[]) => [
      ...rows,
      { name, amount, category }
    ])

    console.log([name, amount, category])
    setName('')
    setAmount('')
    setCategory(Category.Salary)
    setModalOpened(false)
  }

  return (
    <Modal isOpen={modalOpened} onOpenChange={() => setModalOpened(false)}>
      <ModalContent>
        <>
          <ModalHeader>New row</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              value={name}
              label="Name"
              placeholder="Enter the name"
              variant="bordered"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              value={amount}
              placeholder="0.00"
              label="Amount"
              variant="bordered"
              onChange={(e) => setAmount(e.target.value)}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />

            <Select
              value={category}
              aria-label="Select a categoty"
              label="Select a categoty"
              onChange={(e) =>
                setCategory(
                  Category[removeWhitespace(e.target.value) as keyof typeof Category]
                )
              }
            >
              {categories.map((category) => (
                <SelectItem key={category} value={'this is a value'}>
                  {category}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="flat" onClick={() => setModalOpened(false)}>
              Close
            </Button>
            <Button color="primary" onClick={handleCreateNewRow}>
              OK
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}

export default BudgetModal
