import { useSession } from "next-auth/react";
import { addDrinkToLibrary } from "../lib/ApiService";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import AuthContext from "../contexts/AuthContext";

function Showcase({ showcase, setShowcase }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  // const { data: session } = useSession();
  const { session } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    check(showcase.drinkIngredients, showcase.drinkMeasures);
  }, []);

  const handleAdd = async (adding) => {
    adding.userEmail = session.email;
    const from = await addDrinkToLibrary(adding);
    setShowcase("");
  };

  function check(ingredients, measures) {
    if (Array.isArray(ingredients)) {
      setIngredients(ingredients);
    } else {
      setIngredients(JSON.parse(ingredients));
    }
    if (Array.isArray(measures)) {
      setMeasures(measures);
    } else {
      setMeasures(JSON.parse(measures));
    }
  }

  return (
    <div className="z-20 grid grid-cols-3 fixed top-[90px] h-4/5 w-full bg-slate-500 rounded">
      <div
        className="fixed top-[80px] h-[100vh] w-full bg-black opacity-20"
        onClick={() => setShowcase("")}
      ></div>
      <div className=" m-4 xl:m-8 h-4/5 cursor-pointer rounded hidden md:block bg-white relative max-h-[500px] w-auto z-30">
        {/* <Image
          className=" rounded"
          fill
          src={showcase.drinkThumb}
          alt={showcase.drinkName}
        /> */}
      </div>

      <div className="flex m-4 xl:m-8 opacity-100 z-30 rounded text-white col-span-3 md:col-span-2">
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl text-green-200">{showcase.drinkName}</h1>
          <p className=" text-sm lg:text-lg py-1">
            {showcase.drinkInstructions}
          </p>

          <div className="pt-1 xl:pt-6 grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h3 className="text-lg lg:text-xl">Ingredients:</h3>
              {ingredients.map((ing, i) => (
                <p key={i} className="text-sm lg:text-lg">
                  {ing}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg lg:text-xl">Measures:</h3>
              {measures.map((ing, i) => (
                <p key={i} className="text-sm lg:text-lg">
                  {ing}
                </p>
              ))}
            </div>
          </div>

          <div className="xl:my-10 flex items-center">
            {router.route != "/profile" && (
              <button
                className={
                  session
                    ? "px-3 py-2 xl:px-6 border text-black border-white rounded bg-green-300"
                    : "opacity-0"
                }
                onClick={() => handleAdd(showcase)}
              >
                Add to library
              </button>
            )}
            {/* <h1 className='ml-10 p-4 opacity-50 rounded text-green-800 bg-slate-50 h-full '>Added to {showcase.drinkName} to library</h1> */}
          </div>
        </div>
        <button
          className=" text-black absolute right-8"
          onClick={() => setShowcase("")}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Showcase;
