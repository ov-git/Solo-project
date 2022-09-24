import React from 'react'
import Image from 'next/image';
import bg from '../public/bg.jpg'

function Hero() {


  return (
    <div className='bg-red-400 h-full w-full bg-gradient-to-b from-white to-black'>
      <Image className=" opacity-50 col-span-1 w-full h-full rounded" src={bg} alt={''} layout={'fill'} />
      </div>
  )
}

export default Hero