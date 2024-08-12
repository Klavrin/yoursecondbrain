'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
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
import { Input } from '@nextui-org/input'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { useUser } from '@/provider/user-provider'
import { formatTime } from '@/utils/format-time'
import { useTasksSubscription } from '@/hooks/use-tasks-subscription'

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

const Tasks = () => {
  // const [tasks, setTasks] = useState<any>([])
  const [taskName, setTaskName] = useState('')
  const supabase = createClient()
  const { user } = useUser()
  const tasks = useTasksSubscription()

  const handleCreateTask = async (
    task: string,
    status: TaskStatus,
    userId: string,
    isCompleted: boolean
  ) => {
    const { error } = await supabase.from('tasks').insert({
      task,
      status,
      user_id: userId,
      is_completed: isCompleted
    })

    if (error) throw error
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="flex flex-col items-center">
          <div className="w-full px-2 max-w-[1028px] mx-auto mt-4">
            <Input
              placeholder="Task name..."
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            />
            <Button
              onClick={() =>
                handleCreateTask(taskName, TaskStatus.IN_PROGRESS, user.id, false)
              }
              className="w-full mb-4 mt-1"
              color="primary"
            >
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
                {tasks.map((task: any) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Checkbox value={task.is_completed} />
                    </TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{formatTime(task.created_at)}</TableCell>
                    <TableCell>{task.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
