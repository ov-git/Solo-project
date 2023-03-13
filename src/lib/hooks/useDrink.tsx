import useSWR from "swr";
import { DrinkApiType } from "types/Types";
import {
  getByCategory,
  getDrinksByIngredients,
  getPopular,
} from "../api/DrinkApi";
import { getLocalByCategory } from "../api/UserApi";

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
      : // : await getByCategory(category);
        await handleCategoryFetch(category);
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

const handleCategoryFetch = async (category: string) => {
  const result = await Promise.all([
    getByCategory(category),
    getLocalByCategory(category),
  ]);
  const temp = result.map((el) => el?.drinks || []);

  return {
    drinks: temp.flat().sort((a, b) => a.strDrink.localeCompare(b.strDrink)),
  };
};
