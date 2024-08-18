import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@/provider/user-provider'

export const useTasksSubscription = () => {
  const [tasks, setTasks] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const { user } = useUser()

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id)
      setTasks(data)
    }
    getTasks()
    setLoading(false)
  }, [])

  supabase
    .channel('tasks')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'tasks' },
      (payload) => {
        console.log('change recieved', payload.new)
        setTasks([...tasks, payload.new])
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'tasks' },
      (payload) => {
        console.log('change recieved', payload.new)
        const mappedTasks = tasks.map((task: any) => {
          if (task.id === payload.new.id) {
            return payload.new
          }
          return task
        })
        setTasks(mappedTasks)
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'tasks' },
      (payload) => {
        console.log('change recieved', payload.new)
        const filteredTasks = tasks.filter((task: any) => task.id !== payload.old.id)
        setTasks(filteredTasks)
      }
    )
    .subscribe()

  return [tasks, loading]
}
