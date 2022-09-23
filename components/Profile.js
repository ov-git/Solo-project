import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { getUserLibrary } from '../lib/ApiService'

function Profile() {

  const { data: session } = useSession();
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    setUserLibrary();
  }, [])
  
  const setUserLibrary = async () => {

    const data = await getUserLibrary()
    setLibrary(data);
    console.log(library)

  }

    return (
        <div className=' mt-20 h-full w-[75%] flex-col bg-slate-500'>
        <h1 className='p-12 text-black'>Profile of</h1>

        <div className='w-full h-60 bg-yellow-200'>

          {library.map((drink) => (
            <h1>
              {drink.name}
            </h1>
          ))}
        </div>
                   
       </div>
  )
}

export default Profile