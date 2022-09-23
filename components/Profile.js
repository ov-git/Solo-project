import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { deleteDrinkFromLibrary, getUserLibrary } from '../lib/ApiService'
import Image from 'next/image';
import { useRouter } from 'next/router'

function Profile() {

  const router = useRouter();

  const { data: session } = useSession();
  const [library, setLibrary] = useState([]);
  const [selected, setSelected] = useState({});
  const [redo, setRedo] = useState({});

  useEffect(() => {
    setUserLibrary();
  }, [redo])
  
  const setUserLibrary = async () => {
    const data = await getUserLibrary()
    setLibrary(data);
  }

  const handleDelete = async (deleting) => {
    const deleted = await deleteDrinkFromLibrary(deleting);
    setRedo(deleted);
    // await router.replace(router.asPath)
  }


    return (
        <div className=' mt-20 h-full w-full xl:w-[80vw] flex-col bg-slate-500'>
        <h1 className='p-12 text-black'>Profile of</h1>

        <div className='flex w-full h-80 bg-yellow-200 items-center overflow-scroll'>

          {library.map((drink) => (
            <div className='flex flex-col w-auto h-full grow-1 shrink-0 p-4' key={drink.id}>
              <Image className="cursor-pointer rounded hover:opacity-80" src={drink.url} alt={''} width={200} height={200} onClick={() => setSelected(drink)} />
            <h3 className='text-[22px]'>
              {drink.name}
            </h3>

            </div>
          ))}
        </div>    
        
        <div className='flex mt-2 w-full h-80 bg-red-200 items-center overflow-scroll'>
          <button className='px-0 self-start absolute' onClick={() => {handleDelete(selected)}}>Delete</button>
          {selected ? <h1>{selected.instructions}</h1> : 'No selected'}
         </div>
       </div>
  )
}

export default Profile