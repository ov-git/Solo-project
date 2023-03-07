import useSWR from "swr";
import { DrinkApiType, Ingredient } from "types/Types";
import {
  getByCategory,
  getDrinksByIngredients,
  getPopular,
} from "../api/DrinkApi";

type FetcherArguments = {
  category: string;
  ingredients: string[];
};

const fetcher = async ({
  category,
  ingredients,
}: FetcherArguments): Promise<{ drinks: DrinkApiType[] }> => {
  const response =
    category === "popular"
      ? await getPopular()
      : category === "search"
      ? await getDrinksByIngredients(ingredients)
      : await getByCategory(category);
  return response ? response : { drinks: [] };
};

export default function useDrink(category: string, ingredients: string[] = []) {
  const { data, error, isLoading } = useSWR({ category, ingredients }, fetcher);

  const drinks = data?.drinks && Array.isArray(data.drinks) ? data.drinks : [];

  return {
    drinks,
    isLoading,
    isError: error,
  };
}
