"use client";

import Button from "@/components/common/buttons/buttons";
import { forgotPasswordContext } from "@/components/providers/components/forgot-password-provider";
import enterEmail from "@/lib/actions/enter-emil.action";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import * as Yup from "yup";
export default function EnterEmailForm() {
  // context
  const context = useContext(forgotPasswordContext);

  if (!context) {
    return null; // or handle the null case appropriately
  }

  const {
    handlNextStep,
    getUserEamil,
    userEmail,
  } = context;

  // states
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // validtion schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(1)
      .email("Email is invalid")
      .required("Email  is required"),
  });

  // funtion sent the email to back to receive an otp code
  const hanldSubmit = async (values: EmailForm) => {
    setError(null);
    setIsLoading(true);
    const payload: ApiResponse<ReceiveOtpRespone> = await enterEmail(values);
    console.log(payload)
    // if the email is registed befor
    if (payload?.message === "success") {
      // the getUserEamil  is to get user emil to resend the email again to the backend
      getUserEamil(values);
      console.log('user email' ,  userEmail);
      handlNextStep();
      setIsLoading(false);
    }

    setError(payload?.message);
    setIsLoading(false);
  };

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: hanldSubmit,
    validationSchema,
  });

  return (
    <main>
      <section className="max-w-[410px] ps-2">
        {/* header */}
        <h3 className="font-bold pt-5 text-2xl">Forgot your password?</h3>

        {/* form body */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-4"
        >
          {/* error from the backend */}
          <p className="text-red-500 pb-2">{error}</p>

          {/* email input */}
          <div className="">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`${
                formik.errors.email && formik.touched.email
                  ? "border-red-300"
                  : ""
              } w-full rounded-lg border px-2  py-3`}
              placeholder="Email"
              type="email"
              id="email"
              name="email"
            />
            {/* validation feed back for email*/}
            {formik?.errors?.email && formik.touched.email ? (
              <p className="pt-2 text-red-400">{formik.errors.email}</p>
            ) : (
              ""
            )}
          </div>

          <Link
            className="text-[#4461F2] block text-end pt-2"
            href={"forgot-password"}
          >
            Recover Password ?
          </Link>

          {/* submit button */}
          <div className="mt-9 rounded-full shadow-lg">
            <Button>{!isLoading ? "Receive Code" : "loading..."} </Button>
          </div>
        </form>
        <div className="">
          <p className="text-#6C737F font-normal continue-with">
            Or Continue with
          </p>
        </div>
        <div className="flex px-8 justify-between ">
          <div className="shadow-lg w-[55px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/Google.png"}
              alt="google"
              width={25}
              height={0}
            />
          </div>
          <div className="shadow-lg w-[55px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/logo.png"}
              alt="twitter"
              width={25}
              height={0}
            />
          </div>
          <div className="shadow-lg w-[55px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/vector.png"}
              alt="facebook "
              width={25}
              height={0}
            />
          </div>
          <div className="shadow-lg w-[55px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/Logo (1).png"}
              alt="apple"
              width={25}
              height={0}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
