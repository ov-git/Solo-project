import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import useDebounce from "@/lib/hooks/useDebounce";
import { DrinkWithDetails } from "types/Types";
import { searchByName } from "@/lib/api/DrinkApi";

const fetcher = async (
  term: string
): Promise<{ drinks: DrinkWithDetails[] }> => {
  const response = await searchByName(term);
  return response ? response : { drinks: [] };
};

const SearchByNameForm = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data } = useSWR(debouncedSearch ? debouncedSearch : null, fetcher);

  let list = null;
  if (data && Array.isArray(data.drinks)) {
    list = data.drinks;
  }
  return (
    <form className="flex flex-col items-center justify-center w-1/2 p-2">
      <label className="font-bold">Search by drink name:</label>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search drinks..."
        className="w-full p-3 py-1 text-xl text-black rounded"
      ></input>
      <ul className="w-full overflow-auto max-h-72">
        {list
          ? list.map((el) => (
              <Link
                href={`/drink/${el.idDrink}`}
                key={el.idDrink}
                className="flex w-full gap-4 p-3 px-8 text-lg text-black bg-white border-y"
              >
                <Image
                  src={el.strDrinkThumb}
                  alt={el.strDrink}
                  width={38}
                  height={38}
                  className="border border-black rounded max-h-[40px]"
                />
                <p>{el.strDrink}</p>
              </Link>
            ))
          : null}
      </ul>
    </form>
  );
};

export default SearchByNameForm;
