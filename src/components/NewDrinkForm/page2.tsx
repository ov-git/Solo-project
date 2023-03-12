import { SetStateAction, useState } from "react";

type Ingredient = {
  name: string;
  measure: string;
};

type Props = {
  setDrinkIngredients: React.Dispatch<SetStateAction<string[]>>;
  setDrinkMeasures: React.Dispatch<SetStateAction<string[]>>;
};

const Page2 = ({ setDrinkIngredients, setDrinkMeasures }: Props) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newIngredient: Ingredient
  ) => {
    e.preventDefault();
    if (
      ingredients.length < 15 &&
      !ingredients.map((el) => el.name).includes(newIngredient.name)
    ) {
      setIngredients((prev) => [...prev, newIngredient]);
    }
  };

  const removeIngredient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newIngredient: Ingredient
  ) => {
    e.preventDefault();
    setIngredients((prev) =>
      prev.filter((el) => el.name !== newIngredient.name)
    );
  };

  const handleSave = () => {
    console.log(ingredients);
    setDrinkIngredients(ingredients.map((el) => el.name));
    setDrinkMeasures(ingredients.map((el) => el.measure));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col w-full gap-2 overflow-y-auto h-5/6">
        {ingredients.map((el) => (
          <div
            className="grid w-1/2 grid-cols-2 px-4 font-semibold"
            key={el.name}
          >
            <p>{el.name}</p>
            <div className="flex justify-between w-1/2 px-2">
              <p>{el.measure}</p>
              <button
                className="p-1 py-0 text-black bg-white rounded-full"
                onClick={(e) => removeIngredient(e, el)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <Ingredient addIngredient={addIngredient} />
      <button
        onClick={() => handleSave()}
        disabled={ingredients.length === 0}
        className="w-24 mt-2 ml-auto font-bold text-white rounded-lg bg-dDarkOrange disabled:bg-gray-500"
      >
        Confirm
      </button>
    </div>
  );
};

type IngredientProps = {
  addIngredient: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newIngredient: Ingredient
  ) => void;
};

const Ingredient = ({ addIngredient }: IngredientProps) => {
  const [name, setName] = useState("");
  const [measure, setMeasure] = useState("");
  return (
    <div className="grid justify-between grid-cols-6 gap-6 text-black">
      <div className="flex flex-col col-span-3">
        <label className="font-bold text-white">Ingredient name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-bold text-white">Ingredient amount</label>
        <input value={measure} onChange={(e) => setMeasure(e.target.value)} />
      </div>
      <button
        className="self-end bg-white rounded full h-1/2"
        onClick={(e) => {
          setName("");
          setMeasure("");
          addIngredient(e, { name, measure });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Page2;
