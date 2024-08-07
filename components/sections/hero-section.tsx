import Image from 'next/image'
import { Indie_Flower } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Button } from '@nextui-org/button'

const indieFlower = Indie_Flower({
  weight: '400',
  subsets: ['latin']
})

const HeroSection = () => {
  return (
    <div className="flex flex-col sm:items-center items-start mt-[15vw] max-w-6xl m-auto px-4">
      <img
        src="/hero-section-background.png"
        alt="yoursecondbrain hero-section-background"
        className="min-w-full max-h-screen absolute top-0 -z-50 object-cover opacity-[0.14] sm:block hidden"
      />

      <div className="mb-6 sm:px-6 px-3 py-1 border-1.5 text-neutral-500 border-neutral-200 rounded-lg sm:text-small text-[12px] opacity-80 cursor-pointer backdrop-blur-sm">
        Check out our newest generous plan!
      </div>

      <h1
        className={
          'sm:w-auto w-[90%] lg:text-6xl sm:text-[5.75vw] text-2xl max-w-4xl leading-none font-bold tracking-tight sm:text-center text-start relative ' +
          GeistSans.className
        }
      >
        The{' '}
        <span className="relative whitespace-nowrap">
          <div className="absolute lg:-right-48 right-[-17vw] lg:-top-14 top-[-4.5vw] opacity-45 sm:flex hidden">
            <Image
              alt="arrow"
              src="/hand-drawn-arrow.svg"
              width={60}
              height={60}
              className="rotate-[150deg] scale-y-[-1] pointer-events-none select-none lg:w-[60px] w-[5vw] lg:h-[60px] h-[5vw]"
            />
            <h5
              className={
                'lg:text-base text-[1.5vw] tracking-normal relative -right-2 top-1 -rotate-3 select-none ' +
                indieFlower.className
              }
            >
              Made for students by students
            </h5>
          </div>

          <span className="z-10">productivity system</span>
          <span className="w-full h-full bg-lime-300 p-2 absolute -z-10 -rotate-1 right-0" />
        </span>{' '}
        you have been searching for.
      </h1>

      <p className="sm:w-4/5 w-full text-neutral-500 sm:leading-snug leading-tight font-light sm:text-base text-small sm:text-center test-start  sm:mt-8 mt-5 sm:mb-10 mb-6">
        Frustrated with productivity tools that fall short? Unlock your full potential
        with yoursecondbrain. Transform scattered thoughts into a powerful knowledge base.
        Organize your ideas, research, and inspire others effortlessly.
      </p>

      <Button className="sm:w-64 w-auto sm:h-10 h-8 bg-neutral-800 text-neutral-200 sm:text-lg text-sm">
        Upgrade your brain --&gt;
      </Button>
    </div>
  )
}

export default HeroSection
