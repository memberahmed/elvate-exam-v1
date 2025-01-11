"use client";
import Button from "@/components/common/buttons/buttons";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Yup from 'yup';


export default function LoginForm() {
  // variables

  const pathName = usePathname();
  // validation schema
  const validationSchema = Yup.object().shape({
    email : Yup.string().min(1).email('Email is invalid').required('Email  is required'), 
    password : Yup.string().min(1).required('Password name is required'), 
  })
  
  // states
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // functions
  const handleLogin = async (values: LoginForm) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    
    // if login is successfull
    if (response?.ok) {
      window.location.href = pathName == '/login'? '/' :pathName
      
      setIsLoading(false);
    } 
    
     // if login is successfull
    else {
      setError(response?.error || "Login error please try again");
      setIsLoading(false);
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
        <form onSubmit={formik.handleSubmit} className="pt-8">
          {/* error from the backend */}
          <p className="text-red-500 pb-2">{error}</p>
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
          <div className="border  px-2 rounded-lg py-3">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="password"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <Link
            className="text-[#4461F2] block text-end pt-2"
            href={"forget-password"}
          >
            Recover Password ?
          </Link>

          {/* submit button */}
          <div className="mt-9 rounded-full shadow-lg">
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
