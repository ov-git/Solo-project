import useSWR from "swr";
import { UserWithDrinks } from "../../Types";

const fetcher = async (): Promise<{ data: UserWithDrinks }> => {
  const res = await fetch("/api/user");
  const data = await res.json();
  return data;
};

const useUserDrinks = (id) => {
  const { data, mutate, isLoading } = useSWR(`/api/userDrink/${id}`, fetcher);
  console.log("hooking", data);

  return {
    drinks: data?.data.drinks,
  };
};

export default useUserDrinks;
