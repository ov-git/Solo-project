"use client";
import { useEffect, useState } from "react";
import {
  getPopular,
  getCocktail,
  getOrdinary,
  getUser,
} from "../../lib/ApiService";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search";
import { User } from "@/Types";

function Main() {
  const [currentDrinks, setCurrentDrinks] = useState([]);
  const [category, setCategory] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (category === "Cocktails") {
        const { drinks } = await getCocktail();
        if (drinks) {
          setCurrentDrinks(drinks);
        }
      } else if (category === "Ordinary Drinks") {
        const { drinks } = await getOrdinary();
        if (drinks) {
          setCurrentDrinks(drinks);
        }
      } else {
        const { drinks } = await getPopular();
        if (drinks) {
          setCurrentDrinks(drinks);
        }
      }
      const user = await getUser();
      if (user) {
        setUser(user.data);
      }
      // const ing = await getIngredientsList();
    };
    fetchData();
  }, [category]);

  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel setCategory={setCategory} />
      <Search />

      <div className="min-h-[75vh] flex justify-center 2xl:px-12">
        <Drinks drinks={currentDrinks} user={user} />
      </div>
    </div>
  );
}

export default Main;
