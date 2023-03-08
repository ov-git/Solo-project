"use client";
import { useState } from "react";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search/Search";

function Main() {
  const [category, setCategory] = useState("popular");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const setToSearch = (ingredients: string[]) => {
    if (ingredients.length) {
      setIngredients(ingredients);
      setCategory("search");
    } else {
      setCategory("popular");
    }
  };

  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel setCategory={setCategory} category={category} />
      <Search setToSearch={setToSearch} />

      <div className="min-h-[75vh] flex justify-center 2xl:px-12">
        <Drinks category={category} ingredients={ingredients} />
      </div>
    </div>
  );
}

export default Main;
