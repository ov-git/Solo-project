import {
  Drink,
  DrinkApiType,
  DrinkWithDetails,
  ErrorType,
  User,
} from "types/Types";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://drinkzz.vercel.app";
// Drinks

const dataApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_DRINK_API_KEY || "",
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

type FetcherProps = {
  url: string;
  options?: RequestInit;
};

export const fetcher = async ({ url, options = {} }: FetcherProps) => {
  try {
    const response = await fetch(url, options);
    if (!response || !response.ok) {
      throw new Error("API call Error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("fetch error", err);
    return null;
  }
};

export const getPopular = async () => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/popular.php`,
    options: dataApiOptions as RequestInit,
  });
};

export const getCocktail = () => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/filter.php?c=Cocktail`,
    options: dataApiOptions,
  });
};

export const getOrdinary = () => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/filter.php?c=Ordinary_Drink`,
    options: dataApiOptions,
  });
};

export const getById = (
  id: string
): Promise<{ drinks: DrinkWithDetails[] } | null> => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/lookup.php?i=${id}`,
    options: dataApiOptions,
  });
};

export const registerUser = (
  url: string | null,
  user: { email: string; password: string }
) => {
  const userApiOptions = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (!url) {
    throw new Error("Path error");
  }
  return fetcher({ url: `/api/user${url}`, options: userApiOptions });
};

export const logUserOut = () => {
  const userApiOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetcher({ url: `/api/user/logout`, options: userApiOptions });
};

export const getUser = () => {
  const userApiOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const data = fetcher({ url: `/api/user`, options: userApiOptions });
  return data;
};

export const getswrUser = () => {
  const userApiOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const data = fetcher({ url: `/api/user`, options: userApiOptions });
  return data;
};

export const addDrinktoLibrary = async (drink: {
  image: string;
  name: string;
  id: string;
}) => {
  const userApiOptions = {
    method: "POST",
    body: JSON.stringify(drink),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const resp = await fetcher({ url: "/api/drink", options: userApiOptions });
  return resp;
};

export const deleteDrinkFromLibrary = async (id) => {
  const userApiOptions = {
    method: "DELETE",
    body: JSON.stringify(id),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const resp = await fetcher({ url: "/api/drink", options: userApiOptions });
  return resp;
};
