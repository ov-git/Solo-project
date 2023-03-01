import { Drink, DrinkApiType, ErrorType, User } from "@/Types";

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

export const getUser = () => {};

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
};

export const deleteDrinkFromLibrary = async (id: string) => {
  const userApiOptions = {
    method: "DELETE",
    body: id,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const resp = await fetcher({ url: "/api/drink", options: userApiOptions });
  return resp;
};
