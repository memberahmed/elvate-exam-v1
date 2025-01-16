"use client";
import Button from "@/components/common/buttons/buttons";
import registerAction from "@/lib/actions/register.action";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function RegisterForm() {
  // variables and hooks
  const router = useRouter();
  // validationSchema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Minium length is two characters")
      .max(25, "Maxium length is 25 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Minium length is two characters")
      .max(25, "Maxium length is 25 characters")
      .required("Last name is required"),
    username: Yup.string()
      .min(2, "Minium length is two characters")
      .max(25, "Maxium length is 25 characters")
      .required("User name is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email  is required"),
    password: Yup.string()
      .matches(
        /(?=.*[A-Z])(?=.*\d).{6,50}$/,
        "Password must have upper case letter and number at least and minlength is 6 letters"
      )
      .required("Password name is required"),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Password and confirm password are not the same"
      )
      .required("confirm password  is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Please enter a vild egyptian number")
      .required("Phone number name is required"),
  });
  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showRepassword, setShowRepassword] = useState(true);

  // functions
  const handleRegister = async (values: RegisterForm) => {
    console.log(values, "hello");
    setIsLoading(true);
    setError(null);
    const response = await registerAction(values);
    if (response.message === "success") {
      toast.success("Register is successfull please login to continue");
      router.push("/login");
    }

    setError(response.message);
    setIsLoading(false);
  };

  const togglePassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const toggleRepassword = () => {
    if (showRepassword === true) {
      setShowPassword(false);
    } else {
      setShowRepassword(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <main>
      <section className=" w-[410px] ps-2">
        <h3 className="text-center md:text-start font-bold text-2xl">
          Sign Up
        </h3>
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col space-y-4 "
        >
          {/* error from the backend */}
          <p className="text-red-500 pb-2">{error}</p>
          {/* username name input */}
          <div className="   ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              className={`${
                formik.errors.username && formik.touched.username
                  ? "border-red-300"
                  : ""
              } w-full rounded-lg border px-2  py-3`}
              placeholder="User Name"
              type="text"
              id="username"
              name="username"
            />
            {/* validation feed back for user name*/}
            {formik?.errors?.username && formik.touched.username ? (
              <p className="pt-2 text-red-400">{formik.errors.username}</p>
            ) : (
              ""
            )}
          </div>

          {/* frist name input */}
          <div className="   ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className={`${
                formik.errors.firstName && formik.touched.firstName
                  ? "border-red-300"
                  : ""
              } w-full rounded-lg border px-2  py-3`}
              placeholder="Frist Name"
              type="text"
              id="firstName"
              name="firstName"
            />
            {/* validation feed back for first name*/}
            {formik?.errors?.firstName && formik.touched.firstName ? (
              <p className="pt-2 text-red-400">{formik.errors.firstName}</p>
            ) : (
              ""
            )}
          </div>

          {/* last name input  */}
          <div className="   ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className={`${
                formik.errors.lastName && formik.touched.lastName
                  ? "border-red-300"
                  : ""
              } w-full rounded-lg border px-2  py-3`}
              placeholder="Last Name"
              type="text"
              id="lastName"
              name="lastName"
            />
            {/* validation feed back for last name*/}
            {formik?.errors?.lastName && formik.touched.lastName ? (
              <p className="pt-2 text-red-400">{formik.errors.lastName}</p>
            ) : (
              ""
            )}
          </div>

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
            } rounded-lg border px-2  py-3 flex items-center justify-between`}
          >
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className={` w-full `}
              type={!showPassword ? "text" : "password"}
              id="password"
              name="password"
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
          {formik?.errors?.password && formik.touched.password ? (
            <p className="pt-2 text-red-400">{formik.errors.password}</p>
          ) : (
            ""
          )}

          {/* confirm psasword input */}
          <div
            className={`${
              formik.errors.rePassword && formik.touched.rePassword
                ? "border-red-300"
                : ""
            } rounded-lg border px-2  py-3 flex items-center justify-between`}
          >
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              placeholder="Confirm Password"
              className={`${
                formik.errors.rePassword && formik.touched.rePassword
                  ? "border-red-300"
                  : ""
              } w-full `}
              type={!showPassword ? "text" : "password"}
              id="rePassword"
              name="rePassword"
            />
            <Image
              onClick={toggleRepassword}
              className="cursor-pointer"
              src={"/assests/images/eye-vector.png"}
              width={20}
              height={0}
              alt="eye vector"
            />

            {/* validation feed back for confirm password*/}
          </div>
          {formik?.errors?.rePassword && formik.touched.rePassword ? (
            <p className="pt-2 text-red-400">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}

          {/* phone input */}
          <div className=" ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Phone Number"
              className={`${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-300"
                  : ""
              } w-full rounded-lg border px-2  py-3`}
              type="tel"
              id="phone"
              name="phone"
            />
            {/* validation feed back for phone*/}
            {formik?.errors?.phone && formik.touched.phone ? (
              <p className="pt-2 text-red-400">{formik.errors.phone}</p>
            ) : (
              ""
            )}
          </div>

          <p className=" block text-center pt-2">
            Already have an account?{" "}
            <Link className="text-[#4461F2]" href={"login"}>
              Login
            </Link>
          </p>
          <div className="mt-9 rounded-full shadow-lg">
            <Button>{!isLoading ? "Sign Up" : "loading..."}</Button>
          </div>
        </form>
        <div className="">
          <p className="text-#6C737F font-normal continue-with">
            Or Continue with
          </p>
        </div>
        <div className="flex px-8 justify-between mb-32 ">
          <div className="shadow-lg w-[65px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/Google.png"}
              alt="google"
              width={25}
              height={0}
            />
          </div>
          <div className="shadow-lg w-[65px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/logo.png"}
              alt="twitter"
              width={25}
              height={0}
            />
          </div>
          <div className="shadow-lg w-[65px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
            <Image
              src={"/assests/images/vector.png"}
              alt="facebook "
              width={25}
              height={0}
            />
          </div>
          <div className="shadow-lg w-[65px] h-[60px] flex items-center justify-center bg-white rounded-lg border">
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
