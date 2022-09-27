
import React from 'react'
import Drink from './Drink';

function Drinks({ drinks,setShowcase }) {

    const drinkList = drinks;

    return (
        <div className="mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1860px]">
            {drinkList.map((drink) => (
                <Drink key={drink._id} drink={drink} setShowcase={setShowcase} />
            ))}
        </div>
    )
}

export default Drinks