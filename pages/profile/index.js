import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'

export default function ProfilePage() {

    return (
        <div className="text-4xl h-[90vh] w-[98.2vw]">
            <Navbar />
            <div className='flex justify-center w-full h-full'>
                <Profile />
            </div>

        </div>
    )
}
