import { GeistSans } from 'geist/font/sans'
import { Lato } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en" className={GeistSans.className}>
    <html lang="en" className={OpenSans.className}>
      <body className="light">
        <main>{children}</main>
      </body>
    </html>
  )
}
