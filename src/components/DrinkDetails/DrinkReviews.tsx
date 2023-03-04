"use client";

import AddButton from "../MainPage/AddButton";

import { DrinkWithDetails } from "types/Types";

type Props = {
  drink: DrinkWithDetails;
};

const DrinkReviews = ({ drink }: Props) => {
  return (
    <div className="flex flex-col w-full h-full mt-8 max-w-[1200px] bg-white">
      <AddButton drink={drink} />
    </div>
  );
};

export default DrinkReviews;
