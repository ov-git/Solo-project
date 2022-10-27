import { useSession } from 'next-auth/react'
import { addDrinkToLibrary } from '../lib/ApiService'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function Showcase({ showcase, setShowcase }) {

    const [ingredients, setIngredients] = useState([])
    const [measures, setMeasures] = useState([])

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        check(showcase.drinkIngredients, showcase.drinkMeasures);
    }, [])

    const handleAdd = async (adding) => {
        adding.userEmail = session.user.email;
        const from = await addDrinkToLibrary(adding);
        setShowcase('');
    }

    function check(ingredients, measures) {
        if (Array.isArray(ingredients)) {
            setIngredients(ingredients);
        } else {
            setIngredients(JSON.parse(ingredients))
        };
        if (Array.isArray(measures)) {
            setMeasures(measures)
        } else {
            setMeasures(JSON.parse(measures))
        };
    }


    return (
        <div className='z-20 flex bg fixed top-[70px] xl:top-[80px] h-[100vh] w-full'>

            <div className='fixed top-[80px] h-[100vh] w-full bg-black opacity-50' onClick={() => setShowcase('')}></div>
            <div className='flex m-4 xl:m-8 h-[75vh] lg:h-[80vh] opacity-100 z-30 bg-slate-600 w-full rounded text-white'>

                <img className=" m-4 w-auto max-w-[50%] h-[80%] cursor-pointer rounded hidden md:block" src={showcase.drinkThumb} alt={showcase.drinkName} />

                <div className='flex flex-col p-4 justify-between'>
                    <h1 className='pb-2 text-5xl text-green-200'>{showcase.drinkName}</h1>
                    <p className=' text-[1.2rem] xl:text-[1.5rem] py-3'>{showcase.drinkInstructions}</p>

                    <div className='pt-1 xl:pt-6 grid grid-cols-2 gap-8'>

                        <div className='flex flex-col'>
                            <h3 className=' text-[1.3rem] lg:text-3xl pb-4'>Ingredients:</h3>
                            {ingredients.map((ing) => (
                                <p className='text-lg'>{ing}</p>
                            ))}
                        </div>
                        <div className='flex flex-col'>
                            <h3 className=' text-[1.3rem] lg:text-3xl pb-4'>Measures:</h3>
                            {measures.map((ing) => (
                                <p className='text-lg'>{ing}</p>
                            ))}
                        </div>
                    </div>

                    <div className='xl:my-10 flex items-center'>
                        {(router.route != '/profile') &&
                            <button className={session ? 'px-4 py-3 xl:px-6 border text-black border-white rounded bg-green-300' : 'opacity-0'}
                                onClick={() => handleAdd(showcase)}>Add to library</button>}
                        {/* <h1 className='ml-10 p-4 opacity-50 rounded text-green-800 bg-slate-50 h-full '>Added to {showcase.drinkName} to library</h1> */}
                    </div>

                </div>
                <button className=' text-black absolute right-8' onClick={() => setShowcase('')}>X</button>

            </div>
        </div>
    )
}

export default Showcase
