import categories from "@/lib/Categories";
import { Listbox } from "@headlessui/react";
import { SetStateAction, useState } from "react";

type Props = {
  setDrinkName: React.Dispatch<SetStateAction<string>>;
  setDrinkInstructions: React.Dispatch<SetStateAction<string>>;
  setDrinkCategory: React.Dispatch<SetStateAction<string>>;
  setDrinkAlcoholic: React.Dispatch<SetStateAction<string>>;
  setDrinkGlass: React.Dispatch<SetStateAction<string>>;
};

const Page1 = ({
  setDrinkName,
  setDrinkInstructions,
  setDrinkCategory,
  setDrinkAlcoholic,
  setDrinkGlass,
}: Props) => {
  const [instructions, setInstructions] = useState("");
  const [name, setName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState({
    name: "Select drink category",
  });
  const [selectedAlcohol, setSelectedAlcohol] = useState("Contains alcohol?");
  const [selectedGlass, setSelectedGlass] = useState("Select glass type");

  const handleSave = () => {
    setDrinkCategory(selectedCategory.name);
    setDrinkAlcoholic(selectedAlcohol);
    setDrinkName(name);
    setDrinkInstructions(instructions);
    setDrinkGlass(selectedGlass);
  };

  return (
    <>
      <label className="pt-3">Drink name</label>
      <input
        className="text-black "
        onChange={(e) => setName(e.target.value)}
      />
      <label className="pt-3">Drink instructions</label>
      <textarea
        onChange={(e) => setInstructions(e.target.value)}
        className="max-h-[200px] min-h-[100px] text-black"
        maxLength={600}
        wrap="soft"
      />

      <div className="relative grid grid-cols-2 gap-8 py-4 text-black">
        <Listbox
          as={"div"}
          value={selectedCategory}
          onChange={(select) => {
            console.log(select);
            setSelectedCategory(select);
          }}
          className="relative w-2/3 bg-white h-fit"
        >
          <Listbox.Button className="rounded">
            {selectedCategory.name}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-full bg-white rounded">
            {categories.map((category) => (
              <Listbox.Option
                key={category.name}
                value={category}
                className="cursor-pointer border-y"
              >
                {category.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <Listbox
          as={"div"}
          value={selectedAlcohol}
          onChange={(select) => {
            console.log(select);
            setSelectedAlcohol(select);
          }}
          className="relative w-2/3 bg-white cursor-pointer h-fit"
        >
          <Listbox.Button className="rounded">{selectedAlcohol}</Listbox.Button>
          <Listbox.Options className="absolute w-full bg-white rounded">
            {alcoholic.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className="cursor-pointer border-y"
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <Listbox
          as={"div"}
          value={selectedGlass}
          onChange={(select) => {
            console.log(select);
            setSelectedGlass(select);
          }}
          className="relative w-2/3 bg-white h-fit"
        >
          <Listbox.Button className="rounded">{selectedGlass}</Listbox.Button>
          <Listbox.Options>
            {glasses.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className="cursor-pointer border-y"
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <button
          onClick={() => handleSave()}
          disabled={
            selectedGlass === "Select glass type" ||
            selectedAlcohol === "Contains alcohol?" ||
            selectedCategory.name === "Select drink category"
          }
          className="absolute top-[80px] right-0 bg-dDarkOrange text-white w-24 rounded-lg disabled:bg-gray-500"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

const alcoholic = ["Alcoholic", "Non alcoholic", "Optional alcohol"];

const glasses = [
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned glass",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Cordial glass",
  "Brandy snifter",
  "White wine glass",
  "Nick and Nora Glass",
  "Hurricane glass",
  "Coffee mug",
  "Shot glass",
  "Jar",
  "Irish coffee cup",
  "Punch bowl",
  "Pitcher",
  "Pint glass",
  "Copper Mug",
  "Wine Glass",
  "Beer mug",
  "Margarita/Coupette glass",
  "Beer pilsner",
  "Beer Glass",
  "Parfait glass",
  "Mason jar",
  "Margarita glass",
  "Martini Glass",
  "Balloon Glass",
  "Coupe Glass",
];

export default Page1;
