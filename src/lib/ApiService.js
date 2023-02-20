const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://drinkzz.vercel.app";
// Drinks

const dataApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.DRINK_API_KEY,
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

const fetcher = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopular = async () => {
  return fetcher(`${process.env.DRINK_API_URL}/popular.php`, dataApiOptions);
};

export const getCocktail = () => {
  return fetcher(
    `${process.env.DRINK_API_URL}/filter.php?c=Cocktail`,
    dataApiOptions
  );
};

export const getById = (id) => {
  return fetcher(
    `${process.env.DRINK_API_URL}/lookup.php?i=${id}`,
    dataApiOptions
  );
};

//User

export const registerUser = (url, user) => {
  const userApiOptions = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  fetcher(`api/user${url}`, userApiOptions);
};

export const addDrinktoLibrary = async (drink) => {
  const userApiOptions = {
    method: "POST",
    body: JSON.stringify(drink),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const resp = await fetcher("api/user", userApiOptions);
  console.log(resp);
};
