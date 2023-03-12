import Image from "next/image";
import Link from "next/link";

import { getDetailsById } from "@/lib/api/DrinkApi";

import DrinkReviews from "./DrinkReviews";

import { DrinkWithDetails } from "types/Types";

const getData = async (id: string) => {
  const data = await getDetailsById(id);
  if (data && data.drinks) {
    return data.drinks[0];
  }
  return null;
};

type Props = {
  params: { id: string };
};

const DrinkDetails = async ({ params }: Props) => {
  const { id } = params;
  const drink = (await getData(id)) || null;
  return drink ? (
    <div className="flex flex-col items-center text-black">
      <div className="flex w-full p-8 pt-12 items-center max-w-[1200px]">
        <Link
          href="/"
          className="self-end text-white underline underline-offset-2"
        >
          Back home
        </Link>
        <h1 className="text-3xl absolute font-bold ml-[25%] text-dYellow">
          {drink.strDrink}
        </h1>
      </div>
      <div className="grid w-full md:grid-cols-2 gap-4 max-w-[1200px] bg-dLightGreen p-3 rounded-md">
        <div className="w-full h-full">
          <Image
            className="rounded-md"
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            height={570}
            width={570}
          />
        </div>
        <div className="flex flex-col justify-around gap-4 p-8 text-lg rounded-md bg-dYellow">
          <p>{drink.strInstructions}</p>
          <div className="grid grid-cols-2">
            <div className="">
              <h3 className="font-bold ">Ingredients:</h3>
              {formatMeasures(drink).map((el, i) => (
                <p key={el}>{el}</p>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-8 ml-8">
              <div>
                <p>Served from:</p>
                <p>{drink.strGlass}</p>
              </div>
              <p>Drink type: {drink.strAlcoholic}</p>
            </div>
          </div>
        </div>
      </div>
      <DrinkReviews drink={drink} />
    </div>
  ) : (
    <h1>Error</h1>
  );
};

const formatMeasures = (drink: DrinkWithDetails) => {
  const formated = [];
  for (let i = 1; i < 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof DrinkWithDetails];
    const measure = drink[`strMeasure${i}` as keyof DrinkWithDetails];

    if (ingredient && measure) {
      formated.push(ingredient + " :  " + measure);
    }
  }
  return formated;
};

export default DrinkDetails;
