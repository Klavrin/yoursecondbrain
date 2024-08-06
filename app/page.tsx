import { createClient } from '@/utils/supabase/server'
import LandingPage from './(landing-page)/page'

const Home = async () => {
  const supabase = createClient()
  const user = await supabase.auth.getUser()

  if (!user) return <LandingPage />
  return <main>hello</main>
}

export default Home
