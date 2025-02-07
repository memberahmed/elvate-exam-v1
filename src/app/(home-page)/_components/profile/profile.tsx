import Image from "next/image";
import { MdFlag } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

export default function Profile() {
  return (
    <section className="flex items-center  flex-col  lg:flex-row gap-x-6 mt-2 md:mt-10 px-4 py-8 bg-[#EDEDED] rounded-[20px] drop-shadow-lg">
      {/* Profile image */}
      <div className="relative border border-red-300 w-[216px] h-[216px]  rounded-full">
        <Image
          src={"/assests/images/full-profile.png"}
          className=""
          alt=""
          fill
          objectFit="cover"
          sizes="100%"
        />
      </div>

      {/* Profile text content */}
      <div className="mt-4  ">
        <h2 className=" text-3xl leading-10 mb-1 text-mainColor font-bold">
          Ahmed Mohamed
        </h2>
        <span className="text-[#979CA3] font-normal text-[20px] leading-8">
          Voluptatem aut{" "}
        </span>

        {/* Progress Span */}
        <div className="my-6 h-3 bg-[#F5F5F5] rounded-full">
          <span className="block bg-mainColor h-3 w-2/3 rounded-full"></span>
        </div>

        {/* Profile meta info */}
        <div className=" flex md:gap-x-6 gap-x-4 ">
          {/* First icon */}
          <div className=" flex flex-col md:flex-row justify-center gap-x-4 items-center">
            <div className="p-1 bg-white w-9 h-9 md:h-[70px] md:w-[70px] flex items-center  justify-center   drop-shadow-lg rounded-xl">
              {" "}
              <MdFlag className=" text-mainColor  text-3xl md:text-5xl" />
            </div>
            <div className="my-2 text-center">
              <h6 className="text-[#696F79] font-bold text-3xl leading-10">
                27
              </h6>
              <span className="font-normal text-lg text-[#696F79]">
                Quiz Passed
              </span>
            </div>
          </div>

          {/* Second icon */}
          <div className=" flex flex-col md:flex-row justify-center gap-x-4 items-center">
            <div className="p-1 bg-white w-9 h-9 md:h-[70px] md:w-[70px] flex flex-col md:flex-row items-center  justify-center  drop-shadow-lg rounded-xl">
              {" "}
              <IoMdTime className=" text-mainColor text-3xl md:text-5xl" />
            </div>
            <div className="my-2 text-center">
              <h6 className="text-[#696F79] font-bold text-3xl leading-10">
                13 min
              </h6>
              <span className="font-normal text-lg text-[#696F79]">
                Fastest Time
              </span>
            </div>
          </div>

          {/* Third icon */}
          <div className=" flex flex-col md:flex-row justify-center gap-x-4 items-center">
            <div className="p-1 bg-white w-9 h-9 md:h-[70px] md:w-[70px] flex  flex-col md:flex-row items-center  justify-center  drop-shadow-lg rounded-xl">
              {" "}
              <FaCircleCheck className=" text-mainColor text-3xl md:text-5xl" />
            </div>
            <div className="my-2 text-center">
              <h6 className="text-[#696F79] font-bold text-3xl leading-10">
                27
              </h6>
              <span className="font-normal text-lg text-[#696F79]">
                Quiz Passed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
