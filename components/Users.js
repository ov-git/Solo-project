import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

function Users({ users, change }) {

    const [userlist, setUserList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setUserList(users);
    }, [])

    useEffect(() => {
        handleSearch();
    }, [search])

    const handleSearch = () => {

        let filtered = userlist.filter((user) => {
            return (user.name && user.name.toLowerCase().includes(search.toLowerCase()))
        })
        return filtered;
    }


    return (
        <div className=' h-[80vh] w-full xl:w-[80vw] flex-col text-white'>
            <div className='flex pt-24 justify-between'>
                <div>
                    <button onClick={change} className='text-3xl underline-offset-8 underline my-6'> My profile </button>
                </div>

                <form className='flex flex-col w-96 bg-slate-500 border-black border rounded self-end p-4 -mb-16'>
                    <label className='text-3xl p-2'>Search users</label>
                    <input className=' text-black text-2xl py-2 m-4 rounded' value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search by name'>
                    </input>
                </form>
            </div>

            <div className='w-full h-auto bg-slate-400 rounded-md min-h-[68vh]'>
                {handleSearch(userlist).map((user) => (
                    <>
                        <div className='flex p-6 border-b '>
                            {user.image ? <Image src={user.image} alt={'user'} height={80} width={80} placeholder={'empty'} className='rounded-full' /> : <></>}
                            <h3 key={user.id} className='text-black self-end p-4'>{user.name}</h3>

                        </div>
                        <div className='overflow-x-auto flex gap-4'>

                            {user.drinks.length ? user.drinks.map((drink, i) => (
                                <div key={i} className='px-3 shrink-0 grow-1 h-auto'>
                                    <h3>{drink.drinkName}</h3>
                                    <Image className='rounded' src={drink.drinkThumb} alt={''} height={200} width={220} placeholder={'empty'} />
                                </div>
                            )) : <h1 className='p-10'>User has nothing in library</h1>}

                        </div>
                    </>
                ))}

            </div>
        </div>
    )
}

export default Users