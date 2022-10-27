import React from 'react'
import Image from 'next/image';
import bg from '../public/bg.jpg'

function Hero() {

  return (
    <div className='relative bg-red-400 flex items-center justify-end mt-20 2xl:mt-0 h-[30vh] sm:h-[45vh] md:h-full w-auto bg-gradient-to-b from-white to-black text-slate-300 border-b-2' >
      <h1 className='z-10 text-4xl md:text-5xl lg:text-6xl xl:text-7xl mr-[18vw] md:mr-[25vw] 2xl:mr-[35vw] pt-10 md:pt-28'>
        Find your<br /> <span className='pl-10 md:pl-20 text-slate-200'>New favorite</span>
        <br /> <span className='pl-24 md:pl-60 text-[#39a477] font-bold italic animate-pulse'>Drinkzz</span></h1>

      <Image className=" opacity-50 col-span-1 w-full h-full rounded" src={bg} alt={'Drinkzz'} layout={'fill'} priority />
    </div>
  )
}

export default Hero