import { getCocktail } from "../../lib/ApiService";
import Drink from "./Drink";

const getData = async () => {
  const data = await getCocktail();
  return data;
};

export default async function Drinks() {
  const { drinks } = await getData();

  return (
    <div className="mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 lg:gap-4 max-w-[1860px]">
      {drinks.map((drink) => (
        <Drink key={drink.idDrink} drink={drink} />
      ))}
    </div>
  );
}

// export default Drinks;
