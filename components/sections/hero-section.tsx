import Image from 'next/image'
import { Indie_Flower } from 'next/font/google'
import { Button } from '@nextui-org/button'

const indieFlower = Indie_Flower({
  weight: '400',
  subsets: ['latin']
})

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[15vw] max-w-6xl m-auto">
      <img
        src="/hero-section-background.png"
        alt="yoursecondbrain hero-section-background"
        className="min-w-full max-h-screen absolute top-0 -z-50 object-cover opacity-[0.14]"
      />

      <div className="mb-6 px-6 py-1 border-1.5 text-neutral-500 border-neutral-200 rounded-lg text-sm opacity-80 cursor-pointer backdrop-blur-sm">
        Check out our newest generous plan!
      </div>

      <h1 className="xl:text-6xl text-[3.75vw] max-w-4xl leading-none font-bold tracking-tight text-center relative">
        The{' '}
        <span className="relative">
          <div className="absolute -right-48 -top-14 flex opacity-45">
            <Image
              alt="arrow"
              src="/hand-drawn-arrow.svg"
              width={60}
              height={60}
              className="rotate-[150deg] scale-y-[-1] pointer-events-none select-noneG"
            />
            <h5
              className={
                'text-base tracking-normal relative -right-2 top-1 -rotate-3 select-none ' +
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

      <p className="text-neutral-500 leading-snug font-light text-center w-4/5 mt-8 mb-10">
        Frustrated with productivity tools that fall short? Unlock your full potential
        with yoursecondbrain. Transform scattered thoughts into a powerful knowledge base.
        Organize your ideas, research, and inspire others effortlessly.
      </p>

      <Button className="w-64 bg-neutral-800 text-neutral-200 text-md">
        Upgrade your brain --&gt;
      </Button>
    </div>
  )
}

export default HeroSection
