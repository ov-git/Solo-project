"use client";
import { useState } from "react";
import useSWR from "swr";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search";

import { User } from "@/Types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Main() {
  const [category, setCategory] = useState("popular");
  const { data: user } = useSWR<{ data: User }>(`/api/user/`, fetcher);

  let userLibrary = null;
  if (user && Array.isArray(user.data?.drinks)) {
    userLibrary = user.data.drinks.map((el) => el.id);
  }

  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel setCategory={setCategory} />
      <Search />

      <div className="min-h-[75vh] flex justify-center 2xl:px-12">
        <Drinks
          category={category}
          user={user?.data}
          userLibrary={userLibrary}
        />
      </div>
    </div>
  );
}

export default Main;
