import React, { useState } from 'react'
import { signIn, getSession } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc'
import { loginUser } from '../lib/ApiService'


function Login({ providers }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    // await signIn("credentials", {
    // redirect: true,
    const user = { email: email, password: password }
    const res = await loginUser(user);
    console.log(res);

  }

  return (
    <div className='h-full w-full bg-red-900 flex justify-center items-center'>
      <div className='flex flex-col h-full w-80 xl:h-96 xl:w-96 grow-1 shrink-0  justify-center items-center'>

        {Object.values(providers).map((provider) => (

          <div key={provider.name} className='w-80 p-8 border bg-slate-600 rounded-md text-white'>
            {(provider.name !== 'Email and Password') ?
              <button className='flex justify-center items-center w-full' onClick={() => signIn(provider.id)} >
                Sign in with {provider.name} <FcGoogle className='ml-4 text-3xl bg-white rounded-full' />
              </button> :
              <form onSubmit={(e) => handleSubmit(e)}>
                <label className='w-full'>Email</label>
                <input className='text-black rounded mb-2 w-full' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label className='w-full'>Password</label>
                <input className='text-black rounded w-full' type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                <button className='bg-white px-2 mt-4 rounded text-black' type="submit">Login</button>
              </form>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login