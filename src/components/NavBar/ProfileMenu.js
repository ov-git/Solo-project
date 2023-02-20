"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";

const ProfileMenu = () => {
  const session = false;
  return (
    <>
      {session ? (
        <div className="hidden m-10 sm:flex">
          {session && <h1>{session.email}</h1>}
          <Image
            src={session.image || defaultUserImage}
            alt={"profile"}
            height={70}
            width={70}
            placeholder={"empty"}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="hidden sm:flex">
          <Link
            className="p-2 m-2 border border-white rounded hover:bg-slate-200 hover:text-black"
            href={"/signin"}
          >
            Log In
          </Link>
          {/* <Link href={'/register'} ><a className='p-2 m-2 text-black bg-gray-300 rounded hover:bg-black hover:text-white'>Sign In</a></Link> */}
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
