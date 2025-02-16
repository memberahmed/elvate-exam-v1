"use client";

import { createContext, useState } from "react";

export let questionContext = createContext<any>(null);

declare type QusetionsProps = {
  children: React.ReactNode;
};
export default function QusetionsProvider({ children }: QusetionsProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    console.log("current index", currentIndex);
  };

  const handlPrevQuestion = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    console.log("current index", currentIndex);
  };
  return (
    <>
      <questionContext.Provider
        value={{
          currentStep,
          handNextStep,
          currentIndex,
          setCurrentIndex,
          handlNextQuestion,
          handlPrevQuestion,
        }}
      >
        {children}
      </questionContext.Provider>
    </>
  );
}
