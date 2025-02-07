"use client";
import { RiLogoutBoxFill } from "react-icons/ri";
import Portal from "../common/portal/portal";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userLogOut from "@/lib/actions/logout";
import { signOut } from "next-auth/react";

export default function Logout() {
  // Navigation
  const router = useRouter();

  //   State
  const [showLightBox, setShowLightBox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Functoins
  // Function to  show pop up to log out
  const toggleLightBox = () => {
    if (!showLightBox) {
      setShowLightBox(true);
      document.body.classList.add("no-scroll");
    }
  };

  // Function to hide pop up of log out
  const hideLightBox = () => {
    setShowLightBox(false);
    document.body.classList.remove("no-scroll");
  };

  // Function to log out the use in the back end and delete the session
  const handleLogout = async () => {
    // Response form back end
    const payload = await userLogOut();

    // If the response is success
    if (payload?.message === "success") {
      //  Next auth sign out function to delete the session in client
      signOut();
      router.push("/login");
    }

    // Error message from back end
    setError(payload?.message);
  };

  // Effects
  useEffect(() => {
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <>
      {showLightBox && (
        <Portal>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-[rgba(255,255,255,0.5)] light-container h-full w-full flex items-center justify-center">
            {/* Log out pop up */}
            <div className="drop-shadow-lg  text-black bg-white p-8 rounded-2xl ">
              {/* Error message from the back end */}
              {error && (
                <p className="text-center text-red-400 p-2 font-semibold">
                  {error}
                </p>
              )}
              <p className="capitalize text-lg font-medium mb-4 ">
                are sure you want to log out{" "}
              </p>
              <div className="buttons flex justify-between mx-6">
                <button
                  onClick={handleLogout}
                  className="bg-mainColor text-white rounded-full px-4 py-2 "
                >
                  Yes
                </button>
                <button
                  onClick={hideLightBox}
                  className="bg-mainColor text-white rounded-full px-4 py-2 "
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
      <div className="light-box-contianer">
        <button
          className={`flex items-center gap-x-8 mb-10 max-md:mb-6 font-semibold text-[20px] leading-7 dark:text-white `}
        >
          <RiLogoutBoxFill className="text-mainColor" />
          <span onClick={toggleLightBox}>Logout</span>
        </button>
      </div>
    </>
  );
}
