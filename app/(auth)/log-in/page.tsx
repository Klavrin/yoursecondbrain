const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'yoursecondbrain - Log in',
  description: 'Log in yoursecondbrain.'
}

const LogInPage = () => {
  return <div>LogInPage</div>
}

export default LogInPage
