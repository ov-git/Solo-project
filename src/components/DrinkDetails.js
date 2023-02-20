import Image from "next/image";
import { getById } from "../lib/ApiService";

const getData = async (id) => {
  const data = await getById(id);
  return data;
  // const data = await getById()
};

const DrinkDetails = async ({ params }) => {
  const { id } = params;
  const { drinks } = await getData(id);
  const drink = drinks[0];
  console.log(drink);
  return (
    <div className="flex flex-col items-center text-black">
      <h1>{drink.strDrink}</h1>
      <div className="grid w-full grid-cols-6 max-w-[1200px]">
        <div className="w-full h-full col-span-3 bg-black">
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            height={600}
            width={600}
          />
        </div>
        <div className="flex flex-col justify-around col-span-3 gap-4 p-8 text-lg font-semibold bg-red-100">
          <p>{drink.strInstructions}</p>
          <div className="flex flex-col">
            {formatMeasures(drink).map((el) => (
              <p key={el}>{el}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const formatMeasures = (drink) => {
  const formated = [];
  for (let i = 1; i < 15; i++) {
    const ingredient = drink["strIngredient" + i];
    const measure = drink["strMeasure" + i];

    if (ingredient && measure) {
      formated.push(ingredient + " :  " + measure);
    }
  }
  return formated;
};

export default DrinkDetails;
