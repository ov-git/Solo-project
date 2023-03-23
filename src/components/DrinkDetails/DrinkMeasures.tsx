"use client";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { DrinkWithDetails } from "types/Types";

type Props = {
  drink: DrinkWithDetails;
};

const DrinkMeasures = ({ drink }: Props) => {
  const [showMl, setShowMl] = useState(false);
  return (
    <div className="col-span-3">
      <h3 className="font-bold ">Ingredients:</h3>
      <div className="flex items-center gap-2">
        <p>oz</p>
        <Switch
          checked={showMl}
          onChange={setShowMl}
          className={`${
            showMl ? "bg-dLightGreen" : "bg-blue-600"
          } relative inline-flex h-4 w-9 items-center rounded-full`}
        >
          <span className="sr-only"></span>
          <span
            className={`${
              showMl ? "translate-x-5" : "translate-x-0"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          ></span>
        </Switch>
        <p>cl</p>
      </div>
      {formatMeasures(drink, showMl).map((el, i) => (
        <p key={el}>{el}</p>
      ))}
    </div>
  );
};

const formatMeasures = (drink: DrinkWithDetails, eu: boolean) => {
  const formated = [];
  for (let i = 1; i < 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof DrinkWithDetails];
    let measure = drink[`strMeasure${i}` as keyof DrinkWithDetails];

    const USREGEX = /oz$/gi;
    const EUREGEX = /cl$/gi;

    if (measure && USREGEX.test(measure.trim()) && eu) {
      const toEu =
        Math.round(convertToDecimal(measure) * 2.95735296875 * 10) / 10;
      measure = toEu + " cl";
    }

    if (measure && EUREGEX.test(measure.trim()) && eu === false) {
      const toUs =
        Math.round((convertToDecimal(measure) / 2.95735296875) * 10) / 10;
      measure = toUs + " oz";
    }

    if (ingredient && measure) {
      formated.push(ingredient + " :  " + measure);
    }
  }
  return formated;
};

const convertToDecimal = (s: string) => {
  let parts = s.split("/");
  if (parts.length === 1) {
    // There is no '/' in the string, so it is already a decimal value
    return parseFloat(parts[0]);
  } else if (parts.length === 2) {
    // The string contains a numerator and denominator separated by a '/'
    let numerator = parseFloat(parts[0]);
    let denominator = parseFloat(parts[1]);
    return numerator / denominator;
  } else {
    // The string contains more than one '/' character
    throw new Error("Invalid input string");
  }
};

export default DrinkMeasures;
