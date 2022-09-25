import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { newUser } from '../lib/ApiService'

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
        newUser(user);
    }

    return (
        <div className='h-full w-full bg-green-400 flex justify-center items-center'>
            <div className='flex flex-col h-auto p-10 w-80 xl:h-96 xl:w-96 grow-1 shrink-0 bg-white rounded'>

                {Object.values(providers).map((provider) => (
                  <div key={provider.name} className='p-8 border bg-slate-400'>
                        {(provider.name !== 'Email and Password') ?
                            <button onClick={() => signIn(provider.id)} >
                                Sign in with {provider.name}
                            </button> :
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <label className='w-full'>{provider.name}</label>
                                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                                <label className='w-full'>Password</label>

                                <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                <label className='w-full'>Password</label>
                                <input placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                                <label className='w-full'>Confirm Password</label>
                                <input placeholder='Confirm Password' value={conf} onChange={(e) => { setConf(e.target.value) }}></input>
                                <button className='bg-white p-2 mt-1' type="submit">Login</button>
                            </form>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RegisterComponent