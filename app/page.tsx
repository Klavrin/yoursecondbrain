import { createClient } from '@/utils/supabase/server'
import Home from './home/page'
import Loading from '@/components/loading'

const Root = async () => {
  return <Home />
}

export default Root
