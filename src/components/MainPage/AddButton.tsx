"use client";

import {
  addDrinktoLibrary,
  deleteDrinkFromLibrary,
} from "../../lib/ApiService";
import { useState, FC, useEffect } from "react";
import useUser from "@/lib/hooks/useUser";
import { DrinkApiType } from "@/Types";
import useSWRMutation from "swr/mutation";

type Props = {
  drink: DrinkApiType;
};

type sendRequestArgs = {
  arg: {
    id: string;
    image?: string;
    name?: string;
    method: string;
  };
};

async function sendRequest(url: string, { arg }: sendRequestArgs) {
  console.log(arg);

  return fetch(url, {
    method: arg.method,
    body: JSON.stringify(arg),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

const AddButton: FC<Props> = ({ drink }) => {
  const { trigger, isMutating } = useSWRMutation(
    "/api/drink",
    sendRequest /* options */
  );
  const { userDrinkIds } = useUser();
  const [saved, setSaved] = useState<boolean | null>(null);

  useEffect(() => {
    const checkInit = (list: string[] | null, id: string) => {
      if (list) {
        setSaved(list.includes(id));
      }
    };
    checkInit(userDrinkIds, drink.idDrink);
  }, [userDrinkIds?.values]);

  const handleClick = async () => {
    const { strDrink: name, strDrinkThumb: image, idDrink: id } = drink;
    if (saved) {
      const result = await trigger({ id, method: "DELETE" });
    } else {
      const result = await trigger({ image, name, id, method: "POST" });
    }
    setSaved(!saved);
  };

  if (!saved && saved !== false) return null;

  return (
    <div className="z-30 flex justify-end rounded">
      <button
        disabled={isMutating}
        className="px-2 font-bold rounded bg-dDarkOrange"
        onClick={handleClick}
      >
        {saved ? "In Library" : "Add Drink"}
      </button>
    </div>
  );
};

export default AddButton;
