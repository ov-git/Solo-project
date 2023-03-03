import { Drink, User, UserWithDrinks } from "types/Types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useUser = () => {
  const { data, isLoading, error, mutate } = useSWR<{ data: UserWithDrinks }>(
    "/api/user",
    fetcher
  );

  console.log(data);

  let userDrinks: Drink[] | null = null;
  let userDrinkIds: string[] | null = null;
  let user: Partial<User> | null = null;

  if (data && Array.isArray(data.data?.drinks)) {
    userDrinks = data.data.drinks;
    userDrinkIds = data.data.drinks.map((el) => el.id);
  }

  if (data?.data) {
    user = {
      email: data.data.email,
      image: data.data.image,
    };
  }

  return {
    user,
    userDrinks,
    userDrinkIds,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
