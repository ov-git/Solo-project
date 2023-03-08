"use client";

import SearchByNameForm from "./SearchByNameForm";
import SearchIngredients from "./SearchIngredients";

type Props = {
  setToSearch: (ingredients: string[]) => void;
};

const Search = ({ setToSearch }: Props) => {
  return (
    <div className="flex justify-center h-48">
      <div className="absolute flex items-start justify-between w-full px-4 lg:px-24 max-w-[1400px]">
        <SearchByNameForm />
        <SearchIngredients setToSearch={setToSearch} />
      </div>
    </div>
  );
};

export default Search;
