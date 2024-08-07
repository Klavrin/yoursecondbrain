import SignUpWithGoogleButton from '@/components/sign-up-with-google-button'
import { Navbar } from '@nextui-org/navbar'
import Image from 'next/image'
import Link from 'next/link'

import AppLogo from '@/components/app-logo'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'yoursecondbrain - Log in',
  description: 'Log in yoursecondbrain.'
}

// #f8f8f8

const LogInPage = async () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/5 bg-neutral-100 border-r-1 border-neutral-300">
        <Navbar className="bg-transparent">
          <AppLogo href="/" />
        </Navbar>
      </div>

      <div className="w-3/5"></div>
    </div>
  )
}

export default LogInPage
