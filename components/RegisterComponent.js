import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { newUser } from '../lib/ApiService'
import { FcGoogle } from 'react-icons/Fc'

function RegisterComponent({ providers }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conf, setConf] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (conf !== password) {
            setEmail('')
            setPassword('')
            setConf('')
            return;
        }
        const user = {
            name,
            email,
            password,
        }
        const res = await newUser(user);
        console.log(res);
    }

    return (
        <div className='h-full w-full bg-green-900 flex justify-center items-center text-white'>
            <div className='flex flex-col h-auto p-2 w-80 xl:h-96 xl:w-96 grow-1 shrink-0'>

                {Object.values(providers).map((provider) => (
                  <div key={provider.name} className='p-6 border bg-slate-600 rounded-md'>
                        {(provider.name !== 'Email and Password') ?
                            <button className='flex justify-center items-center' onClick={() => signIn(provider.id)} >
                                Sign in with {provider.name} <FcGoogle className='ml-4 text-3xl bg-white rounded-full' />
                            </button> :
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <label className='w-full'>Name</label>
                                <input className='text-black rounded text-lg w-[90%]' value={name} onChange={(e) => setName(e.target.value)}></input>
                                <label className='w-full'>Email</label>

                                <input className='text-black rounded mb-2 text-lg w-[90%]' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                <label className='w-full'>Password</label>
                                <input className='text-black rounded mb-2 text-lg w-[90%]' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                                <label className='w-full'>Confirm Password</label>
                                <input className='text-black rounded mb-2 text-lg w-[90%]' type='password' value={conf} onChange={(e) => { setConf(e.target.value) }}></input>
                                <button className='text-black rounded bg-white px-2 mt-4' type="submit">Login</button>
                            </form>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RegisterComponent