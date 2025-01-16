"use client";
import Button from "@/components/common/buttons/buttons";
import { forgotPasswordContext } from "@/components/providers/components/forgot-password-provider";
import resetNewPassword from "@/lib/actions/rest-email-password.action";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function ResetPasswordForm() {
 
    // context
  const context = useContext(forgotPasswordContext);

  if (!context) {
    return null; // or handle the null case appropriately
  }

  const {
    setCurrentStep
    
  } = context;
 
    // variables

  const router = useRouter();
  // validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(1)
      .email("Email is invalid")
      .required("Email  is required"),
    newPassword : Yup.string().min(6 , 'Minmium length should 6 chracters').matches(/(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%^&+=!]{6,50}$/ , 'Password must have uppercase charcter , a number and special character')
    
  });

  // states
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // functions
  const handlresetPassword = async (values: ResetPasswordForm) => {
    setIsLoading(true);
    const payload: ResetPasswordResponse = await resetNewPassword(values);
    console.log("hello");
    console.log(payload);
    //    if the email is verified
    if (payload.message === "success") {
      toast("Password change successfully please login to continue");
      setIsLoading(false);
      setCurrentStep(1);
      router.push("/login");
    }

    //    if the email is not verified
    else {
      setIsLoading(false);
      setCurrentStep(1);
      setError(
        payload.message || "Something went wrong please try agian later"
      );
    }
  };

  const togglePassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handlresetPassword,
  });

  return (
    <main>
      <section className="max-w-[410px] ps-2">
        {/* header */}
        <h3 className="font-bold text-2xl">Set a Password</h3>

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

          {/* password input */}
          <div
            className={`${
              formik.errors.newPassword && formik.touched.newPassword
                ? "border-red-300"
                : ""
            } rounded-lg border px-2  py-3 flex items-center justify-between`}
          >
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              placeholder="Password"
              className={` w-full `}
              type={!showPassword ? "text" : "password"}
              id="password"
              name="newPassword"
            />
            <Image
              onClick={togglePassword}
              className="cursor-pointer"
              src={"/assests/images/eye-vector.png"}
              width={20}
              height={0}
              alt="eye vector"
            />
          </div>
          {/* validation feed back for password*/}
          {formik?.errors?.newPassword && formik.touched.newPassword ? (
            <p className="pt-2 text-red-400">{formik.errors.newPassword}</p>
          ) : (
            ""
          )}

          <Link
            className="text-[#4461F2] block text-end pt-2"
            href={"forgot-password"}
          >
            Recover Password ?
          </Link>

          {/* submit button */}
          <div className="mt-9 rounded-full shadow-lg">
            <Button>{!isLoading ? "Reset Password" : "loading..."} </Button>
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
