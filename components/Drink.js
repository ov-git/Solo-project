import React from 'react'
import Link from 'next/link'

function Drink({ drink, setShowcase }) {

    // console.log(setShowcase)

    const handleclick = () => {
        console.log(drink);

    }

    return (
        // <Link href={'/'}>
        <div className=" h-full w-full mt-1">
            <div className=" h-full w-full rounded bg-black">
                {/* <p>{drink.drinkName}</p> */}
                <img className=" cursor-pointer rounded hover:opacity-80" src={drink.drinkThumb} alt={drink.drinkName} onClick={() => setShowcase(drink)} />

            </div>

            {/* <Link href={'/'}> <a>{drink.drinkName} </a></Link> */}
            {/* <Link href={`/details/${drink.drinkName}`}><a>{drink.drinkName}</a></Link> */}
        </div>
        // </Link>

    )
}

export default Drink