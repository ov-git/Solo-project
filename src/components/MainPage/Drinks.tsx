"use client";
import { DrinkApiType, User } from "@/Types";
import { getCocktail, getPopular, getOrdinary } from "../../lib/ApiService";
// import { getUserFromCookie } from "../../lib/auth";
// import { cookies } from "next/headers";
import Drink from "./Drink";

// const getData = async ({ params }) => {
//   const category = params?.category || "";
//   const user = await getUserFromCookie(cookies());

//   if (category === "cocktails") {
//     const { drinks } = await getCocktail();
//     return { drinks, user };
//   } else if (category === "ordinary-drinks") {
//     const { drinks } = await getOrdinary();
//     return { drinks, user };
//   }
//   const { drinks } = (await getPopular()) || [];
//   return { drinks, user };
// };

type Props = {
  drinks: DrinkApiType[];
  user: User | null;
};

export default function Drinks({ drinks, user }: Props) {
  const userLibrary = user?.drinks.map((el) => el.id);

  return (
    <div className="mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 lg:gap-4 max-w-[1860px]">
      {drinks.map((drink) => (
        <Drink
          key={drink.idDrink}
          drink={drink}
          added={userLibrary?.includes(drink.idDrink) || false}
          loggedIn={!!user}
        />
      ))}
    </div>
  );
}
