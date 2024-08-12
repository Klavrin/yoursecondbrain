import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@/provider/user-provider'

export const useTasksSubscription = () => {
  const [tasks, setTasks] = useState<any>([])
  const supabase = createClient()
  const { user } = useUser()

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id)
      setTasks(data)
    }
    getTasks()
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
    .subscribe()

  return tasks
}
