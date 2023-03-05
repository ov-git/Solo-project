import Image from "next/image";
import bg from "../../../public/bg2.jpg";

function Hero() {
  return (
    <div className="relative flex justify-center h-[75vh] border-b-2 border-dLightGreen select-none bg-gradient-to-b from-white to-black text-slate-300">
      <div className="absolute z-10 self-center md:pr-20 lg:pr-40">
        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl pt-28">
          Find your
          <br />
          <span className="pl-10 md:pl-20 text-slate-200">New favorite</span>
          <br />
          <span className="pl-24 md:pl-60 text-[#379a47] font-extrabold italic">
            Drinkzz
          </span>
        </h1>
      </div>

      <Image
        className="object-cover w-full col-span-1 rounded 2xl:object-fill opacity-40"
        src={bg}
        alt={"Drinkzz"}
        priority
      />
    </div>
  );
}

export default Hero;
