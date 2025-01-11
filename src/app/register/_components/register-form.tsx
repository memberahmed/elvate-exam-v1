"use client";
import Button from "@/components/common/buttons/buttons";
import registerAction from "@/lib/actions/register.action";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';


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
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);
  
  // functions
  const handleRegister = async (values: RegisterForm) => {
    setIsLoading(true);
    setError(null);
    const response = await registerAction(values);
      if(response.message === 'success'){
        toast.success('Register is successfull please login to continue');
        router.push('/login');
      }
   
      setError(response.message);
      setIsLoading(false);
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
        <form onSubmit={formik.handleSubmit} className="pt-4 ">
          {/* error from the backend */}
          <p className="text-red-500 pb-2">{error}</p>
            {/* frist name input */}
            <div className="border mb-8 px-2 rounded-lg py-3 ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              className="w-full "
              placeholder="User Name"
              type="text"
              id="username"
              name="username"
            />
          </div>
          {/* frist name input */}
          <div className="border mb-8 px-2 rounded-lg py-3 ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="w-full "
              placeholder="Frist Name"
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>

          {/* last name input  */}
          <div className="border mb-8 px-2 rounded-lg py-3 ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="w-full "
              placeholder="Last Name"
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>

          {/* email input */}
          <div className="border mb-8 px-2 rounded-lg py-3 ">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full "
              placeholder="Email"
              type="email"
              id="email"
              name="email"
            />
          </div>

          {/* pasword input */}
          <div className="border mb-8 px-2 rounded-lg py-3">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className="w-full "
              type="password"
              id="password"
              name="password"
            />
          </div>

          {/* confirm pasword input */}
          <div className="border mb-8 px-2 rounded-lg py-3">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              placeholder="Confirm Password"
              className="w-full "
              type="password"
              id="rePassword"
              name="rePassword"
            />
          </div>

          {/* phone input */}
          <div className="border px-2 rounded-lg py-3">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Phone Number"
              className="w-full"
              type="tel"
              id="phone"
              name="phone"
            />
          </div>

          <p className=" block text-center pt-2">
            Already have an account?{" "}
            <Link className="text-[#4461F2]" href={"login"}>
              Login
            </Link>
          </p>
          <div className="mt-9 rounded-full shadow-lg">
            <Button>{!isLoading? 'Sign Up' : 'loading...'}</Button>
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
