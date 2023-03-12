"use client";
import { useEffect, useState } from "react";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search/Search";

const getStored = () => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem("category");
    return item ? item : "popular";
  }
  return "popular";
};

function Main() {
  const [category, setCategory] = useState(getStored());
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const storedIngedients = localStorage.getItem("ingredients");
    if (storedIngedients) {
      setIngredients(JSON.parse(storedIngedients));
    }
  }, []);

  const setToSearch = (ingredients: string[]) => {
    if (ingredients.length) {
      setIngredients(ingredients);
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
      setCategory("search");
    } else {
      setCategory("popular");
    }
  };

  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel setCategory={setCategory} category={category} />
      <Search setToSearch={setToSearch} />

      <div className="min-h-[75vh] flex flex-col items-center 2xl:px-12">
        <Drinks category={category} ingredients={ingredients} />
      </div>
    </div>
  );
}

export default Main;
