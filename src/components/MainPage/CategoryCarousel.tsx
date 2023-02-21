"use client";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import categories from "../../lib/Categories";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setCategory: Dispatch<SetStateAction<string>>;
};

const CategoryCarousel = ({ setCategory }: Props) => {
  const slideRight = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    let slider = (e.target as HTMLElement).parentElement;
    if (slider) {
      slider.scrollLeft -= window.innerWidth;
    }
  };

  const slideLeft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let slider = (e.target as HTMLElement).parentElement;
    if (slider) {
      slider.scrollLeft -= window.innerWidth;
    }
  };

  return (
    <>
      <h1 className="p-3 px-4 text-4xl">Categories</h1>
      <div
        id="carousel"
        className="flex justify-between gap-3 py-4 pl-0 mx-2 overflow-x-scroll text-white h-36 max-w-screen scroll-smooth"
      >
        {/* Categories */}
        <BiLeftArrow className="z-10 cursor-pointer text-black text-[50px] absolute rounded-lg left-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10">
          <button onClick={(e) => slideLeft(e)}></button>
        </BiLeftArrow>
        {categories.map((cat) => (
          <button
            className=" text-2xl rounded relative border cursor-pointer border-black h-full shrink-0 grow w-[45vw] md:w-[32vw] lg:w-[24vw] my-0 inline-block bg-cover"
            key={cat.name}
            onClick={() => setCategory(cat.name)}
          >
            <Image
              className="object-cover bg-black rounded opacity-90 hover:opacity-70"
              src={cat.image.src}
              alt={cat.name}
              fill
            />
            <div className="z-10 w-full h-full bg-black shrink-0 grow">
              <p className="absolute z-10 px-6"> {cat.name} </p>
            </div>
          </button>
        ))}
        <BiRightArrow
          className="z-10 cursor-pointer text-black text-[50px] absolute rounded-lg right-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10"
          onClick={(e) => slideRight(e)}
        ></BiRightArrow>
      </div>
    </>
  );
};

export default CategoryCarousel;
