import React from 'react'
import Image from 'next/image';
import bg from '../public/bg.jpg'

function Hero() {

  return (
    <div className='bg-red-400 flex items-center justify-center h-full w-full bg-gradient-to-b from-white to-black'>
      <h1 className='z-10 text-white text-6xl top-10'> Cool text here</h1>

      <Image className=" opacity-50 col-span-1 w-full h-full rounded" src={bg} alt={''} layout={'fill'} />
      </div>
  )
}

export default Hero