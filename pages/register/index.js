import { useEffect } from 'react';
import Navbar from '../../components/Navbar'
import RegisterComponent from '../../components/RegisterComponent'
import { getSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/router';

function Register(props) {

    const router = useRouter();
    useEffect(() => {
        checkSession();

    }, [])

    const checkSession = async () => {
        const session = await getSession()
        if (session) {
            router.push('/')
        }
    }

    return (
        <div className='w-full h-screen text-2xl'>
            <Navbar />
            <RegisterComponent providers={props.providers} />
        </div>
    )
}

export async function getServerSideProps() {

    var error = '';
    try {
        return { props: { providers: await getProviders(), loginError: error } };
    } catch (err) {
        console.log(err);
        return { props: { providers: await getProviders(), loginError: error } };
    }
}

export default Register