import { Drink, DrinkApiType, ErrorType, User } from "types/Types";

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

export const addDrinktoLibrary = async (drink: Drink) => {
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

export const deleteDrinkFromLibrary = async (id: { id: string }) => {
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
