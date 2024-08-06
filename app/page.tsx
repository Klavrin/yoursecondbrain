import { createClient } from '@/utils/supabase/server'
import LandingPage from './(landing-page)/page'
import Header from '@/components/header'

const Home = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  console.log(data)

  if (!data.user) return <LandingPage />
  return (
    <>
      <Header />
    </>
  )
}

export default Home
