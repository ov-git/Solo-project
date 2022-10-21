import Link from 'next/link'
import { useState, useRef } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { HiMenu, HiOutlineSearch } from 'react-icons/Hi'
import { CgClose } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { BiHome } from 'react-icons/Bi'
import { CgProfile } from 'react-icons/cg'
import Image from 'next/image';

function Navbar() {

    const router = useRouter();
    const [nav, setNav] = useState(false);
    const { data: session } = useSession();

    function handleClick() {
        if (session) {
            router.push('/')
            signOut();
        } else {
            signIn()
        }
    }

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className='z-30 text-orange-100 fixed top-0 flex items-center h-[80px] bg-black bg-opacity-70 justify-between w-full'>
            <div className='flex items-center'>

                <button className='p-4 m-0' onClick={() => handleNav()}>
                    {nav ? <CgClose className='text-5xl' /> : <HiMenu className='text-5xl' />}
                </button>

                <Link href={'/'}>
                    <a className='text-6xl pl-8 '>
                        Drinkzz
                    </a>
                </Link>
            </div>
            {session ?
                <div className=' m-10'>
                    {session.user.image && <Image src={session.user.image} alt={''} height={80} width={80} placeholder={'empty'} className='rounded-full ' />}
                </div>
                : <div className='sm:flex hidden'>
                    <Link href={'/login'} ><a className='  m-2 border border-white p-2 xl:p-3 rounded hover:bg-slate-200 hover:text-black'>Log In</a></Link>
                    <Link href={'/register'} ><a className=' bg-gray-300 text-black m-2 p-2 xl:p-3 rounded hover:bg-black hover:text-white'>Sign In</a></Link>
                </div>}

            {/* side menu */}
            <div className={nav ? 'rounded-r fixed left-0 top-[80px] w-[30%] lg:w-[18%] bg-black bg-opacity-80 ease-in duration-300' : 'fixed -left-[50%] top-[80px] border w-[30%] bg-white opacity-0 ease-in duration-300'}>
                {session ? <ul className='py-2 flex flex-col items-center overflow-hidden border-none'>
                    <li className='p-4 w-full border-b hover:bg-opacity-80 flex items-center'>
                        {(router.route != '/profile')
                            ?
                            <>
                                <CgProfile className='text-3xl mr-4' />
                                <Link href={'/profile'}>
                                    <a>Profile</a>
                                </Link>
                            </>
                            :
                            <>
                                <BiHome className='text-3xl mr-4' />
                                <Link href={'/'}>
                                    <a>Home</a>
                                </Link>
                            </>

                        }
                    </li>

                    {(router.route != '/profile') ? < li className='p-4 w-full border-b flex items-center'>
                        <>
                            <HiOutlineSearch className='text-4xl mr-4' />
                            <Link href='#search'>Search</Link></></li> : < li className='p-4 w-full border-b flex items-center'>
                        <>
                            <HiOutlineSearch className='text-4xl mr-4' />
                            <Link href='/#search'>Search</Link>
                        </>
                    </li>}

                    <li className='p-4 w-full border-b '>About</li>
                    <li className='p-4 w-full cursor-pointer' onClick={() => signOut()}>Log out</li>

                </ul> :
                    <ul className='py-2 flex flex-col items-center overflow-hidden border-none'>
                        <li className='p-4 w-full border-b flex'>
                            <BiHome className='text-4xl mr-4' />
                            <Link href={'/'}>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className='p-4 w-full border-b flex items-center'>
                            <>
                                <HiOutlineSearch className='text-4xl mr-4' />
                                <Link href='#search'>Search</Link>
                            </>
                        </li>

                        <li className='p-4 w-full border-b '><Link href={'/register'}><a>Sing in</a></Link></li>
                        <li className='p-4 pb-3 w-full '>
                            <button onClick={() => handleClick()} >Log in</button>
                        </li>
                    </ul>}
            </div>
        </div >
    )
}

export default Navbar