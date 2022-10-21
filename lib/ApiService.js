// Drinks
export const getAll = async () => {
    const data = await fetch(`https://cocktail-recipes-tully4school.herokuapp.com/drinks`);
    const drinks = await data.json();
    return drinks.filter((drink) => drink.drinkNumber);
}

export const getCategory = async (category) => {

    const data = await fetch(`https://cocktail-recipes-tully4school.herokuapp.com/drinks/category/${category}`);
    const drinks = await data.json();

    return drinks
}

export const getUserLibrary = async (email) => {

    try {
        const data = await fetch(`http://localhost:3000/api/drinks/${email}`);
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

    return deleted;
}

export const newList = async (list) => {

    console.log(list)

    const data = await fetch(`http://localhost:3000/api/list`, {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {
            "Content-type": "application/json",
        }
    });

    const created = await data.json();
    return created;
}

// Users

export const newUser = async (user) => {

    try {

        const data = await fetch(`http://localhost:3000/api/user/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json",
            }
        });

        const registered = await data.json();
        return registered;
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async (user) => {

    try {
        const data = await fetch(`http://localhost:3000/api/user`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json",
            }
        });
    } catch (err) {
        console.log(err);
    }
}


