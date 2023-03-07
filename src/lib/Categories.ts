import shots from "../../public/shots.jpg";
import cocktail from "../../public/cocktail.jpg";
import beer from "../../public/beer.jpg";
import od from "../../public/od.jpg";
import liquor from "../../public/liquor.jpg";
import cocoa from "../../public/cocoa.jpg";
import all from "../../public/all.jpg";
import punch from "../../public/bowl.jpg";
import soda from "../../public/soda.jpg";
import shake from "../../public/shake.jpg";
import tea from "../../public/tea.jpg";
import other from "../../public/other.jpg";

const categories = [
  {
    name: "Popular",
    link: "popular",
    image: all,
  },
  {
    name: "Cocktails",
    link: "cocktail",
    image: cocktail,
  },
  {
    name: "Shots",
    link: "shot",
    image: shots,
  },
  {
    name: "Ordinary Drinks",
    link: "ordinary_drink",
    image: od,
  },
  {
    name: "Beer",
    link: "Beer",
    image: beer,
  },
  {
    name: "Punch / Party Drink",
    link: "Punch / Party Drink",
    image: punch,
  },
  {
    name: "Homemade Liqueur",
    link: "homemade_liqueur",
    image: liquor,
  },
  {
    name: "Shake",
    link: "shake",
    image: shake,
  },
  {
    name: "Cocoa",
    link: "cocoa",
    image: cocoa,
  },
  {
    name: "Coffee / Tea",
    link: "Coffee / Tea",
    image: tea,
  },
  {
    name: "Soft Drink",
    link: "Soft Drink",
    image: soda,
  },
  {
    name: "Other / Unknown",
    link: "Other / Unknown",
    image: other,
  },
  // {
  //   name: "Latest",
  //   link: "Other / Unknown",
  //   image: other,
  // },
];

export default categories;
