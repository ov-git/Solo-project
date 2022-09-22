
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

