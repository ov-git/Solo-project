import React from 'react'
import Image from 'next/future/image';
import { BsFillTrashFill } from 'react-icons/bs'

function ProfileDrinkList({library, handleDelete, setShowcase}) {

  return (
      <div className='flex flex-col w-full h-full items-center overflow-y-auto'>

          {(library && library.length) ? library.map((drink) => (
              <div className='w-full h-auto grid grid-cols-4 gap-2 md:gap-8 p-4 border rounded bg-slate-500 border-black' key={drink.id}>

                  <div className="col-span-1 cursor-pointer rounded relative" onClick={() => setShowcase(drink)}>
                      <Image src={drink.drinkThumb} alt={drink.drinkName} fill placeholder={'empty'} />
                  </div>
                  <div className='col-span-3 h-full min-h-[180px] flex'>
                      <div className='flex w-full flex-col'>
                          <div className='justify-between flex px-0'>
                              <h3 className='text-md  cursor-pointer hover:underline' onClick={() => setShowcase(drink)} >
                                  {drink.drinkName}
                              </h3>
                              <button className='flex flex-col items-center bg-black bg-opacity-0 hover:bg-opacity-10 rounded-full group' onClick={() => { handleDelete(drink) }}>
                                  <p className='hidden lg:block text-sm opacity-0 group-hover:opacity-100'> Delete </p>
                                  <BsFillTrashFill />
                              </button>
                          </div>
                          {(drink.drinkInstructions.length < 100) ?
                              <p className='text-yellow-200 text-lg'> {drink.drinkInstructions}</p>
                              : <p className='text-yellow-200 lg:text-lg text-sm'> {drink.drinkInstructions}</p>}
                      </div>
                  </div>
              </div>

          )) : <p className='pt-20'>Nothing here. Add drinks to your library</p>}
          <div className='w-full py-12'></div>
      </div>
  )
}

export default ProfileDrinkList