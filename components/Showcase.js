import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { addDrinkToLibrary } from '../lib/ApiService'

function Showcase({ showcase, setShowcase }) {

    const { data: session } = useSession();

    const handleAdd = async (adding) => {
        adding.userEmail = session.user.email;
        const from = await addDrinkToLibrary(adding);
        setShowcase('');
    }

    function check(parsing) {
        if (showcase.drinkMeasures.length < showcase.drinkIngredients.length) {
            try {
                return JSON.parse(showcase.drinkMeasures);
            } catch (err) {}
        }
        return parsing;
    }

    return (
        <div className='z-20 flex bg fixed top-[70px] xl:top-[80px] h-[100vh] w-full'>

            <div className='fixed top-[80px] h-[100vh] w-full bg-black opacity-50' onClick={() => setShowcase('')}></div>
            <div className='flex m-4 xl:m-8 h-[75vh] lg:h-[80vh] opacity-100 z-30 bg-slate-600 w-full rounded text-white'>

                <img className=" m-4 w-auto max-w-[50%] h-[80%] cursor-pointer rounded" src={showcase.drinkThumb} alt={showcase.drinkName} />

                <div className='flex flex-col p-4 justify-between'>
                    <h1 className='pb-2 text-5xl text-green-200'>{showcase.drinkName}</h1>
                    <p className=' text-[1.2rem] xl:text-[1.5rem] py-3'>{showcase.drinkInstructions}</p>

                    <div className='pt-1 xl:pt-6 flex-col'>
                        <h3 className=' text-[1.3rem] lg:text-3xl pb-4'>Ingredients:</h3>
                        {showcase.drinkIngredients ? showcase.drinkIngredients.map((ing, i) => (
                            <div key={i} className='grid grid-cols-2 w-full'>
                                <p className='text-sm py-1 px-2 md:text-[1.3rem] lg:text-[1.7rem] border-r' >{ing}</p>
                                <p className='text-sm py-1 px-2 2xl:p-2 md:text-[1.3rem] ' >{check(showcase.drinkMeasures)[i]}</p>
                            </div>
                        )) : <></>}

                    </div>
                    <div className='xl:my-10 flex items-center'>
                        <button className={session ? 'px-4 py-3 xl:px-6 border text-black border-white rounded bg-green-300' : 'opacity-0'}
                            onClick={() => handleAdd(showcase)}>Add to library</button>
                        {/* <h1 className='ml-10 p-4 opacity-50 rounded text-green-800 bg-slate-50 h-full '>Added to {showcase.drinkName} to library</h1> */}
                    </div>

                </div>
                <button className=' text-black absolute right-8' onClick={() => setShowcase('')}>X</button>

            </div>
        </div>
    )
}

export default Showcase
