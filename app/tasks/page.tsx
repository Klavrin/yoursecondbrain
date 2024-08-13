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
import { Tooltip } from '@nextui-org/tooltip'

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

const Tasks = () => {
  const tasks = useTasksSubscription()
  const [taskName, setTaskName] = useState('')
  const supabase = createClient()
  const { user } = useUser()

  console.log(tasks)

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

  const handleCompleteTask = async (taskId: string, is_completed: boolean) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !is_completed })
      .eq('id', taskId)

    if (error) throw error
  }

  const handleDeleteTask = async (taskId: string) => {
    const error = await supabase.from('tasks').delete().eq('id', taskId)
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
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody>
                {tasks.map((task: any) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Tooltip
                        content="Marking as complete will delete this todo after 5 minutes"
                        placement="right-start"
                        delay={600}
                        closeDelay={0}
                        color="warning"
                        size="sm"
                      >
                        <Checkbox
                          isSelected={task.is_completed}
                          onChange={() => handleCompleteTask(task.id, task.is_completed)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{formatTime(task.created_at)}</TableCell>
                    <TableCell>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
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
