"use client";
import Button from "@/components/common/buttons/buttons";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function LoginForm() {
  // variables

  const pathName = usePathname();
  // validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(1)
      .email("Email is invalid")
      .required("Email  is required"),
    password: Yup.string().min(1).required("Password name is required"),
  });

  // states
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // functions
  const handleLogin = async (values: LoginForm) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    // if login is successfull
    if (response?.ok) {
      window.location.href = pathName == "/login" ? "/" : pathName;

      setIsLoading(false);
    }

    // if login is successfull
    else {
      setError(response?.error || "Login error please try again");
      setIsLoading(false);
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
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <main>
      <section className="max-w-[410px] ps-2">
        {/* header */}
        <h3 className="font-bold text-2xl">Sign IN</h3>

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
              formik.errors.password && formik.touched.password
                ? "border-red-300"
                : ""
            } rounded-lg border flex items-center justify-between`}
          >
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className={` w-full rounded-lg px-2  py-3`}
              type={!showPassword ? "text" : "password"}
              id="password"
              name="password"
            />
            <Image
              onClick={togglePassword}
              className="cursor-pointer "
              src={"/assests/images/eye-vector.png"}
              width={20}
              height={0}
              alt="eye vector"
            />
          </div>
          {/* validation feed back for password*/}
          {formik?.errors?.password && formik.touched.password ? (
            <p className="pt-2 text-red-400">{formik.errors.password}</p>
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
          <div className="mt-9 flex w-full bg-red-300 rounded-full shadow-lg">
            <Button>{!isLoading ? "Sign in" : "loading..."} </Button>
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
