"use client";
import Link from "next/link";
import Image from "next/image";
import defaultUserImage from "../../../public/defaultUserImage.png";
import { User } from "@/Types";

type Props = {
  user: Partial<User> | null;
};

const ProfileMenu = ({ user }: Props) => {
  return (
    <>
      {user ? (
        <div className="flex m-10">
          <Image
            src={user.image || defaultUserImage}
            alt={"profile"}
            height={70}
            width={70}
            placeholder={"empty"}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="flex">
          <Link
            className="p-2 m-2 border border-white rounded hover:bg-slate-200 hover:text-black"
            href={"/signin"}
          >
            Log In
          </Link>
          <Link
            href={"/register"}
            className="p-2 m-2 text-black bg-gray-300 rounded hover:bg-black hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
