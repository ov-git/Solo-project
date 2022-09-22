
import React from 'react'
import Drink from './Drink';

function Drinks({ drinks,setShowcase }) {

    const drinkList = drinks;

    console.log(drinks);

    return (
        <div className="mx-2 grid sm:grid-cols-3 md:grid-cols-4 gap-4">
            {drinkList.map((drink) => (
                <Drink key={drink._id} drink={drink} setShowcase={setShowcase} />
            ))}
        </div>
    )
}

export default Drinks