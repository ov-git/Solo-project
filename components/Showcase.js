import React from 'react'
import { useSession } from 'next-auth/react'
function Showcase({ showcase, setShowcase }) {

    const { data: session } = useSession();

    return (
        <div className='z-20 flex bg fixed top-[80px] h-[100vh] w-full '>
            <div className='fixed top-[80px] h-[100vh] w-full bg-black opacity-50' onClick={() => setShowcase('')}></div>
            <div className='flex m-4 xl:m-8 h-[75vh] lg:h-[80vh] opacity-100 z-30 bg-slate-700 w-full rounded  text-white'>

                <img className=" m-4 w-auto h-[90%] cursor-pointer rounded" src={showcase.drinkThumb} alt={showcase.drinkName} />



                <div className='flex flex-col p-4 justify-between'>
                    <h1>{showcase.drinkName}</h1>
                    <p className=' text-[1.2rem] xl:text-[1.5rem]'>{showcase.drinkInstructions}</p>

                    <div className='pt-1 xl:pt-6 flex-col'>
                        <h3 className=' text-[1.3rem] lg:text-[1.5rem]'>Ingredients:</h3>
                        {showcase.drinkIngredients.map((ing) => (
                            <p className='text-sm md:text-[1.3rem]' >{ing}</p>
                        ))}

                    </div>
                    <div className='xl:my-10'>

                        <button className={session ? 'px-4 py-3 xl:px-6 border border-white rounded' : 'hidden'} onClick={() => setShowcase('')}>Add to library</button>
                    </div>

                </div>
                <button className='p-100 text-black absolute right-8' onClick={() => setShowcase('')}>X</button>

            </div>
        </div>
    )
}

export default Showcase
