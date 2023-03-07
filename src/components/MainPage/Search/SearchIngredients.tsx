import { SetStateAction, useEffect, useState } from "react";

import useSWR from "swr";

import { getIngredients } from "@/lib/api/DrinkApi";

import { Ingredient } from "types/Types";

const fetcher = async (): Promise<Ingredient[]> => {
  const response = await getIngredients();
  return response ? response.drinks : [];
};

type Props = {
  setIngredients: React.Dispatch<SetStateAction<string[]>>;
};

const SearchIngredients = ({ setIngredients }: Props) => {
  const { data: ingredients } = useSWR("ingredients", fetcher);
  const [search, setSearch] = useState("");
  const [matched, setMatched] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<Ingredient[]>([]);

  useEffect(() => {
    const filter = (term: string) => {
      const filtered =
        ingredients?.filter((el) => {
          return el.strIngredient1.toLowerCase().includes(term.toLowerCase());
        }) || [];

      if (term) {
        setMatched(filtered);
      } else {
        setMatched([]);
      }
    };
    filter(search);
  }, [search, ingredients]);

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ingredient: Ingredient
  ) => {
    e.preventDefault();
    if (!selected.includes(ingredient) && selected.length <= 4) {
      setSelected((prev) => [...prev, ingredient]);
    }
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ingredient: Ingredient
  ) => {
    e.preventDefault();
    setSelected((prev) => prev.filter((el) => el !== ingredient));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toSubmit = selected.map((el) => el.strIngredient1);
    setIngredients(toSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full grid-cols-2">
      <div className="flex flex-col items-center w-full p-2">
        <label className="font-bold">Filter by Ingredients:</label>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Select ingredients..."
          className="w-full p-3 py-1 text-xl text-black rounded"
        />
        <ul className="flex flex-col w-full overflow-auto max-h-72">
          {matched.map((el) => (
            <button
              className="p-1 text-black bg-white border"
              onClick={(e) => handleSelect(e, el)}
              key={el.strIngredient1}
            >
              {el.strIngredient1}
            </button>
          ))}
        </ul>
      </div>
      {selected.length ? (
        <ul className="flex flex-col items-center h-48 p-2 text-black max-h-48">
          <br></br>
          {selected.map((el) => (
            <div
              className="flex justify-between w-full px-2 bg-white"
              key={el.strIngredient1}
            >
              <p>{el.strIngredient1}</p>
              <button onClick={(e) => handleDelete(e, el)}>X</button>
            </div>
          ))}
          <div className="flex justify-center w-full p-2 mt-auto">
            <button
              className="p-1 px-2 text-white rounded bg-dDarkOrange"
              type="submit"
            >
              Submit
            </button>
          </div>
        </ul>
      ) : null}
    </form>
  );
};

export default SearchIngredients;
