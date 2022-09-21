
export const getAll = async () => {
    const data = await fetch(`https://cocktail-recipes-tully4school.herokuapp.com/drinks`);
    const recipes = await data.json();

    return recipes.filter((drink) => drink.drinkNumber <= 100);
}

