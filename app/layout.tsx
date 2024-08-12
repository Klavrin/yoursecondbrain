import { GeistSans } from 'geist/font/sans'
import { Lato } from 'next/font/google'
import './globals.css'

import { createClient } from '@/utils/supabase/server'
import { UserProvider } from '@/provider/user-provider'

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

  return (
    // <html lang="en" className={GeistSans.className}>
    <html lang="en" className={OpenSans.className}>
      <body className="light">
        <main>
          <UserProvider user={user}>{children}</UserProvider>
        </main>
      </body>
    </html>
  )
}
