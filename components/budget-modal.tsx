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
import { currencies } from '@/constants/currencies'
import { createClient } from '@/utils/supabase/client'
import type { Row } from './budget-table'

interface BudgetModalProps {
  modalOpened: boolean
  setModalOpened: (value: boolean) => void
  setRows: (value: any) => void
  type: 'income' | 'expenses'
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
const supabase = createClient()

const BudgetModal: React.FC<BudgetModalProps> = ({
  modalOpened,
  setModalOpened,
  setRows,
  type
}) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('0.00')
  const [category, setCategory] = useState<Category>(Category.Salary)
  const [currency, setCurrency] = useState<string>('US Dollar')

  const handleCreateNewRow = async () => {
    try {
      if (isEmptyOrWhitespace(name) || isEmptyOrWhitespace(amount)) {
        toast.error('Please enter a name and an amount.')
        return
      }

      const { error, data } = await supabase
        .from('budget')
        .insert({
          name,
          amount,
          category,
          currency: currencies.find((c) => c.name === currency)?.symbol,
          type
        })
        .select('*')

      if (error) throw error
      setRows((rows: Row[]) => [...rows, data[0]])

      setName('')
      setAmount('')
      setCategory(Category.Salary)
      setModalOpened(false)
    } catch (error) {
      console.log('Error creating new row:', error)
    }
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
            <div className="flex gap-1">
              <Input
                type="number"
                value={amount}
                placeholder="0.00"
                label="Amount"
                variant="bordered"
                onChange={(e) => setAmount(e.target.value)}
                className="w-1/2"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
              <Select
                value={currency}
                aria-label="Select a currency"
                variant="bordered"
                label="Currency"
                placeholder="Select a currency"
                className="w-1/2"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <SelectItem key={currency.name}>
                    {currency.name + ' ' + currency.symbol}
                  </SelectItem>
                ))}
              </Select>
            </div>

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
                <SelectItem key={category}>{category}</SelectItem>
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
