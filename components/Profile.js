import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { deleteDrinkFromLibrary, getUserLibrary } from '../lib/ApiService'
import Image from 'next/image';
import { useRouter } from 'next/router'
import cocktail from '../public/cocktail.jpg'
import { BsFillTrashFill } from 'react-icons/bs'

function Profile() {

  const router = useRouter();

  const { data: session } = useSession();
  const [library, setLibrary] = useState([]);
  const [redo, setRedo] = useState({});

  useEffect(() => {   
    setUserLibrary();
  }, [redo, session])

  const setUserLibrary = async () => {
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
    <div className=' h-[80vh] w-full xl:w-[80vw] flex-col'>
      <div className='flex py-16 justify-between'>
        <h1 className='pt-8'>Profile</h1>
        <h1 className='text-[30px] pt-8'>{session ? `Logged in as ${session.user.name}` : ''}</h1>
      </div>

      <div className='flex flex-col w-full h-full items-center overflow-y-scroll'>
        {library.map((drink) => (
          <div className='w-full h-auto grid grid-cols-3 gap-8 p-4 border border-black' key={drink.id}>
            <Image className=" col-span-1 w-full h-full cursor-pointer rounded" src={drink.url} alt={''} height={200} width={200} placeholder={'empty'} />
            <div className=' col-span-2 h-full overflow-hidden flex'>
        
              <div className='flex w-full flex-col'>
                <div className='justify-between flex px-0'>
                  <h3 className='text-md py-3'>
                    {drink.name}
                  </h3>
                  <button className='flex flex-col justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-10 rounded-full group' onClick={() => { handleDelete(drink) }}>
                    <p className='text-sm opacity-0 group-hover:opacity-100 '>Delete</p>
                    <BsFillTrashFill />
                  </button>
                  </div>
                <p className='text-black text-[30px]'> {drink.instructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile