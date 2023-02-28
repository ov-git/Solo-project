import useSWR from "swr";
import { DrinkApiType } from "@/Types";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_DRINK_API_KEY || "",
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

const fetcher = async (url: string): Promise<{ drinks: DrinkApiType[] }> => {
  const response = await fetch(url, options);
  return await response.json();
};

export default function useDrink(category: string) {
  const url =
    category == "popular"
      ? `${process.env.NEXT_PUBLIC_DRINK_API_URL}/popular.php`
      : `${process.env.NEXT_PUBLIC_DRINK_API_URL}/filter.php?c=${category}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  const drinks = data?.drinks && Array.isArray(data.drinks) ? data.drinks : [];

  return {
    drinks,
    isLoading,
    isError: error,
  };
}
