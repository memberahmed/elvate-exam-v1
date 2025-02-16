"use client";

import { createContext, useState } from "react";
type ForgotPasswordProviderProps = {
  children: React.ReactNode;
};

export let forgotPasswordContext =
  createContext<ForgotPasswordContextType | null>(null);

export default function ForgotPasswordProvider({
  children,
}: ForgotPasswordProviderProps) {
  // states
  const [currentStep, setCurrentStep] = useState(1);
  const [userEmail, setUserEmail] = useState<EmailForm>({ email: "" });

  // functions
  // move to the step of the forgot password process
  const handlNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlPreStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // the getUserEamil  is to get user emil to resend the email again to the backend

  function getUserEamil(userEmail: EmailForm) {
    setUserEmail(userEmail);
  }
  return (
    <>
      <forgotPasswordContext.Provider
        value={{
          currentStep,
          setCurrentStep,
          handlNextStep,
          handlPreStep,
          getUserEamil,
          userEmail,
        }}
      >
        {children}
      </forgotPasswordContext.Provider>
    </>
  );
}
