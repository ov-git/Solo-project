import { Prisma } from "@prisma/client";

const DrinkType = Prisma.validator<Prisma.DrinkArgs>()({});
const UserType = Prisma.validator<Prisma.UserArgs>()({
  include: { drinks: true },
});

export type User = Prisma.UserGetPayload<typeof UserType>;

export type Drink = Prisma.DrinkGetPayload<typeof DrinkType>;

export type ErrorType = {
  message: string;
};

export type DrinkApiType = {
  strDrinkThumb: string;
  strDrink: string;
  idDrink: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
};
