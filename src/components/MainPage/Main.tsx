"use client";
import { useEffect, useState } from "react";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search/Search";
import { Ingredient } from "types/Types";
import MyToggle from "./MyToggle";

function Main() {
  const [category, setCategory] = useState("popular");
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    setCategory("search");
  }, [ingredients]);

  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel setCategory={setCategory} category={category} />
      <Search setIngredients={setIngredients} />

      <div className="min-h-[75vh] flex justify-center 2xl:px-12">
        <MyToggle />
        <Drinks category={category} ingredients={ingredients} />
      </div>
    </div>
  );
}

export default Main;
