"use client";
import Link from "next/link";
import Image from "next/image";
import defaultUserImage from "../../../public/defaultUserImage.png";
import { User } from "types/Types";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {
  user: Partial<User> | null;
};

const ProfileMenu = ({ user }: Props) => {
  return (
    <>
      {user ? (
        <div className="flex m-10">
          <button onClick={() => signIn()}>X</button>
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
    </>
  );
};

export default ProfileMenu;
