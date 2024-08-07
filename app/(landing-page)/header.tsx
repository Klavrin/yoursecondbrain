import Image from 'next/image'
import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'

const LandingPageHeader = () => {
  return (
    <Navbar className="bg-transparent">
      <NavbarBrand as={Link} href="#" className="group">
        <Image
          alt="yoursecondbrain logo"
          src="/yoursecondbrain-logo-dark.svg"
          width={40}
          height={40}
          className="group-hover:-rotate-12 transition-all"
        />
        <p className="font-bold text-inherit">yoursecondbrain</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} href="/log-in" variant="light">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/sign-up"
            variant="flat"
            className="bg-neutral-800 text-neutral-200"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default LandingPageHeader
