import axios from "axios";

import { CreatedDrink, Drink, DrinkApiType, User } from "types/Types";

const userApi = axios.create({});

export const registerUser = async (
  url: string | null,
  user: { email: string; password: string }
): Promise<User | undefined> => {
  const response = await userApi.post(`/api/user${url}`, {
    user,
  });
  return response.data;
};

export const addDrinktoLibrary = async (
  drink: Drink
): Promise<Drink | undefined> => {
  const response = await userApi.post("/api/drink", {
    drink,
  });
  console.log(response);
  return response.data;
};

export const deleteDrinkFromLibrary = async (
  id: string
): Promise<Drink | undefined> => {
  const response = await userApi.delete("/api/drink", {
    data: id,
  });
  console.log(response);
  return response.data;
};

export const createNewDrink = async (drink: Partial<CreatedDrink>) => {
  const response = await userApi.post("/api/drink/create", {
    drink,
  });
  return response.data;
};

export const getLocalByCategory = async (
  category: string
): Promise<{
  drinks: DrinkApiType[];
} | null> => {
  const response = await userApi.get(`/api/drink/list?category=${category}`);
  return response.data;
};
