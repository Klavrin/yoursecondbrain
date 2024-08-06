'use client'
import { createClient } from '@/utils/supabase/client'

const LandingPage = () => {
  const supabase = createClient()

  return (
    <main>
      <button onClick={async () => await supabase.auth.signOut()}>sign out</button>
    </main>
  )
}

export default LandingPage
