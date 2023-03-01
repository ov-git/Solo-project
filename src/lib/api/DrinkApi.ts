import { Drink, DrinkApiType, ErrorType, User } from "@/Types";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://drinkzz.vercel.app";
// Drinks

const options = {
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
    options: options as RequestInit,
  });
};

export const getCocktail = () => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/filter.php?c=Cocktail`,
    options: options,
  });
};

export const getOrdinary = () => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/filter.php?c=Ordinary_Drink`,
    options: options,
  });
};

export const getById = (
  id: string
): Promise<{ drinks: DrinkApiType[] } | null> => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_DRINK_API_URL}/lookup.php?i=${id}`,
    options: options,
  });
};
