"use client";
import { BiHome, BiLogOut, BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logUserOut } from "@/lib/ApiService";

type Props = {
  nav: Boolean;
  handleNav: () => void;
  loggedIn: Boolean;
};

function SideMenu({ nav, handleNav, loggedIn }: Props) {
  const router = useRouter();
  // const { data: session } = useSession();

  async function handleLogOut(e) {
    const res = await logUserOut();
    window.location.reload();
    // router.replace("/");
    // router.refresh();
  }

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
              onClick={(e) => handleLogOut(e)}
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
