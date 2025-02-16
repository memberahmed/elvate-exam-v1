"use client";

import { questionContext } from "@/components/providers/components/question-provider";
import { checkQustion } from "@/lib/actions/check-questions";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
declare type QuestionsComponentProps = {
  questions: Question[];
};
export default function QuestionsComponent({ questions }: QuestionsComponentProps) {
  //  Hooks
  const { currentStep, handNextStep, currentIndex, handlNextQuestion, handlPrevQuestion } = useContext(questionContext);

  // States
  const initialTime = questions[0]?.exam?.duration * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | string[];
  }>({});
  // Varibles
  // Derive minutes and seconds from timeLeft
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
    const { value, type, checked } = event.target;

    setSelectedAnswers((prev) => {
      if (type === "radio") {
        // Single choice: only one answer per question
        return { ...prev, [questionId]: value };
      } else {
        // Multiple choice: keep an array of selected answers
        const prevAnswers = Array.isArray(prev[questionId]) ? prev[questionId] : [];
        return {
          ...prev,
          [questionId]: checked
            ? [...prevAnswers, value] // Add selected option
            : prevAnswers.filter((ans) => ans !== value), // Remove unselected option
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Transform selectedAnswers into the required format
    const answersPayload = {
      answers: Object.entries(selectedAnswers).map(([questionId, answerValue]) => ({
        questionId,
        correct: Array.isArray(answerValue) ? answerValue.join(", ") : answerValue, // Ensure correct format
      })),
      time: questions[0]?.exam?.duration - minutes, // Add the time field, modify as needed
    };

    const payload = await checkQustion(answersPayload);
    console.log("answers is here ==>", payload);
  };

  //  Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // If no time left, stop the timer
        if (prevTime <= 1) {
          clearInterval(timer);
          window.alert("Time Up");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="z-10 fixed flex items-center h-screen justify-center top-0 right-0 left-0 bottom-0 bg-white/50">
        {currentStep === 1 && (
          <div className="font-inter bg-white p-6 rounded-3xl drop-shadow-2xl">
            <span className="block font-medium text-2xl leading-7 tracking-[0] text-[#0F0F0F] mb-4">Instructions</span>
            <ul className="list-disc list-inside mb-12">
              <li className=" text-[20px] font-medium leading-5 tracking-[0] mb-2 text-[#535353]">
                Lorem ipsum dolor sit amet consectetur.
              </li>
              <li className="text-[20px] font-medium leading-5 tracking-[0] mb-2 text-[#535353]">
                Lorem ipsum dolor sit amet consectetur.
              </li>
              <li className="text-[20px] font-medium leading-5 tracking-[0] mb-2 text-[#535353]">
                Lorem ipsum dolor sit amet consectetur.
              </li>
              <li className="text-[20px] font-medium leading-5 tracking-[0] mb-2 text-[#535353]">
                Lorem ipsum dolor sit amet consectetur.
              </li>
            </ul>
            <button
              onClick={handNextStep}
              className="block rounded-full w-full bg-mainColor text-white text-center py-[10px] px-6"
            >
              Start
            </button>
          </div>
        )}
        {currentStep === 2 && (
          <>
            {questions.length === 0 ? (
              <div className="bg-white flex items-center justify-center rounded-2xl p-6 drop-shadow-xl min-h-40">
                <p>NO Questions Please Please try another diploma</p>
              </div>
            ) : (
              <div className="md:min-w-[690px] md:min-h-[350px] flex flex-col bg-white  rounded-3xl p-6 drop-shadow-2xl">
                {/* Number of questions and timer */}
                <div className="flex items-center justify-between mb-6">
                  {/* Number of Questions */}
                  <span className="font-medium text-sm tracking-[.1px] text-mainColor">
                    Question {currentIndex + 1} of {questions?.length}
                  </span>

                  {/* Timer */}
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={"/assests/images/alarm.png"}
                      objectFit="cover"
                      alt="Alarm image"
                      width={24}
                      height={20}
                    />
                    {/* Count Down */}
                    <span className={`ml-2 text-lg font-bold ${timeLeft > 60 ? "text-green-600" : "text-red-600"}`}>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  </div>
                </div>

                {/* Dots for */}
                <div className="flex items-center gap-x-2  p-2 mb-6">
                  {questions.map((quiz, index) => (
                    <div className="w-6 h-6 p-2" key={quiz._id}>
                      <span
                        className={` block w-[10px] h-[10px] rounded-full ${
                          index <= currentIndex ? "bg-mainColor" : "bg-[#D9D9D9]"
                        }`}
                      ></span>
                    </div>
                  ))}
                </div>

                {/* Qustion and answers */}

                <form onSubmit={handleSubmit}>
                  {questions
                    .filter((_, index) => index === currentIndex)
                    .map((quiz: Question) => (
                      <div key={quiz._id} className=" flex-col space-y-4 ">
                        {/* Qestions */}
                        <p className="font-inter font-medium text-2xl mb-6">{quiz.question}</p>
                        {quiz.answers.map((answer) => (
                          <div
                            className={`${
                              selectedAnswers[quiz._id] === answer.key ? "bg-[#CCD7EB]" : "bg-[#EDEFF3]"
                            } ps-2 rounded-[10px]  flex items-center  `}
                            key={answer.key}
                          >
                            <input
                              checked={
                                quiz.type === "single_choice"
                                  ? selectedAnswers[quiz._id] === answer.key
                                  : (selectedAnswers[quiz._id] || []).includes(answer.key)
                              }
                              onChange={(e) => handleChange(e, quiz._id)}
                              id={answer.key}
                              name={quiz.question}
                              className={` relative appearance-none border-[2px]  w-5 h-5 rounded-full border-[#02369C] me-2  before:content-[''] before:w-2 before:h-2 before:bg-[#02369C] before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0 checked:before:opacity-100`}
                              type={quiz.type === "single_choice" ? "radio" : "checkbox"}
                              value={answer.key}
                            />

                            {/* Qestion lable for answers */}
                            <label className=" py-4 px-2 block w-full" htmlFor={answer.key}>
                              {answer.answer}
                            </label>
                          </div>
                        ))}

                        {/* Buttons */}
                        <div className="flex justify-between items-center">
                          <button
                            onClick={handlPrevQuestion}
                            className="bg-white text-xl font-medium font-poppins border border-mainColor text-mainColor px-6 py-3 rounded-full w-[300px] "
                          >
                            Back
                          </button>
                          <button
                            type={currentIndex === questions.length - 1 ? "submit" : "button"}
                            disabled={!selectedAnswers[quiz._id]}
                            onClick={currentIndex === questions.length - 1 ? handleSubmit : handlNextQuestion}
                            className="text-white text-xl font-medium font-poppins bg-mainColor px-6 py-3 rounded-full w-[300px] "
                          >
                            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                          </button>
                        </div>
                      </div>
                    ))}
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
