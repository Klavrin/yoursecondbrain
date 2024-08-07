import Image from 'next/image'
import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'

import AppLogo from '@/components/app-logo'

const LandingPageHeader = () => {
  return (
    <Navbar className="bg-transparent">
      <AppLogo href="/" />

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
