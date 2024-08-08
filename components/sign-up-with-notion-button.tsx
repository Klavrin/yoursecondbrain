'use client'

import { createClient } from '@/utils/supabase/client'
import { ReactNode } from 'react'
import { RiNotionFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

interface SignUpWithNotionButtonProps {
  children: ReactNode
  className?: string
}

const SignUpWithNotionButton: React.FC<SignUpWithNotionButtonProps> = ({
  children,
  className
}) => {
  const supabase = createClient()

  const handleNotionLogIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'notion',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return (
    <button
      onClick={handleNotionLogIn}
      className={twMerge(
        'flex justify-center items-center gap-2 border border-neutral-300 hover:border-neutral-500 bg-none hover:bg-neutral-200 transition-colors rounded-md px-2 py-2',
        className
      )}
    >
      <RiNotionFill className="text-neutral-400" size={20} />
      {children}
    </button>
  )
}

export default SignUpWithNotionButton
