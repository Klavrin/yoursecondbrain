import { createClient } from '@/utils/supabase/server'
import LandingPage from './(landing-page)/page'
import Dashboard from './dashboard/page'

const Home = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  // console.log('user', data)

  if (!data.user) return <LandingPage />
  return <Dashboard />
}

export default Home
