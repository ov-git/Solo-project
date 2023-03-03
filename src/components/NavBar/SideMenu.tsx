"use client";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { CgProfile } from "react-icons/cg";
import { BiHome, BiLogOut, BiLogIn } from "react-icons/bi";

type Props = {
  nav: Boolean;
  loggedIn: Boolean;
};

function SideMenu({ nav, loggedIn }: Props) {
  return (
    <div
      className={
        nav
          ? "rounded-r fixed left-0 top-[80px] w-full md:w-1/5 bg-black bg-opacity-80 ease-in duration-300"
          : "fixed -left-[50%] top-[80px] border w-[30%] bg-white opacity-0 ease-in duration-300"
      }
    >
      <ul className="flex flex-col">
        {generateList(loggedIn).map((el) => {
          return el.name !== "Log Out" ? (
            <Link
              key={el.name}
              className="flex gap-4 p-2 ml-4 text-3xl"
              href={el.link}
              prefetch={false}
            >
              <div className="text-4xl">{el.svg}</div>
              <p>{el.name}</p>
            </Link>
          ) : (
            <button
              key={el.name}
              className="flex gap-4 p-2 ml-4 text-3xl"
              onClick={() => signOut()}
            >
              {el.svg} Log Out
            </button>
          );
        })}
      </ul>
    </div>
  );
}

const generateList = (logged: Boolean) => {
  return logged
    ? [
        {
          name: "Profile",
          svg: <CgProfile />,
          link: "/profile/todo",
        },
        {
          name: "Home",
          svg: <BiHome />,
          link: "/",
        },
        {
          name: "Log Out",
          svg: <BiLogOut />,
          link: "/signin",
        },
      ]
    : [
        {
          name: "Home",
          svg: <BiHome />,
          link: "/",
        },
        {
          name: "Register",
          svg: <BiLogIn />,
          link: "/register",
        },
        {
          name: "Log In",
          svg: <BiLogIn />,
          link: "/signin",
        },
      ];
};

export default SideMenu;
