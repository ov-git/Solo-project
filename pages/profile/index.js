import Navbar from '../../src/components/Navbar'
import Profile from '../../src/components/Profile'
// import Users from '../../src/components/Users';
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react';
import Showcase from '../../src/components/Showcase'
// import prisma from '../../lib/Prisma';
import AuthContext from '../../src/contexts/AuthContext';

// export const getServerSideProps = async () => {

//     const users = await prisma.User.findMany({
//         include: {
//             drinks: true,
//         }
//     });

//     return {
//         props: {
//             users: JSON.parse(JSON.stringify(users)),
//         },
//     };
// };

export default function ProfilePage({ users }) {

    const [component, setComponent] = useState(true)
    const [showcase, setShowcase] = useState('');
    const { session } = useContext(AuthContext);

    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push('/signin')
        }
    },[session])

    const change = () => {
        setComponent(!component);
    }

    return (
        <>
            <div className='flex justify-center w-full h-full pt-24'>
                <Navbar />
                {showcase && <Showcase showcase={showcase} setShowcase={setShowcase} />}
                {/* <h1 className='h-full w-full'>{JSON.stringify(session)}</h1> */}
                <Profile setShowcase={setShowcase} change={change} />
            </div>
        </>

    )
}
