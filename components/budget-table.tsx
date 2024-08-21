import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table'
import BudgetModal from './budget-modal'
import { useState } from 'react'
import CloseButton from './close-button'

interface BudgetTableProps {
  title: string
  // income: any
  // setModalOpened: (value: boolean) => void
}

const BudgetTable: React.FC<BudgetTableProps> = ({ title }) => {
  const [rows, setRows] = useState<any>([])
  const [modalOpened, setModalOpened] = useState(false)

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
                <CloseButton />
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
        setRows={setRows}
      />
    </div>
  )
}

export default BudgetTable
