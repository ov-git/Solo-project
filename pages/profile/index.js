import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import Users from '../../components/Users';
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import Showcase from '../../components/Showcase'
import prisma from '../../lib/prisma';

export const getServerSideProps = async () => {

    const users = await prisma.User.findMany({
        include: {
            drinks: true,
        }
    });

    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
        },
    };
};

export default function ProfilePage({ users }) {

    const [component, setComponent] = useState(true)
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

    const change = () => {
        setComponent(!component);
    }

    return (
        <div className="text-2xl h-[90vh] w-[98.2vw]">
            <Navbar />
            {showcase && <Showcase showcase={showcase} setShowcase={setShowcase} />}
            <div className='flex justify-center w-full h-full'>
                {component ? <Profile setShowcase={setShowcase} change={change} /> :
                    <Users users={users} change={change} /> }
            </div>
        </div>
    )
}
