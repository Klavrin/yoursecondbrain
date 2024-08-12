'use client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Button } from '@nextui-org/button'
import { Checkbox } from '@nextui-org/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table'

const Tasks = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="flex flex-col items-center">
          <div className="w-full px-2 max-w-[1028px] mx-auto mt-4">
            <Button className="w-full mb-4" color="primary">
              Add new task
            </Button>

            <Table aria-label="Tasks table">
              <TableHeader>
                <TableColumn>CHECKBOX</TableColumn>
                <TableColumn>TASK</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>This is the content of the task</TableCell>
                  <TableCell>12.08.2024</TableCell>
                  <TableCell>Doing</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
