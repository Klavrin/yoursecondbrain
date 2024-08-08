import { createClient } from '@/utils/supabase/server'
import LandingPage from './(landing-page)/page'
import Dashboard from './(home)/page'

const Root = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) return <LandingPage />
  return <Dashboard />
}

export default Root
