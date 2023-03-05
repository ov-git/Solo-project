"use client";
import Link from "next/link";
import Image from "next/image";

import defaultUserImage from "../../../public/defaultUserImage.png";

import { signIn } from "next-auth/react";

type Props = {
  user:
    | ({
        id: string;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
};

const ProfileMenu = ({ user }: Props) => {
  return (
    <div className="hidden sm:block">
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
          <button
            className="p-2 m-2 border border-white rounded hover:bg-dLightGreen"
            onClick={() => signIn()}
          >
            Sign In
          </button>
          <Link
            href={"/register"}
            className="p-2 m-2 text-black bg-gray-300 rounded hover:bg-dLightGreen hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
