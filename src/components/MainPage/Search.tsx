"use client";
import { DrinkWithDetails } from "types/Types";
import React from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import useDebounce from "@/lib/hooks/useDebounce";

const fetcher = async (
  term: string
): Promise<{ drinks: DrinkWithDetails[] } | undefined> => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_DRINK_API_KEY || "",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };
  const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${term}`;
  const response = await fetch(url, options);
  return response.json();
};

const Search = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data } = useSWR(debouncedSearch ? debouncedSearch : null, fetcher);

  let list = null;
  if (data && Array.isArray(data.drinks)) {
    list = data.drinks;
  }

  return (
    <div className="flex h-36">
      <div className="absolute flex flex-col items-center w-1/3 px-24">
        <form className="flex flex-col items-center justify-center w-full p-2">
          <label className="font-bold">Search by drink name:</label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search drinks..."
            className="w-full p-3 py-1 mt-2 text-xl text-black rounded"
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
      </div>
    </div>
  );
};

export default Search;
