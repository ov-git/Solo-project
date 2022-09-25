import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { deleteDrinkFromLibrary, getUserLibrary } from '../lib/ApiService'
import Image from 'next/image';
import cocktail from '../public/cocktail.jpg'
import { BsFillTrashFill } from 'react-icons/bs'

function Profile() {

  const { data: session } = useSession();
  const [library, setLibrary] = useState([]);
  const [redo, setRedo] = useState({});

  useEffect(() => {   
    setUserLibrary();
  }, [redo, session])

  const setUserLibrary = async () => {
    console.log(session);
    if (session) {
      const data = await getUserLibrary(session.user.email)
      setLibrary(data);
    }
  }

  const handleDelete = async (deleting) => {
    const deleted = await deleteDrinkFromLibrary(deleting);
    setRedo(deleted);
  }

  return (
    <div className=' h-[80vh] w-full xl:w-[70vw] flex-col text-white'>
      <div className='flex pt-16 justify-between'>
        <h1 className='py-8 pl-24'>Profile</h1>
        <h1 className='text-[30px] pt-8'>{session ? `Logged in as ${session.user.name}` : ''}</h1>
      </div>

      <div className='flex flex-col w-full h-full items-center overflow-y-scroll'>
        {library.map((drink) => (
          <div className='w-full h-96 grid grid-cols-4 gap-8 p-4 border rounded bg-slate-500 border-black' key={drink.id}>            
            <Image className=" col-span-1 w-full h-full cursor-pointer rounded" src={drink.url} alt={''} height={200} width={200} placeholder={'empty'} />
 
            <div className='col-span-3 h-full overflow-hidden flex'>        
              <div className='flex w-full flex-col'>
                <div className='justify-between flex px-0'>
                  <h3 className='text-md py-3'>
                    {drink.name}
                  </h3>
                  <button className='flex px-4 flex-col justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-10 rounded-full group' onClick={() => { handleDelete(drink) }}>
                    <p className='text-sm opacity-0 group-hover:opacity-100'> Delete </p>
                    <BsFillTrashFill />
                  </button>
                </div>
                {(drink.instructions.length < 400) ? <p className='text-yellow-200 text-[1.2rem]'> {drink.instructions}</p>
                  : <p className='text-yellow-200 text-[1rem]'> {drink.instructions}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile