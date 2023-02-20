import { Inter } from "@next/font/google";

import Main from "../../components/MainPage/Main";

import Hero from "../../components/MainPage/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full">
      {/* {showcase && <Showcase showcase={showcase} setShowcase={setShowcase} />} */}
      <Hero />
      <Main />
    </div>
  );
}
