import { useState } from "react";
import { Combobox } from "@headlessui/react";

import useSWR from "swr";

import { getIngredients } from "@/lib/api/DrinkApi";

import { Ingredient } from "types/Types";

const fetcher = async (): Promise<Ingredient[]> => {
  const response = await getIngredients();
  return response ? response.drinks : [];
};

type Props = {
  setToSearch: (ingredients: string[]) => void;
};

const SearchIngredients = ({ setToSearch }: Props) => {
  const { data: ingredients } = useSWR("ingredients", fetcher);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ingredient[]>([]);

  const filtered =
    ingredients?.filter((el) => {
      return el.strIngredient1.toLowerCase().includes(search.toLowerCase());
    }) || [];

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ingredient: Ingredient
  ) => {
    e.preventDefault();
    const afterDelete = selected.filter((el) => el !== ingredient);
    setSelected(afterDelete);
    setToSearch(afterDelete.map((el) => el.strIngredient1));
  };

  const handleChange = (ingredients: Ingredient[]) => {
    setSelected(ingredients);
    setToSearch(ingredients.map((el) => el.strIngredient1));
  };

  return (
    <Combobox
      as={"form"}
      value={selected}
      multiple
      className="grid w-full grid-cols-2"
      onChange={(ingredients: Ingredient[]) => {
        if (selected.length <= 4) {
          handleChange(ingredients);
        }
      }}
    >
      <div className="flex flex-col items-center w-full p-2">
        <Combobox.Label className="font-bold">
          Filter by Ingredients:
        </Combobox.Label>
        <Combobox.Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Select ingredients..."
          className="w-full p-3 py-1 text-xl text-black rounded"
        />
        <Combobox.Options className="flex flex-col w-full overflow-auto max-h-72">
          {search.length
            ? filtered.map((ingredient) => (
                <Combobox.Option
                  key={ingredient.strIngredient1}
                  value={ingredient}
                >
                  {({ active }) => (
                    <div
                      className={`p-1 w-full text-black border ${
                        active ? "bg-dLightGreen" : "bg-white"
                      }`}
                      // onClick={(e) => handleSelect(e, ingredient)}
                    >
                      {ingredient.strIngredient1}
                    </div>
                  )}
                </Combobox.Option>
              ))
            : null}
        </Combobox.Options>
      </div>

      {/* //Currently selected ingredients */}
      {selected.length ? (
        <ul className="flex flex-col items-center gap-1 h-48 p-2 text-black max-h-48 ">
          <p className="text-white font-bold">Currently selected</p>
          {selected.map((el) => (
            <div
              className="flex justify-between w-full px-2 bg-white rounded"
              key={el.strIngredient1}
            >
              <p>{el.strIngredient1}</p>
              <button onClick={(e) => handleDelete(e, el)}>X</button>
            </div>
          ))}
        </ul>
      ) : null}
    </Combobox>
  );
};

export default SearchIngredients;
