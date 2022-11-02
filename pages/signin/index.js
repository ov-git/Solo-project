import { useContext, useEffect, useState } from "react"
import SignIn from "../../src/components/SignIn"
import SignUp from "../../src/components/SignUp"
import { useRouter } from 'next/router'
import AuthContext from "../../src/contexts/AuthContext";

export default function SignInPage(props) {

    const router = useRouter();

    const [newuser, setNewuser] = useState(false)
    const { session } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            router.push('/')
        }
        setLoading(false)
    }, [session])

    const toggleComponent = () => setNewuser(!newuser);

    if (loading) return <h1> Loading... </h1>

    return (
        
        <div className="w-full bg-green-200 h-screen flex justify-center items-center">
            {newuser ? <SignUp toggleComponent={toggleComponent} /> : <SignIn toggleComponent={toggleComponent} />}
        </div>
    )
}


