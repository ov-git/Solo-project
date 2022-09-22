import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { HiMenu } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'


function Navbar() {

    const [nav, setNav] = useState(false);

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

    const handleNav = () => {
        setNav(!nav);
        console.log(nav)
    }




    return (

        <div className='z-30 text-orange-100 fixed top-0 flex items-center h-[80px] bg-black justify-between w-full'>
            <div className='flex items-center'>

                    <button className='p-4 m-0' onClick={() => handleNav()}>
                        {nav ? <CgClose /> : <HiMenu />}
                    </button>

                <Link href={'/'} onClick={() => details()} className="ml-6">Drinkzz</Link>
            </div>
            <div className='flex'>
                <button className=' bg-gray-400 m-2' onClick={() => handleClick()}>{session ? "Logout" : "Login"}</button>
                <button className=' bg-gray-400 m-2'>Sign In</button>
            </div>

            <div className={nav ? ' rounded-r fixed left-0 top-[80px] w-[30%] lg:w-[18%] bg-black ease-in duration-300' : 'fixed -left-[50%] top-[80px] border w-[30%] bg-white opacity-0 ease-in duration-300'}>
                {session ? <ul className='py-2 flex flex-col items-center overflow-hidden border-none'>
                    <li className='p-4 w-full border-b'>
                        <Link href={'/profile'}><a>Profile</a></Link>
                    </li>

                    <li className='p-4 w-full border-b'>
                        <button onClick={() => handleClick()}>Sign Out</button>
                    </li>

                    <li className='p-4 mt-4 w-full border-b'>Home</li>
                    <li className='p-4 w-full border-b'>Home</li>
                    <li className='p-4 w-full'>Home</li>
                </ul> :
                    
                    <ul className='py-2 flex flex-col items-center overflow-hidden border-none'>
                        <li className='p-4 w-full border-b'><button onClick={() => handleClick()}>Sing in</button></li>
                        <li className='p-4 w-full border-b'><button onClick={() => handleClick()}>Log in</button></li>
                        <li className='p-4 mt-4 w-full border-b'>Home</li>
                        <li className='p-4 w-full border-b'>Home</li>
                        <li className='p-4 w-full'>Home</li>
                    </ul>}
            </div>

        </div>
    )
}

export default Navbar