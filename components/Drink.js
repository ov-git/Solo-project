import React from 'react'

function Drink({drink}) {

    return (
        <div>
            <img src={drink.drinkThumb} alt={drink.drinkName} onClick={() => console.log(drink)} />
            <h1> {drink.drinkName} </h1>
        </div >

    )
}

export default Drink