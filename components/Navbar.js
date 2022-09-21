import React from 'react'

function Navbar() {
    return (
      
      <div className=' flex items-center h-[70px] bg-black justify-between maw-w-[900px]'>       
          <div className='flex items-center'>
              <button className='border border-white p-4 m-4'>
                  X
              </button>
              <h1>Drinkzz</h1>
          </div>
          <div className='flex'>
              <button className=' bg-gray-400 m-2'>Log In</button>
              <button className=' bg-gray-400 m-2'>Sign In</button>
          </div>
          
          
    </div>
  )
}

export default Navbar