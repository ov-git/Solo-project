import { loginUser } from '../../lib/ApiService'
import { useEffect, useState, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import AuthContext from '../contexts/AuthContext'

const SignIn = ({ toggleComponent }) => {
    const router = useRouter();
    const { googleLogin } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    // useEffect(() => {
    //     console.log(form);

    // }, [form.password, form.email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: form.email,
            password: form.password,
        }
        const { error } = await loginUser(user);
        if (!error) {
            router.push('/')
        }
    }

    return (
        <div className='bg-red-400 w-72 h-[300px]'>
            <form className="flex flex-col p-8 gap-3" onSubmit={(e) => handleSubmit(e)}>
                <label>Email</label>
                <input placeholder={'ok'} onChange={(e) => setForm(prev => { return { ...prev, email: e.target.value } })} />
                <label>Password</label>
                <input placeholder={'ok'} type="password" onChange={(e) => setForm(prev => { return { ...prev, password: e.target.value } })} />
                <button type="submit" className='bg-white rounded'> Submit </button>
                <button type="button" className='flex justify-center items-center w-full bg-white' onClick={() => googleLogin()} >
                    Sign in with Google <FcGoogle className='ml-4 text-3xl bg-white rounded-full' />
                </button>
                <button onClick={toggleComponent}>New User?</button>
            </form>
        </div>
    )
}


export default SignIn

