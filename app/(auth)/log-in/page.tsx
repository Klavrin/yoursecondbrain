'use client'

import { createClient } from '@/utils/supabase/client'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: 'yoursecondbrain - Log in',
//   description: 'Log in yoursecondbrain.'
// }

const LogInPage = () => {
  const supabase = createClient()

  const handleGoogleLogIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return (
    <div>
      <button onClick={handleGoogleLogIn}>log in with google</button>
    </div>
  )
}

export default LogInPage
