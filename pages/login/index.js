
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import LoginComponent from '../../components/LoginComponent'
import { signIn, getSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/router';

function Login(props) {

    const router = useRouter();

    useEffect(() => { 
        checkSession();

    }, [])

    const checkSession = async () => {
        const session = await getSession()
        if (session) {
            router.push('/profile')
        }
    }

    return (
        <div className='w-full h-screen'>
            <Navbar />
            <LoginComponent providers={ props.providers } />
        </div>
    )
}

export async function getServerSideProps() {

    var error = '';
    try {
        return { props: { providers: await getProviders(), loginError: error} };
    } catch (err) {
        console.log(err);
        return { props: { providers: await getProviders(), loginError: error } };
    }
}

export default Login