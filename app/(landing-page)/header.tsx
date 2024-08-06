import Image from 'next/image'
import Link from 'next/link'

const LandingPageHeader = () => {
  return (
    <header className="bg-slate-700 rounded-lg mt-4 p-2">
      <Link href="/">
        <Image
          alt="icon"
          src="./icon.svg"
          className="btn bg-transparent border-none hover:bg-slate-800 p-0"
          width={50}
          height={50}
        />
      </Link>
    </header>
  )
}

export default LandingPageHeader
