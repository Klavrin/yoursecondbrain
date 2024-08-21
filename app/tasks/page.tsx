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
import { DateInput } from '@nextui-org/date-input'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { useUser } from '@/provider/user-provider'
import { formatTime } from '@/utils/format-time'
import { useTasksSubscription } from '@/hooks/use-tasks-subscription'
import { Tooltip } from '@nextui-org/tooltip'
import { redirect } from 'next/navigation'
import { today, getLocalTimeZone } from '@internationalized/date'
import { isEmptyOrWhitespace } from '@/utils/is-empty-or-whitespace'
import toast from 'react-hot-toast'
import Loading from '@/components/loading'
import CloseButton from '@/components/close-button'

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

const Tasks = () => {
  const [tasks, loading] = useTasksSubscription()
  const [taskName, setTaskName] = useState('')
  const [dueDate, setDueDate] = useState(new Date())
  const supabase = createClient()
  const { user } = useUser()

  if (!user) {
    redirect('/')
  }

  const handleCreateTask = async (
    task: string,
    status: TaskStatus,
    userId: string,
    isCompleted: boolean
  ) => {
    if (isEmptyOrWhitespace(task)) return toast.error('Task name cannot be empty')

    const { error } = await supabase.from('tasks').insert({
      task,
      status,
      user_id: userId,
      is_completed: isCompleted,
      due: dueDate
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

  if (loading) return <Loading />

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="flex flex-col items-center">
          <div className="w-full px-2 max-w-[1028px] mx-auto mt-4">
            <div>
              <Input
                placeholder="Task name..."
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
              />
              <div className="flex">
                <Button
                  onClick={() =>
                    handleCreateTask(taskName, TaskStatus.IN_PROGRESS, user.id, false)
                  }
                  className="w-full mb-4 mt-1"
                  color="primary"
                >
                  Add new task
                </Button>

                <DateInput
                  label="Due date"
                  defaultValue={today(getLocalTimeZone())}
                  onChange={(e) => setDueDate(new Date(e.year, e.month - 1, e.day))}
                />
              </div>
            </div>

            <Table aria-label="Tasks table">
              <TableHeader>
                <TableColumn>CHECKBOX</TableColumn>
                <TableColumn>TASK</TableColumn>
                <TableColumn>DUE</TableColumn>
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
                    <TableCell>{formatTime(task.due)}</TableCell>
                    <TableCell className="flex justify-end p-0">
                      <CloseButton onClick={() => handleDeleteTask(task.id)} />
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
