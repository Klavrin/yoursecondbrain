const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'yoursecondbrain - Sign up',
  description: 'Sign up into yoursecondbrain.'
}

const SignUpPage = () => {
  return <div>SignUpPage</div>
}

export default SignUpPage
