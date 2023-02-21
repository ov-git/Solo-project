"use client";
import Link from "next/link";
import { useState } from "react";

import { HiMenu, HiOutlineSearch } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import defaultUserImage from "../../../public/defaultUserImage.png";

import Image from "next/image";
import Nav from "../../../public/Nav.png";
import SideMenu from "./SideMenu";
import ProfileMenu from "./ProfileMenu";

function Navbar() {
  const [nav, setNav] = useState(false);
  // const { data: session } = useSession();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed top-0 z-30 flex items-center justify-between w-full h-16 text-orange-100 border-b-2 bg-dDarkGreen border-dLightGreen">
      <div className="flex items-center h-full">
        <button className="p-4 hover:animate-pulse" onClick={() => handleNav()}>
          {nav ? (
            <CgClose className="text-5xl" />
          ) : (
            <HiMenu className="text-5xl" />
          )}
        </button>

        <Link className="flex h-full px-4 select-none " href={"/"}>
          <Image src={Nav} alt={"Logo"} width={200} />
        </Link>
      </div>

      <ProfileMenu />
      <SideMenu nav={nav} handleNav={handleNav} />
    </div>
  );
}

export default Navbar;
