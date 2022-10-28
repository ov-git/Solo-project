import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { HiMenu, HiOutlineSearch } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'

import Image from 'next/image';
import Nav from '../public/Nav.png'
import SideMenu from './SideMenu'

function Navbar() {

    const [nav, setNav] = useState(false);
    const { data: session } = useSession();

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className='z-30 text-orange-100 fixed top-0 flex items-center h-[80px] bg-black bg-opacity-70 justify-between w-full'>
            <div className='flex items-center'>

                <button className='p-4 m-0 hover:animate-pulse' onClick={() => handleNav()}>
                    {nav ? <CgClose className='text-5xl' /> : <HiMenu className='text-5xl' />}
                </button>

                <Link href={'/'}>
                    <a className=' px-4 flex items-center select-none'>
                        <Image src={Nav} alt={'Logo'} height={80} width={300} />
                    </a>
                </Link>
            </div>
            {session ?
                <div className=' m-10 hidden sm:flex'>
                    {session.user.image && <Image src={session.user.image} alt={'profile'} height={70} width={70} placeholder={'empty'} className='rounded-full'/>}
                </div>
                :
                <div className='sm:flex hidden'>
                    <Link href={'/login'} ><a className=' m-2 border border-white p-2 rounded hover:bg-slate-200 hover:text-black'>Log In</a></Link>
                    <Link href={'/register'} ><a className=' bg-gray-300 text-black m-2 p-2 rounded hover:bg-black hover:text-white'>Sign In</a></Link>
                </div>}
            
            <SideMenu nav={nav} handleNav={handleNav} />



        </div >
    )
}

export default Navbar