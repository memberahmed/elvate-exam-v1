"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import Logout from "../cutsom/logout";

export default function SideNav() {
  // Navigation
  const pathname = usePathname();

  // States
  const [showSideNav, setShowSideNav] = useState(false);

  // Functions
  const toggleNav = () => {
    if (!showSideNav) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };
  return (
    <section className=" flex flex-col ">
      {/* Nav for md and small screens*/}
      <div
        className={` max-lg:flex md:hidden transition-all duration-300 -my-10 -ms-4 -me-4 sm:-mx-20 h-16 mb-4 bg-mainColor items-center justify-between px-4`}
      >
        <div className="flex gap-x-6 items-center">
          <RxHamburgerMenu
            onClick={toggleNav}
            className="text-3xl text-white cursor-pointer"
          />
          <CiSearch className="text-3xl text-white cursor-pointer" />
        </div>
        <div className="relative w-10 h-10 rounded-full">
          <Image
            src={"/assests/images/rounded-profile.png"}
            alt=""
            fill
            objectFit="cover"
            sizes="100%"
          />
        </div>
      </div>

      {/* Maim dev for Side nav tabs and content */}
      <div className={` md:block ${showSideNav ? "hidden" : ""} `}>
        {/* Image div container */}
        <div className="relative  w-[163px] max-lg:mb-6 h-10">
          <Image
            className="mb-14 dark:bg-white p-2 rounded-lg"
            src={"/assests/images/Final-Logo-1.png"}
            alt="image logo"
            fill
            objectFit="cover"
            sizes="100%"
          />
        </div>

        <nav>
          <ul className="mt-4">
            {/* Dashboard link */}
            <li
              className={`flex items-center gap-x-8 max-md:mb-6 mb-10 font-semibold text-[20px] leading-7 dark:text-white ${
                pathname === "dashboard"
                  ? "bg-[#98a1cf] text-white rounded-[10px]"
                  : ""
              }`}
            >
              <MdSpaceDashboard className="text-mainColor" />
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>

            {/* Histroy link */}
            <li
              className={`flex items-center gap-x-8 mb-10 max-md:mb-6 font-semibold text-[20px] leading-7 dark:text-white ${
                pathname === "history"
                  ? "bg-mainColor text-white  rounded-[10px]"
                  : ""
              }`}
            >
              <FaHistory className="text-mainColor" />
              <Link href={"/dashboard"}>History</Link>
            </li>

            {/* Log component */}
            <Logout />
          </ul>
        </nav>
      </div>
    </section>
  );
}
