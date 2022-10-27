import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { HiMenu, HiOutlineSearch } from 'react-icons/hi'
import { CgClose, CgProfile } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { BiHome, BiLogOut, BiLogIn } from 'react-icons/bi'
import Image from 'next/image';
import Nav from '../public/Nav.png'

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

                <button className='p-4 m-0 hover:animate-pulse' onClick={() => handleNav()}>
                    {nav ? <CgClose className='text-5xl' /> : <HiMenu className='text-5xl' />}
                </button>

                <Link href={'/'}>
                    <a className=' px-4 flex items-center'>
                        <Image src={Nav} alt={'Logo'} height={80} width={300} />
                    </a>
                </Link>
            </div>
            {session ?
                <div className=' m-10'>
                    {session.user.image && <Image src={session.user.image} alt={'profile'} height={70} width={70} placeholder={'empty'} className='rounded-full ' />}
                </div>
                : <div className='sm:flex hidden'>
                    <Link href={'/login'} ><a className=' m-2 border border-white p-2 rounded hover:bg-slate-200 hover:text-black'>Log In</a></Link>
                    <Link href={'/register'} ><a className=' bg-gray-300 text-black m-2 p-2 rounded hover:bg-black hover:text-white'>Sign In</a></Link>
                </div>}

            {/* side menu */}

            <div className={nav ? 'rounded-r fixed left-0 top-[80px] w-[30%] lg:w-[18%] bg-black bg-opacity-80 ease-in duration-300' : 'fixed -left-[50%] top-[80px] border w-[30%] bg-white opacity-0 ease-in duration-300'}>


                <ul className='py-3 flex flex-col overflow-hidden border-none'>
                    {(router.route != '/profile') ?
                        <Link href={'/profile'}>
                            <a className='text-3xl flex gap-4 p-2 border-b'> <CgProfile />Profile</a>
                        </Link> :
                        <Link href={'/'}>
                            <a className='text-3xl p-2 flex'><BiHome />Home</a>
                        </Link>}
                    <button className='text-3xl p-2 flex gap-4 items-center' onClick={() => handleClick()} >{session ? <><BiLogOut /> Log Out</> : <><BiLogIn /> Log In</>} </button>
                </ul>
            </div>

        </div >
    )
}

export default Navbar