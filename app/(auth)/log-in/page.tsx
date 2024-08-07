import SignUpWithGoogleButton from '@/components/sign-up-with-google-button'
import { Navbar } from '@nextui-org/navbar'
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

const LogInPage = async () => {
  return (
    <div className="flex h-screen justify-center">
      <div className="w-2/5 bg-neutral-50 border-r-[0.5px] border-neutral-300 shadow-small flex flex-col">
        <Navbar className="bg-transparent">
          <AppLogo href="/" />
        </Navbar>

        <div className="flex flex-col justify-center w-3/4 m-auto">
          <h1 className="text-3xl font-normal leading-relaxed">Welcome back</h1>
          <p className="text-small text-neutral-500 font-light">Log in to your account</p>

          <SignUpWithGoogleButton className="border border-neutral-300 hover:border-neutral-500 bg-none hover:bg-neutral-200 transition-colors rounded-md px-2 py-2">
            Continue with Google
          </SignUpWithGoogleButton>

          <p className="text-small text-neutral-500">
            Don't have an account?{' '}
            <Link
              href="/sign-up"
              className="text-neutral-800 hover:text-neutral-500 transition-colors underline"
            >
              Sign up Now
            </Link>
          </p>
        </div>
      </div>

      <div className="w-3/5"></div>
    </div>
  )
}

export default LogInPage
