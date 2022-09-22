import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

function Navbar() {

    const { data: session } = useSession();

    function handleClick() {
        if (session) {
            signOut();
        } else {
            signIn()
        }
    }

    const details = () => {
        console.log(session)
    }




    return (

        <div className='z-20 text-orange-400 fixed top-0 flex items-center h-[80px] bg-black justify-between w-full'>
            <div className='flex items-center'>
                <Link href='/'>
                    <button className='border border-white p-4 m-4'>
                        X
                    </button>

                </Link>
                <h1 onClick={() => details()}>Drinkzz</h1>
            </div>
            <div className='flex'>
                <button className=' bg-gray-400 m-2' onClick={() => handleClick()}>{session ? "Logout" : "Login"}</button>
                <button className=' bg-gray-400 m-2'>Sign In</button>
            </div>


        </div>
    )
}

export default Navbar