"use client";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { CgProfile } from "react-icons/cg";
import { BiHome, BiLogOut, BiLogIn } from "react-icons/bi";

type Props = {
  nav: Boolean;
  loggedIn: Boolean;
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

function SideMenu({ nav, user, loggedIn }: Props) {
  return (
    <div
      className={
        nav
          ? "rounded-r fixed left-0 top-[4.2rem] w-full sm:w-1/3 xl:w-1/5 bg-dDarkGreen bg-opacity-80 ease-in duration-300"
          : "fixed -left-[50%] top-[80px] w-[30%] bg-white opacity-0 ease-in duration-300"
      }
    >
      <ul className="flex flex-col">
        {generateList(loggedIn, user?.id).map((el) => {
          return el.name !== "Log Out" ? (
            <Link
              key={el.name}
              className="flex gap-4 p-3 pl-4 text-3xl border border-l-0 rounded border-dLightGreen hover:bg-dLightGreen"
              href={el.link}
            >
              <div className="text-4xl">{el.svg}</div>
              <p>{el.name}</p>
            </Link>
          ) : (
            <button
              key={el.name}
              className="flex gap-4 p-3 pl-4 text-3xl border border-l-0 rounded border-dLightGreen hover:bg-dLightGreen"
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

const generateList = (logged: Boolean, id: string | undefined) => {
  return logged
    ? [
        {
          name: "Profile",
          svg: <CgProfile />,
          link: `/profile/${id}`,
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
