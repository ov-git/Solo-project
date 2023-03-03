"use client";

import { useState, FC, useEffect, memo } from "react";
import { Drink, DrinkApiType } from "types/Types";
import useSWR from "swr";
import { addDrinktoLibrary, deleteDrinkFromLibrary } from "@/lib/ApiService";

const addDrinkOptions = (adding: Drink) => {
  return {
    optimisticData: (drinks: Drink[]) => [...drinks, adding],
    rollbackOnError: true,
    populateCache: (added: Drink, drinks: Drink[]) => [...drinks, added],
    revalidate: false,
  };
};
const deleteDrinkOptions = (deleting: { id: string }) => {
  return {
    optimisticData: (drinks: Drink[]) =>
      drinks.filter((el) => el.id !== deleting.id),
    rollbackOnError: true,
    populateCache: (deleted: any, drinks: Drink[]) =>
      drinks.filter((el) => el.id !== deleting.id),
    revalidate: false,
  };
};

const fetcher = async () => {
  const res = await fetch("/api/user");
  const data = await res.json();
  return data.data.drinks;
};
type Props = {
  drink: DrinkApiType;
};

const AddButton: FC<Props> = ({ drink }) => {
  const { data, mutate, isLoading } = useSWR(
    `/api/user/${drink.idDrink}`,
    fetcher
  );

  let ids: string[] = [];
  if (data && Array.isArray(data)) {
    ids = data.map((el) => el.id);
  }

  const handleClick = async () => {
    if (!ids.includes(drink.idDrink)) {
      try {
        await mutate(
          addDrinktoLibrary({
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
          }),
          addDrinkOptions({
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
          })
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await mutate(
          deleteDrinkFromLibrary({
            id: drink.idDrink,
          }),
          deleteDrinkOptions({
            id: drink.idDrink,
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!data) return <div className="h-[24px]"></div>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="z-30 flex justify-end rounded">
      <button
        className="px-2 font-bold rounded bg-dDarkOrange"
        onClick={handleClick}
      >
        {ids.includes(drink.idDrink) ? "In Library" : "Add Drink"}
      </button>
    </div>
  );
};

export default AddButton;
