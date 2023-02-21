"use client";
import React from "react";
import { useState, useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = () => {
    // let filtered = drinks.filter((drink) => {
    //   return drink.drinkName.toLowerCase().includes(search.toLowerCase());
    // });
    return [];
  };
  return (
    <div>
      <form className="flex flex-col p-4 md:p-8 w-full sm:w-[60vw] lg:w-[40vw] xl:w-[35vw]">
        <label className="text-2xl">
          Search from:
          <span className="w-full py-1 text-2xl text-yellow-200">category</span>
        </label>

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search drinks..."
          className="p-3 py-1 mt-2 text-xl text-black rounded"
        ></input>
      </form>
    </div>
  );
};

export default Search;
