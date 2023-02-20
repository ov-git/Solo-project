"use client";

import { addDrinktoLibrary } from "../../lib/ApiService";

const AddButton = ({ image, name, id }) => {
  const handleClick = () => {
    // console.log(image, name);
    addDrinktoLibrary({ image, name, id });
  };

  return (
    <div className="z-30 bg-red-200">
      <button onClick={handleClick}>AddButton</button>
    </div>
  );
};

export default AddButton;
