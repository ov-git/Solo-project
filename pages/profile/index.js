import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react';

export default function ProfilePage() {
    
    const router = useRouter();
    useEffect(() => {
        checkSession();
 
    }, [])

    const checkSession = async () => {
        const session = await getSession()
        if (!session) {
            router.push('/login')
        }
    }

    return (
        <div className="text-4xl h-[90vh] w-[98.2vw]">
            <Navbar />
            <div className='flex justify-center w-full h-full'>
                <Profile />
            </div>

        </div>
    )
}
