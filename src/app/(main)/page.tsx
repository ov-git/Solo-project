// import { Inter } from "@next/font/google";

import Main from "../../components/MainPage/Main";

import Hero from "../../components/MainPage/Hero";

// const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <Main />
    </div>
  );
}
