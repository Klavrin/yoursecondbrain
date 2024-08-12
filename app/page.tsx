import { createClient } from '@/utils/supabase/server'
import Home from './home/page'
import LandingPage from './landing/page'

const Root = async () => {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return <LandingPage />
  }

  return <Home />
}

export default Root
