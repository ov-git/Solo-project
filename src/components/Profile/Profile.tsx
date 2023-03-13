import DrinkCarousel from "./DrinkCarousel";

import { getUserSession } from "@/lib/auth";

const getData = async () => {
  const user = getUserSession();
  return user;
};

const Profile = async () => {
  const user = await getData();

  const drinks = user?.drinks || [];
  const createdDrinks = user?.createdDrinks || [];

  const formated = createdDrinks.map((el) => {
    return {
      name: el.strDrink,
      image: el.strDrinkThumb,
      id: el.idDrink,
    };
  });

  return (
    <div className="flex flex-col h-full px-12 ">
      <div className="flex items-center justify-center w-full h-64">
        <h1 className="text-2xl font-bold text-white">
          Welcome user: {user?.email}
        </h1>
      </div>
      <DrinkCarousel drinks={drinks} />
      <DrinkCarousel drinks={formated} />
    </div>
  );
};

export default Profile;
