import shots from "../../public/shots.jpg";
import cocktail from "../../public/cocktail.jpg";
import beer from "../../public/beer.jpg";
import od from "../../public/od.jpg";
import liquor from "../../public/liquor.jpg";
import cocoa from "../../public/cocoa.jpg";
import all from "../../public/all.jpg";

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
    name: "Ordinary Drinks",
    link: "ordinary_drink",
    image: od,
  },
  // {
  //   name: "Shots",
  //   image: shots,
  // },
  // {
  //   name: "Beer",
  //   image: beer,
  // },
  // {
  //   name: "Homemade Liqueur",
  //   image: liquor,
  // },
  // {
  //   name: "Cocoa",
  //   image: cocoa,
  // },
];

export default categories;
