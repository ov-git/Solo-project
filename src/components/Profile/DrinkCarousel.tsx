"use client";
import Image from "next/image";
import Link from "next/link";
import { deleteDrinkFromLibrary } from "../../lib/ApiService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Drink } from "@/Types";

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
      <div className="flex w-full gap-4 h-[350px] max-w-[1600px] self-center">
        {savedDrinks.map((el) => (
          <div
            key={el.id}
            className="flex flex-col items-center justify-center h-full p-2 text-white rounded-md hover:bg-dLightGreen"
          >
            <p className="font-bold">{el.name}</p>
            <Image
              className="rounded-md"
              src={el.image}
              alt={el.name}
              width={300}
              height={300}
            />
            <div className="flex justify-between w-full ">
              <Link className="font-bold underline" href={`drink/${el.id}`}>
                Details
              </Link>
              <button onClick={(e) => handleDelete(e, el.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full gap-5 px-6 py-4 text-white">
        <button
          className="disabled:text-gray-500"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <p>
          Page {page}/{Math.ceil(drinks?.length / 5)}
        </p>
        <button
          className="disabled:text-gray-500"
          disabled={page >= Math.ceil(drinks?.length / 5)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DrinkCarousel;
