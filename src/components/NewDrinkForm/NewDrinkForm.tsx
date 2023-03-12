"use client";
import { createNewDrink } from "@/lib/api/UserApi";

import { useState } from "react";
import Page1 from "./Page1";
import Page2 from "./page2";
import Page3 from "./Page3";

const NewDrinkForm = () => {
  const [page, setPage] = useState(1);

  const [drinkName, setDrinkName] = useState("");
  const [drinkCategory, setDrinkCategory] = useState("");
  const [drinkInstructions, setDrinkInstructions] = useState("");
  const [drinkAlcoholic, setDrinkAlcoholic] = useState("");
  const [drinkGlass, setDrinkGlass] = useState("");
  const [drinkIngredients, setDrinkIngredients] = useState<string[]>([]);
  const [drinkMeasures, setDrinkMeasures] = useState<string[]>([]);
  const [drinkImageUrl, setDrinkImageUrl] = useState("");

  const saveCreatedDrink = async () => {
    const ingredients = formatIngredients(drinkIngredients);
    const measures = formatMeasures(drinkMeasures);
    const toAdd = {
      strDrink: drinkName,
      strAlcoholic: drinkAlcoholic,
      strCategory: drinkCategory,
      strGlass: drinkGlass,
      strInstructions: drinkInstructions,
      strDrinkThumb: drinkImageUrl,
      ...ingredients,
      ...measures,
    };
    const resp = await createNewDrink(toAdd);
    console.log("resp", resp);
  };

  const handleNextPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handlePrevPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const canContinue = () => {
    console.log(drinkImageUrl);
    if (page === 1) {
      if (
        drinkName &&
        drinkInstructions &&
        drinkCategory &&
        drinkAlcoholic &&
        drinkGlass
      ) {
        return false;
      }
      return true;
    } else if (page === 2) {
      if (drinkIngredients.length && drinkMeasures.length) {
        return false;
      }
      return true;
    } else {
      if (drinkImageUrl) {
        return false;
      }
      return true;
    }
  };

  const pages = [
    null,
    <Page1
      key={page}
      setDrinkName={setDrinkName}
      setDrinkInstructions={setDrinkInstructions}
      setDrinkAlcoholic={setDrinkAlcoholic}
      setDrinkCategory={setDrinkCategory}
      setDrinkGlass={setDrinkGlass}
    />,
    <Page2
      key={page}
      setDrinkIngredients={setDrinkIngredients}
      setDrinkMeasures={setDrinkMeasures}
    />,
    <Page3 key={page} setDrinkImageUrl={setDrinkImageUrl} />,
  ];

  return (
    <div className="flex justify-between flex-col h-[450px] w-[800px] bg-dLightGreen p-8 rounded text-white">
      <h1 className="text-xl font-bold">
        {page === 1
          ? "Upload new drink"
          : page === 2
          ? "Select ingredients and measures"
          : "Select image of drink"}
      </h1>
      <div className="flex flex-col w-full h-full max-h-[288px]">
        {pages[page]}
      </div>

      <div className="flex gap-4 ml-auto">
        <button
          disabled={page <= 1}
          className="text-white bg-dDarkOrange px-3 py-0.5 rounded-lg disabled:hidden"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <p>{page}/3</p>
        {page < 3 ? (
          <button
            disabled={canContinue()}
            className="text-white bg-dDarkOrange px-3 py-0.5 rounded-lg disabled:bg-gray-500"
            onClick={handleNextPage}
          >
            Next
          </button>
        ) : (
          <button
            disabled={canContinue()}
            className="text-white bg-dDarkOrange px-1 py-0.5 rounded-lg  disabled:bg-gray-500"
            onClick={saveCreatedDrink}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const formatIngredients = (ingredients: string[]) => {
  const res: {
    [key: string]: string;
  } = {};
  for (let i = 0; i < ingredients.length; i++) {
    res[`strIngredient${i + 1}`] = ingredients[i];
  }
  return res;
};
const formatMeasures = (measures: string[]) => {
  const res: {
    [key: string]: string;
  } = {};
  for (let i = 0; i < measures.length; i++) {
    res[`strMeasure${i + 1}`] = measures[i];
  }
  return res;
};

export default NewDrinkForm;
