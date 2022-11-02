import { newUser } from '../../lib/ApiService'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordRegex = /^(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}$/;

const SignUp = ({ toggleComponent }) => {

    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm: '',
    })

    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        console.log(emailRegex.test(form.email));
        if (emailRegex.test(form.email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
        if (passwordRegex.test(form.password)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
        

    }, [form.password, form.confirm, form.email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.confirm === form.password && emailValid && passwordValid) {
            const user = {
                // name,
                email: form.email,
                password: form.password,
            }
            const res = await newUser(user);
            router.push('/')   
            return;
        } 
        setError("Invalid credentials: password must contain at least 6 character and 1 number");
        return;
    }

    return (
        <div className='bg-red-400 w-72 h-[350px]'>
            <form className="flex flex-col p-8 gap-2" onSubmit={(e) => handleSubmit(e)}>
                <label className="bg-white text-red-600">{error}</label>
                <label>Email</label>
                <input placeholder={'ok'} onChange={(e) => setForm(prev => { return { ...prev, email: e.target.value } })} />
                <label>Password</label>
                <input placeholder={'ok'} type="password" onChange={(e) => setForm(prev => { return { ...prev, password: e.target.value } })} />
                <label>Confirm password</label>
                <input placeholder={'ok'} type="password" onChange={(e) => setForm(prev => { return { ...prev, confirm: e.target.value } })} />
                <button type="submit" className='bg-white rounded'> Submit </button>
                <button onClick={toggleComponent}>Already a user ?</button>
            </form>
        </div>
    )
}

export default SignUp
