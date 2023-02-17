import { useContext, useEffect, useState } from 'react'
import { deleteDrinkFromLibrary, getUserLibrary } from '../../lib/ApiService'
import AuthContext from '../contexts/AuthContext';
import CreateDrink from './CreateDrink';
import ProfileDrinkList from './ProfileDrinkList';

function Profile({ setShowcase, change }) {

  const { session } = useContext(AuthContext);
  const [library, setLibrary] = useState([]);
  const [redo, setRedo] = useState({});

  useEffect(() => {
    const setUserLibrary = async () => {
      if (session) {
        const data = await getUserLibrary(session.email)
        setLibrary(data);
      }
    }
    setUserLibrary();
  }, [redo, session])


  const handleDelete = async (deleting) => {
    const deleted = await deleteDrinkFromLibrary(deleting);
    setRedo(deleted);
  }

  const dev = () => {
    change();
  }

  return (
    <div className=' h-full w-full lg:w-[90vw] xl:w-[75vw] flex-col text-white rounded'>
      <div className='flex pt-24 pb-8 justify-between'>

        <div>
          <button onClick={() => dev()} className='text-3xl underline-offset-8 underline my-2'>Find users</button>
        </div>
        <h1 className='text-[30px] py-2'>{session ? `Logged in as ${session.email}` : ''}</h1>

      </div>

      <CreateDrink />

      <ProfileDrinkList library={library} handleDelete={handleDelete} setShowcase={setShowcase} />

    </div>
  )
}

export default Profile