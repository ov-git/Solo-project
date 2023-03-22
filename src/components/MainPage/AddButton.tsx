"use client";

import { FC } from "react";
import { Drink, DrinkApiType } from "types/Types";
import useSWR from "swr";
import {
  addDrinktoLibrary,
  deleteDrinkFromLibrary,
  getUser,
} from "@/lib/api/UserApi";

const fetcher = async (): Promise<Drink[] | undefined> => {
  const data = await getUser();
  return data ? data.drinks : undefined;
};
type Props = {
  drink: DrinkApiType;
};

const AddButton: FC<Props> = ({ drink }) => {
  const {
    data: userDrinks,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(`/api/user/`, fetcher);

  if (!userDrinks) return null;
  if (isLoading) return <p>Loading...</p>;

  const toSend: Drink = {
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
  };

  const isAdded = userDrinks.map((el) => el.id).includes(drink.idDrink);

  const handleClick = async () => {
    if (isAdded) {
      const response = deleteDrinkFromLibrary(toSend.id);
      mutate([...userDrinks.filter((el) => el.id !== toSend.id)], {
        revalidate: false,
        rollbackOnError: true,
      });
    } else {
      const response = await addDrinktoLibrary(toSend);
      mutate([...userDrinks, toSend], {
        revalidate: false,
        rollbackOnError: true,
      });
    }
  };

  return (
    <div className="z-30 flex justify-end rounded">
      <button
        className="px-2 font-bold rounded bg-dDarkOrange"
        onClick={handleClick}
        disabled={isValidating || isLoading}
      >
        {isAdded ? "In Library" : "Add Drink"}
      </button>
    </div>
  );
};

export default AddButton;
