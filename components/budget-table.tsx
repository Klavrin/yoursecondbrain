import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table'
import BudgetModal from './budget-modal'
import CloseButton from './close-button'
import { useUser } from '@/provider/user-provider'
import { redirect } from 'next/navigation'

interface BudgetTableProps {
  title: string
  type: 'income' | 'expenses'
}

const supabase = createClient()

const BudgetTable: React.FC<BudgetTableProps> = ({ title, type }) => {
  const [rows, setRows] = useState<any>([])
  const [modalOpened, setModalOpened] = useState(false)
  const { user } = useUser()

  if (!user) redirect('/')

  useEffect(() => {
    const getRows = async () => {
      const { data } = await supabase
        .from('budget')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', type)
      setRows(data)
    }
    getRows()
  }, [])

  const handleDeleteRow = async (id: string) => {
    const { error } = await supabase.from('budget').delete().eq('id', id)
    if (error) throw error
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-neutral-400 pl-2 ">{title}</h2>
      <Table aria-label="Budget content">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {row.currency}
                {row.amount}
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell className="flex justify-end p-0">
                <CloseButton onClick={() => handleDeleteRow(row.id)} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-neutral-100" onClick={() => setModalOpened(true)}>
            <TableCell className="rounded-tl-md rounded-bl-md">+ New</TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell className="rounded-tr-md rounded-br-md"> </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <BudgetModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        type={type}
      />
    </div>
  )
}

export default BudgetTable
