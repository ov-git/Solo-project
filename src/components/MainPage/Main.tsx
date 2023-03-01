"use client";
import { useState } from "react";
import useSWR from "swr";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search";

function Main() {
  const [category, setCategory] = useState("popular");

  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel setCategory={setCategory} />
      <Search />

      <div className="min-h-[75vh] flex justify-center 2xl:px-12">
        <Drinks category={category} />
      </div>
    </div>
  );
}

export default Main;
