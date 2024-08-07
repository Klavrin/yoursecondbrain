import Image from 'next/image'
import Link from 'next/link'
import { NavbarBrand } from '@nextui-org/navbar'

interface AppLogo {
  href: string
}

const AppLogo: React.FC<AppLogo> = ({ href }) => {
  return (
    <NavbarBrand as={Link} href={href} className="group">
      <Image
        alt="yoursecondbrain logo"
        src="/yoursecondbrain-logo-dark.svg"
        width={40}
        height={40}
        className="group-hover:-rotate-12 transition-all"
      />
      <p className="font-bold text-inherit">yoursecondbrain</p>
    </NavbarBrand>
  )
}

export default AppLogo
