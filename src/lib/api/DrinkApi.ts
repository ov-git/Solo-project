import axios from "axios";

import { DrinkApiType, DrinkWithDetails, Ingredient } from "types/Types";

const drinksApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DRINK_API_URL,
});

// Get
export const getPopular = async (): Promise<{
  drinks: DrinkApiType[];
} | null> => {
  const response = await drinksApi.get("/popular.php");
  return response.data;
};

export const getLatest = async (): Promise<{
  drinks: DrinkApiType[];
} | null> => {
  const response = await drinksApi.get("/latest.php");
  return response.data;
};

export const getByCategory = async (
  category: string
): Promise<{ drinks: DrinkApiType[] } | null> => {
  const response = await drinksApi.get(`/filter.php?c=${category}`);
  return response.data;
};

export const getDetailsById = async (
  id: string
): Promise<{ drinks: DrinkWithDetails[] } | null> => {
  const response = await drinksApi.get(`/lookup.php?i=${id}`);
  return response.data;
};

export const getIngredients = async (): Promise<{
  drinks: Ingredient[];
} | null> => {
  const response = await drinksApi.get(`/list.php?i=list`);
  return response.data;
};
//Search

export const searchByName = async (
  term: string
): Promise<{ drinks: DrinkWithDetails[] } | null> => {
  const response = await drinksApi.get(`/search.php?s=${term}`);
  return response.data;
};

export const searchByIngredient = async (
  term: string
): Promise<{ drinks: Ingredient[] } | null> => {
  const response = await drinksApi.get(`/search.php?i=${term}`);
  return response.data;
};

export const getDrinksByIngredients = async (
  ingredients: string[]
): Promise<{ drinks: DrinkApiType[] }> => {
  if (ingredients.length) {
    // const format = ingredients.join(",");
    const format = ingredients[0];
    const response = await drinksApi.get(`/filter.php?i=${format}`);
    return response.data;
  }
  return { drinks: [] };
};
