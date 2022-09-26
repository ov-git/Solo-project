import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { deleteDrinkFromLibrary, getUserLibrary, newList } from '../lib/ApiService'
import Image from 'next/image';
import cocktail from '../public/cocktail.jpg'
import { BsFillTrashFill } from 'react-icons/bs'

function Profile({showcase,setShowcase}) {

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

  const dev = () => {
    
    const list = {
      name: 'test',
      drinkz: library.map(d => d),
    }

    newList(list);
  }

  return (
    <div className=' h-[80vh] w-full xl:w-[70vw] flex-col text-white'>
      <div className='flex pt-16 justify-between'>
        <button onClick={() => dev()}>dev</button>
        <h1 className='text-[30px] py-8'>{session ? `Logged in as ${session.user.name}` : ''}</h1>
      </div>

      <div className='flex flex-col w-full h-full items-center overflow-y-auto'>
        {library.length ? library.map((drink) => (
          <div className='w-full h-auto grid grid-cols-4 gap-8 p-4 border rounded bg-slate-500 border-black' key={drink.id}>            
            <Image className=" col-span-1 cursor-pointer rounded" src={drink.drinkThumb} alt={''} height={200} width={250} placeholder={'empty'} onClick={() => setShowcase(drink)} />
 
            <div className='col-span-3 h-full overflow-hidden flex'>        
              <div className='flex w-full flex-col'>
                <div className='justify-between flex px-0'>
                  <h3 className='text-md py-3'>
                    {drink.drinkName}
                  </h3>
                  <button className='flex px-4 flex-col justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-10 rounded-full group' onClick={() => { handleDelete(drink) }}>
                    <p className='text-sm opacity-0 group-hover:opacity-100'> Delete </p>
                    <BsFillTrashFill />
                  </button>
                </div>
                {(drink.drinkInstructions.length < 400) ? <p className='text-yellow-200 text-[1.2rem]'> {drink.drinkInstructions}</p>
                  : <p className='text-yellow-200 text-[1rem]'> {drink.drinkInstructions}</p>}
              </div>
            </div>
          </div>
        )) : <p className='pt-20'>Nothing here. Add drinks to your library</p>}
      </div>
    </div>
  )
}

export default Profile