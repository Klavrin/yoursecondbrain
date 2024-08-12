'use client'

import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

import { Card } from '@nextui-org/card'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table'
import { Checkbox } from '@nextui-org/checkbox'
import { IoCheckbox } from 'react-icons/io5'
import { useUser } from '@/provider/user-provider'
import { redirect } from 'next/navigation'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) redirect('/landing')

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full grid grid-cols-4 grid-rows-2 gap-2">
            <Card className="col-span-2 row-span-2 p-4">
              <h2 className="text-5xl font-bold text-neutral-800">0%</h2>
              <p className="text-base text-neutral-400">Habit completion rate</p>
            </Card>
            <Card className="col-span-2 p-4">
              <h2 className="text-5xl font-bold text-neutral-800">$0</h2>
              <p className="text-base text-neutral-400">Total earned</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-5xl font-bold text-neutral-800">0</h2>
              <p className="text-base text-neutral-400">Tasks due today</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-5xl font-bold text-neutral-800">0</h2>
              <p className="text-base text-neutral-400">Goals achieved</p>
            </Card>
          </div>

          <div className="w-full mt-8">
            <div className="flex items-center gap-1 text-neutral-400 mb-2 pl-2">
              <IoCheckbox />
              <h2 className="text-lg font-bold">Tasks</h2>
            </div>

            <Table aria-label="Example static collection table">
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

export default Dashboard
