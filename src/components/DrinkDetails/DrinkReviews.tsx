"use client";

import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddButton from "../MainPage/AddButton";

const DrinkReviews = ({ drink }) => {
  const router = useRouter();
  const { userDrinkIds } = useUser();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="flex flex-col w-full h-full mt-8 max-w-[1200px] bg-white">
      <AddButton drink={drink} />
    </div>
  );
};

export default DrinkReviews;
