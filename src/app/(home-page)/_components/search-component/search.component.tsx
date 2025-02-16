import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default function SearchComponent() {
  return (
    <header>
      <div className=" hidden md:flex items-center justify-between gap-x-6">
        {/* Search input */}
        <div className="ps-5 py-5 h-12 w-full drop-shadow-lg flex items-center gap-x-6  bg-white rounded-[20px]">
          <CiSearch className="text-3xl text-mainColor" />
          <input
            className="p-2 w-full rounded-[20px]"
            type="text"
            placeholder="Search Quiz"
          />
        </div>

        {/* Profile and button image */}
        <div className="flex items-center justify-between gap-x-4 pe-3">
          {/* Button to start the exam */}
          <button className=" px-4 py-2 min-w-[150px] h-10 bg-mainColor text-white rounded-full">
            Start Quiz
          </button>
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
      </div>
    </header>
  );
}
