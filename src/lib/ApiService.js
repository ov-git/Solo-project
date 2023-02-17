const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://drinkzz.vercel.app";
// Drinks
export const getAll = async () => {
  const data = await fetch(
    `https://cocktail-recipes-tully4school.herokuapp.com/drinks`
  );
  console.log(data);
  //   const drinks = await data.json();
  //   return drinks.filter((drink) => drink.drinkNumber);
};

export const getCategory = async (category) => {
  const data = await fetch(
    `https://cocktail-recipes-tully4school.herokuapp.com/drinks/category/${category}`
  );
  const drinks = await data.json();

  return drinks;
};

export const getUserLibrary = async (email) => {
  try {
    const data = await fetch(`${url}/api/drinks/${email}`);
    const drinks = await data.json();

    return drinks;
  } catch (err) {
    console.log(err);
  }
};

export const addDrinkToLibrary = async (drink) => {
  console.log(drink);

  const data = await fetch(`${url}/api/drinks`, {
    method: "POST",
    body: JSON.stringify(drink),
    headers: {
      "Content-type": "application/json",
    },
  });

  const posted = await data.json();
  return posted;
};

export const deleteDrinkFromLibrary = async (drink) => {
  const data = await fetch(`${url}/api/drinks`, {
    method: "DELETE",
    body: JSON.stringify(drink),
    headers: {
      "Content-type": "application/json",
    },
  });
  const deleted = await data.json();

  return deleted;
};

export const newList = async (list) => {
  const data = await fetch(`${url}/api/list`, {
    method: "POST",
    body: JSON.stringify(list),
    headers: {
      "Content-type": "application/json",
    },
  });

  const created = await data.json();
  return created;
};

// Users

export const newUser = async (user) => {
  try {
    const data = await fetch(`${url}/api/user/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });

    const registered = await data.json();
    return registered;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (user) => {
  try {
    const data = await fetch(`${url}/api/user`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const loggedIn = await data.json();
    return loggedIn;
  } catch (err) {
    console.log(err);
  }
};

export const getMe = async () => {
  const res = await fetch(`${url}/api/user/me`);
  const data = await res.json();
  return data;
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${url}/api/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};
