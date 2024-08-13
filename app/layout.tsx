import { GeistSans } from 'geist/font/sans'
import { Lato } from 'next/font/google'
import './globals.css'

import { createClient } from '@/utils/supabase/server'
import { UserProvider } from '@/provider/user-provider'
import { Toaster } from 'react-hot-toast'

const OpenSans = Lato({
  weight: '400',
  subsets: ['latin']
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'yoursecondbrain - The productivity system you have been searching for.',
  description:
    'The productivity system you have been searching for. Frustrated with productivity tools that fall short? Unlock your full potential with yoursecondbrain. Transform scattered thoughts into a powerful knowledge base. Organize your ideas, research, and inspire others effortlessly.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // Add user to the users table if it doesn't exist
  if (user) {
    const userExists = await supabase.from('users').select('*').eq('user_id', user.id)
    if (userExists.data?.length === 0) {
      await supabase.from('users').insert({
        user_id: user.id,
        plan: 'premium',
        day_rating: {
          rated_at: new Date(0),
          days_rated: 0,
          horrible_days: 0,
          bad_days: 0,
          ok_days: 0,
          good_days: 0,
          amazing_days: 0
        }
      })
    }
  }

  return (
    // <html lang="en" className={GeistSans.className}>
    <html lang="en" className={OpenSans.className}>
      <body className="light">
        <main>
          <Toaster />
          <UserProvider user={user}>{children}</UserProvider>
        </main>
      </body>
    </html>
  )
}
