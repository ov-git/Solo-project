import { BiHome, BiLogOut, BiLogIn } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { logoutUser } from '../../lib/ApiService'

function SideMenu({ nav, handleNav }) {
    const router = useRouter();
    // const { data: session } = useSession();
    const { session, logout } = useContext(AuthContext);

    // function handleClick() {
    //     logoutUser();
    //     router.push('/signin');
    // }

    return (
        <div className={nav ? 'rounded-r fixed left-0 top-[80px] w-full md:w-1/4 bg-black bg-opacity-80 ease-in duration-300' : 'fixed -left-[50%] top-[80px] border w-[30%] bg-white opacity-0 ease-in duration-300'}>


            <ul className='py-3 flex flex-col overflow-hidden border-none'>
                {(router.route === '/') ?
                    <Link href={'/profile'}>
                        <a className='text-3xl flex gap-4 p-2 border-b'><CgProfile />Profile</a>
                    </Link> :
                    <Link href={'/'}>
                        <a className='text-3xl flex gap-4 p-2 border-b'><BiHome />Home</a>
                    </Link>}
                {session ?
                    <>
                        <Link href={'/settings'}>
                            <a className='text-3xl flex gap-4 p-2 border-b'><BiHome />Settings</a>
                        </Link>
                        <Link href={'/contact'}>
                            <a className='text-3xl flex gap-4 p-2 border-b'><BiHome />Contact</a>
                        </Link>
                        <button className='text-3xl p-2 flex gap-4 items-center' onClick={() => logout()}><BiLogOut /> Log Out</button>
                    </>
                    : <Link href={'/signin'}>
                        <a className='text-3xl p-2 flex gap-4 items-center'><BiLogIn /> Log In</a>
                    </Link>}
            </ul>
        </div>
    )
}

export default SideMenu