
export const getAll = async () => {
    const data = await fetch(`https://cocktail-recipes-tully4school.herokuapp.com/drinks`);
    const drinks = await data.json();

    return drinks.filter((drink) => drink.drinkNumber <= 100);
}

export const getCategory = async (category) => {
    const data = await fetch(`https://cocktail-recipes-tully4school.herokuapp.com/drinks/category/${category}`);
    const drinks = await data.json();

    return drinks
}

export const getUserLibrary = async () => {

    try {
        const data = await fetch(`http://localhost:3000/api/drinks`)
        const drinks = await data.json();

        return drinks;

    } catch (err) {
        console.log(err);
    }

}

export const addDrinkToLibrary = async (drink) => {

    const data = await fetch(`http://localhost:3000/api/drinks`, {
        method: 'POST',
        body: JSON.stringify(drink),
        headers: {
            "Content-type": "application/json",
        }
    });

    const posted = await data.json();

    return posted;

}


export const deleteDrinkFromLibrary = async (drink) => {

    const data = await fetch(`http://localhost:3000/api/drinks`, {
        method: 'DELETE',
        body: JSON.stringify(drink),
        headers: {
            "Content-type": "application/json",
        }
    });

    const deleted = await data.json();

    console.log(deleted);

    return deleted;
}


