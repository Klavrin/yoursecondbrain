import React from 'react'

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-[10vw]">
      <div className="mb-6 px-3 py-1 border-2 border-neutral-200 rounded-lg text-sm opacity-80 cursor-pointer">
        Check out our newest generous plan!
      </div>

      <h1 className="xl:text-6xl text-[3.75vw] max-w-4xl leading-none font-bold tracking-tight text-center">
        The{' '}
        <span className="relative">
          <span className="z-10">productivity system</span>
          <span className="w-full h-full bg-lime-300 p-2 absolute -z-10 -rotate-1 right-0" />
        </span>{' '}
        you have been searching for.
      </h1>

      <p className="text-neutral-400 font-light text-center w-3/5 mt-8">
        Unlock your full potential. Transform scattered thoughts into a powerful knowledge
        base. Organize your ideas, research, and inspire others effortlessly. It's your
        personal library, always accessible.
      </p>
    </div>
  )
}

export default HeroSection
