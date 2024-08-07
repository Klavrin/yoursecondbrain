'use client'

import { createClient } from '@/utils/supabase/client'
import { ReactNode } from 'react'

interface SignUpWithGoogleProps {
  children: ReactNode
}

const SignUpWithGoogleButton: React.FC<SignUpWithGoogleProps> = ({ children }) => {
  const supabase = createClient()

  const handleGoogleLogIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return <button onClick={handleGoogleLogIn}>{children}</button>
}

export default SignUpWithGoogleButton
