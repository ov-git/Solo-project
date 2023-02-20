import Image from "next/image";
import Link from "next/link";
import AddButton from "./AddButton";

function Drink({ drink }) {
  function truncate(name) {
    return name.length > 25 ? name.slice(0, 22) + "..." : name;
  }

  return (
    <div>
      <Link
        href={`/drink/${drink.idDrink}`}
        className="flex flex-col w-56 gap-4 p-3 bg-gray-800 h-68"
      >
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          height={200}
          width={200}
          className="rounded cursor-pointer group-hover:opacity-70"
        />
        <p className="font-bold">{truncate(drink.strDrink)}</p>
      </Link>
      <AddButton
        image={drink.strDrinkThumb}
        name={drink.strDrink}
        id={drink.idDrink}
      />
    </div>
  );
}

export default Drink;
