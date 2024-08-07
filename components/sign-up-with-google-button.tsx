'use client'

import { createClient } from '@/utils/supabase/client'
import { ReactNode } from 'react'

interface SignUpWithGoogleProps {
  children: ReactNode
  className?: string
}

const SignUpWithGoogleButton: React.FC<SignUpWithGoogleProps> = ({
  children,
  className
}) => {
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
    <button onClick={handleGoogleLogIn} className={className}>
      {children}
    </button>
  )
}

export default SignUpWithGoogleButton
