"use client";

import {
  addDrinktoLibrary,
  deleteDrinkFromLibrary,
} from "../../lib/ApiService";
import { useState, FC } from "react";

type Props = {
  image: string;
  name: string;
  id: string;
  added: Boolean;
};

const AddButton: FC<Props> = ({ image, name, id, added }) => {
  const [saved, setSaved] = useState(added);

  const handleClick = () => {
    if (saved) {
      deleteDrinkFromLibrary(id);
    } else {
      addDrinktoLibrary({ image, name, id });
    }
    setSaved(!saved);
  };

  return (
    <div className="z-30 flex justify-end rounded">
      <button
        className="px-2 font-bold rounded bg-dDarkOrange"
        onClick={handleClick}
      >
        {saved ? "In Library" : "Add Drink"}
      </button>
    </div>
  );
};

export default AddButton;
