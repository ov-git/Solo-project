// import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getAll, getCategory, getPopular } from "../../lib/ApiService";

import Drinks from "./Drinks";
import CategoryCarousel from "./CategoryCarousel";
import Search from "./Search";

function Main() {
  return (
    <div className="flex-col w-full h-full text-white ">
      <CategoryCarousel />
      <Search />

      <div className="min-h-[75vh] flex justify-center 2xl:px-12">
        <Drinks />
      </div>
    </div>
  );
}

export default Main;
