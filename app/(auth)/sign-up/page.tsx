import SignUpWithGoogleButton from '@/components/sign-up-with-google-button'
import { Navbar } from '@nextui-org/navbar'
import Link from 'next/link'

import AppLogo from '@/components/app-logo'
import SignUpWithNotionButton from '@/components/sign-up-with-notion-button'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'yoursecondbrain - Sign up',
  description: 'Sign up to yoursecondbrain.'
}

const SignUpPage = async () => {
  return (
    <div className="flex h-screen justify-center">
      <div className="w-3/5 xl:block hidden"></div>

      <div className="xl:w-2/5 w-full bg-neutral-50 border-r-[0.5px] border-neutral-300 shadow-small flex flex-col px-4">
        <Navbar className="bg-transparent sm:w-full w-0">
          <AppLogo href="/" />
        </Navbar>

        <div className="flex flex-col sm:w-[30rem] w-full mx-auto mt-[6vw] h-full">
          <h1 className="text-3xl font-normal leading-relaxed">Get started</h1>
          <p className="text-small text-neutral-500 font-light mb-6">
            Create a new account
          </p>

          <div className="flex flex-col gap-2 w-full">
            <SignUpWithGoogleButton>Continue with Google</SignUpWithGoogleButton>
            <SignUpWithNotionButton>Continue with Notion</SignUpWithNotionButton>
          </div>

          <p className="text-small text-neutral-500 mt-2">
            Already have an account?{' '}
            <Link
              href="/log-in"
              className="text-neutral-800 hover:text-neutral-500 transition-colors underline"
            >
              Log in Now
            </Link>
          </p>
        </div>

        <div className="w-full flex justify-center pb-8">
          <p className="text-[12px] max-w-[25rem] text-center text-neutral-500">
            By continuing, you agree to yoursecondbrain's Terms of Service and Privacy
            Policy, and to receive periodic emails with updates.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
