"use client";

import Button from "@/components/common/buttons/buttons";
import { forgotPasswordContext } from "@/components/providers/components/forgot-password-provider";
import enterEmail from "@/lib/actions/enter-emil.action";
import verifyResetCode from "@/lib/actions/verify-otp-code.action";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
export default function VerifyResetCodeFrom() {
  // context
  const context = useContext(forgotPasswordContext);

  if (!context) {
    return null; // or handle the null case appropriately
  }

  const {
    handlNextStep,
    userEmail,
  } = context;

  // states
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // validtion schema
  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .min(6 , "Please enter the six numbers Reset code")
      .required("Reset code is required"),
  });

  // funtion verify the otp code form the backend
  const hanldSubmit = async (values: VerifyForm) => {
    setError(null);
    setIsLoading(true);
    const payload:verifyResetCodeResponse  = await verifyResetCode(values);
    console.log(payload);
    // if the reset code  is matched
    if (payload.status === 'Success') {
      handlNextStep();
      setIsLoading(false);
    }

    setError(payload?.message || null);
    setIsLoading(false);
  };

  const resendOtp = async()=>{
    const toastLoader = toast.loading('loading...')
    const response = await enterEmail(userEmail)
      
    if(response.message === 'success'){
      toast.dismiss(toastLoader);
      toast.success('A Reset code has been sent')
      
    }
    else{
      setError('Something went wrong Please try agian later!!')
    }
  }

  let formik = useFormik({
    initialValues: {
        resetCode: "",
    },
    onSubmit: hanldSubmit,
    validationSchema,
  });

  return (
    <main>
      <section className="max-w-[410px] ps-2">
        {/* header */}
        <h3 className="font-bold pt-5 text-2xl">Verify code</h3>

        {/* form body */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-4"
        >
          {/* error from the backend */}
          <p className="text-red-500  pt-2 pb-2">{error}</p>

          {/* rest code input */}
          <div className="">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              className={`${
                formik.errors.resetCode && formik.touched.resetCode
                  ? "border-red-300"
                  : ""
              } w-full rounded-lg border px-2  py-3`}
              placeholder="Reset Code"
              type="text"
              id="resetCode"
              name="resetCode"
            />
            {/* validation feed back for email*/}
            {formik?.errors?.resetCode && formik.touched.resetCode ? (
              <p className="pt-2 text-red-400">{formik.errors.resetCode}</p>
            ) : (
              ""
            )}
          </div>

          <p className="pt-2 pb-10 text-end">
          Didn’t receive a code?  <span onClick={resendOtp} className=" cursor-pointer text-mainColor">Resend</span>
          </p>

          {/* submit button */}
          <div className="mt-9 rounded-full shadow-lg">
            <Button>{!isLoading ? "Verify" : "loading..."} </Button>
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
