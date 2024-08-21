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

interface BudgetTableProps {
  title: string
  // income: any
  // setModalOpened: (value: boolean) => void
}

const BudgetTable: React.FC<BudgetTableProps> = ({ title }) => {
  const [income, setIncome] = useState<any>([])
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div>
      <h2 className="text-lg font-bold text-neutral-400 pl-2 ">{title}</h2>
      <Table aria-label="Budget content">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Category</TableColumn>
        </TableHeader>
        <TableBody>
          {income.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.category}</TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-neutral-100" onClick={() => setModalOpened(true)}>
            <TableCell className="rounded-tl-md rounded-bl-md">+ New</TableCell>
            <TableCell> </TableCell>
            <TableCell className="rounded-tr-md rounded-br-md"> </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <BudgetModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        setIncome={setIncome}
      />
    </div>
  )
}

export default BudgetTable
