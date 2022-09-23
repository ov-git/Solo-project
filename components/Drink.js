import React from 'react'
import Link from 'next/link'

function Drink({ drink, setShowcase }) {

    function truncate(name) {

        

        return name.length > 30 ? name.slice(0, 20) + '...' : name;
        
    }


    return (
        <div className=" h-full w-full mt-1">
            <div className=" h-full w-full rounded bg-black bg-opacity-60 hover:bg-opacity-80">
                <img className="cursor-pointer rounded hover:opacity-80" src={drink.drinkThumb} alt={drink.drinkName} onClick={() => setShowcase(drink)} />
                <p className='ml-2 text-white text-[25px]'>{truncate(drink.drinkName)}</p>

            </div>
        </div>


    )
}

export default Drink