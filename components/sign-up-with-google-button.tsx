'use client'

import { useUser } from '@/provider/user-provider'
import { createClient } from '@/utils/supabase/client'
import { ReactNode } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

interface SignUpWithGoogleButtonProps {
  children: ReactNode
  className?: string
}

const SignUpWithGoogleButton: React.FC<SignUpWithGoogleButtonProps> = ({
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
      className={twMerge(
        'max-w-full flex justify-center items-center gap-2 border border-neutral-300 hover:border-neutral-500 bg-none hover:bg-neutral-200 transition-colors rounded-md px-2 py-2',
        className
      )}
    >
      <FaGoogle className="text-neutral-400" />
      {children}
    </button>
  )
}

export default SignUpWithGoogleButton
