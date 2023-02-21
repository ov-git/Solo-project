import Image from "next/image";
import Link from "next/link";
import AddButton from "./AddButton";
import { DrinkApiType } from "@/Types";

type Props = {
  drink: DrinkApiType;
  added: Boolean;
  loggedIn: Boolean;
};

function Drink({ drink, added, loggedIn }: Props) {
  function truncate(name: string) {
    return name.length > 25 ? name.slice(0, 22) + "..." : name;
  }

  return (
    <div>
      <Link
        href={`/drink/${drink.idDrink}`}
        className="flex flex-col items-center p-2 rounded w-60 gap-y-4 h-68 hover:bg-dLightGreen"
      >
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          height={220}
          width={220}
          className="rounded cursor-pointer group-hover:opacity-70"
        />
        <p className="font-bold">{truncate(drink.strDrink)}</p>
      </Link>
      {loggedIn ? (
        <AddButton
          image={drink.strDrinkThumb}
          name={drink.strDrink}
          id={drink.idDrink}
          added={added}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Drink;
