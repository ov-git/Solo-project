import React from 'react'
import Link from 'next/link'

function Drink({ drink }) {

    const handleclick = () => {
        console.log(drink);

    }

    return (
        // <Link href={'/'}>
            <div className=" h-full w-full mt-[100px]">
                <img className=" cursor-pointer" src={drink.drinkThumb} alt={drink.drinkName} onClick={() => handleclick()} />
                <h1> {drink.drinkName} </h1>
            </div>
        // </Link>

    )
}

export default Drink