import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import Showcase from '../../components/Showcase'

export default function ProfilePage() {

    const [showcase, setShowcase] = useState('');
    
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
        <div className="text-2xl h-[90vh] w-[98.2vw]">
            <Navbar />
            {showcase ? <Showcase showcase={showcase} setShowcase={setShowcase} /> : <></>}
            <div className='flex justify-center w-full h-full'>
                <Profile setShowcase={setShowcase} />
            </div>

        </div>
    )
}
