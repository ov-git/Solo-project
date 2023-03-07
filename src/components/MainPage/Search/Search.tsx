"use client";

import { SetStateAction } from "react";
import { Ingredient } from "types/Types";
import SearchByNameForm from "./SearchByNameForm";
import SearchIngredients from "./SearchIngredients";

type Props = {
  setIngredients: React.Dispatch<SetStateAction<string[]>>;
};

const Search = ({ setIngredients }: Props) => {
  return (
    <div className="flex justify-center h-48">
      <div className="absolute flex items-start justify-between w-full px-4 lg:px-24 max-w-[1400px]">
        <SearchByNameForm />
        <SearchIngredients setIngredients={setIngredients} />
      </div>
    </div>
  );
};

export default Search;
