
import React from 'react'
import Drink from './Drink';

function Drinks({ drinks }) {

    const drinkList = drinks;

    return (
        <div className="w-full h-screen bg-slate-500 grid sm:grid-cols-3 gap-1">
            {drinkList.map((drink) => (
                <Drink key={drink._id} drink={drink}/>
            ))}
        </div>
    )
}

export default Drinks