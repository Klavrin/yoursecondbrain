'use client'

import { createClient } from '@/utils/supabase/client'
import { ReactNode } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

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
    <button
      onClick={handleGoogleLogIn}
      className={twMerge('flex justify-center items-center gap-2', className)}
    >
      <FaGoogle className="text-neutral-400" />
      {children}
    </button>
  )
}

export default SignUpWithGoogleButton
