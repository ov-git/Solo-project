"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteDrinkFromLibrary } from "@/lib/api/UserApi";

import { Drink } from "types/Types";
import PageControls from "./PageControls";

type Props = {
  drinks: Drink[];
};

const DrinkCarousel = ({ drinks }: Props) => {
  const [savedDrinks, setSavedDrinks] = useState<Drink[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    await deleteDrinkFromLibrary(id);
    router.refresh();
  };

  useEffect(() => {
    const filterDrinks = () => {
      const slice = page * 5 - 5;
      const show = drinks.slice(slice, slice + 5);
      return show;
    };
    setSavedDrinks(filterDrinks());
  }, [drinks, page]);

  return (
    <>
      <div className="lg:hidden">
        <PageControls page={page} setPage={setPage} length={drinks.length} />
      </div>

      <div className="flex flex-col h-full lg:flex-row w-full gap-4 lg:h-[350px] max-w-[1600px] self-center">
        {savedDrinks.map((el) => (
          <div
            key={el.id}
            className="flex flex-col items-center justify-center h-full p-2 text-white rounded-md hover:bg-dLightGreen"
          >
            <p className="text-xl font-bold ">{el.name}</p>
            <Image
              className="rounded-md"
              src={el.image}
              alt={el.name}
              width={300}
              height={300}
            />
            <div className="flex justify-between w-full max-w-[300px]">
              <Link className="font-bold underline" href={`drink/${el.id}`}>
                Details
              </Link>
              <button onClick={(e) => handleDelete(e, el.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <PageControls page={page} setPage={setPage} length={drinks.length} />
    </>
  );
};

export default DrinkCarousel;
