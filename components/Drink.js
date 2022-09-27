import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Drink({ drink, setShowcase }) {

    function truncate(name) {
        return name.length > 30 ? name.slice(0, 20) + '...' : name;        
    }

    return (
        <div className=" h-full w-full p-3">
            <div className=" h-full w-full rounded bg-black bg-opacity-60 hover:bg-opacity-90">
                <Image src={drink.drinkThumb} alt={drink.drinkName} onClick={() => setShowcase(drink)} height={400} width={400} className='cursor-pointer rounded hover:opacity-70'/>
                <p className='ml-2 text-white text-[25px]'>{truncate(drink.drinkName)}</p>

            </div>
        </div>


    )
}

export default Drink