import { useState } from "react";
import { Combobox } from "@headlessui/react";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import useDebounce from "@/lib/hooks/useDebounce";
import { DrinkWithDetails } from "types/Types";
import { searchByName } from "@/lib/api/DrinkApi";
import { useRouter } from "next/navigation";

const fetcher = async (
  term: string
): Promise<{ drinks: DrinkWithDetails[] }> => {
  const response = await searchByName(term);
  return response ? response : { drinks: [] };
};

const SearchByNameForm = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const debouncedSearch = useDebounce(search);

  const { data } = useSWR(debouncedSearch ? debouncedSearch : null, fetcher);

  let list = null;
  if (data && Array.isArray(data.drinks)) {
    list = data.drinks;
  }
  return (
    <Combobox
      as={"form"}
      className="flex flex-col items-center justify-center w-1/2 p-2"
      onChange={(drink: DrinkWithDetails) => {
        router.push(`/drink/${drink.idDrink}`);
      }}
    >
      <Combobox.Label className="font-bold">
        Search by drink name:
      </Combobox.Label>
      <Combobox.Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search drinks..."
        className="w-full p-3 py-1 text-xl text-black rounded"
      />
      <Combobox.Options className="w-full overflow-auto max-h-72">
        {list
          ? list.map((drink) => (
              <Combobox.Option key={drink.idDrink} value={drink}>
                {({ active }) => (
                  <Link
                    href={`/drink/${drink.idDrink}`}
                    className={`flex w-full gap-4 p-3 px-8 text-lg text-black  border-y ${
                      active ? "bg-dLightGreen" : "bg-white"
                    }`}
                  >
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      width={38}
                      height={38}
                      className="border border-black rounded max-h-[40px]"
                    />
                    <p>{drink.strDrink}</p>
                  </Link>
                )}
              </Combobox.Option>
            ))
          : null}
      </Combobox.Options>
    </Combobox>
  );
};

export default SearchByNameForm;
