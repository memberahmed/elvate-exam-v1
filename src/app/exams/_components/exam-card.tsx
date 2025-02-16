"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuestionsComponent from "./questions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ExamsCardProps = {
  exam: Exams;
};

export default function ExamCard({ exam }: ExamsCardProps) {
  // Navigations
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  //   States
  const [initExam, setInitExam] = useState(false);
  const [questions, setQuestions] = useState<Question[] | null>();
  const [isLoading, setIslaoding] = useState(true);
  //  Variables
  //  A list of image of exams
  const examImages: { [key: string]: string } = {
    "JavaScript Quiz": "/assests/images/JavaScript-Quiz.png",
    "CSS Quiz": "/assests/images/css-quiz.png",
    "HTML Quiz": "/assests/images/html-quiz.png",
    "React Quiz": "/assests/images/react-quiz.png",
  };
  // Path of images src
  const imageSrc = examImages[exam?.title];

  // funtions
  const startExam = (examId: string) => {
    setInitExam(true);
    document.body.classList.add("overflow-hidden");
    // URL search parameters
    const params = new URLSearchParams(searchParams);
    params.set("exam", examId);

    // The new URL with the current pathname
    const newUrl = `${pathName}/?${params ? params.toString() : ""}`;

    // Update the URL
    router.replace(newUrl);
  };

  const getQuestion = async () => {
    const response = await fetch(
      `http://localhost:3000/api/questions?exam=${exam._id}`
    );

    const payload: ApiResponse<PaginatedResponse<Question[]>> =
      await response.json();
    console.log(payload);

    // If response in OK
    if ("questions" in payload) {
      setQuestions(payload?.questions);
      setIslaoding(false);
    }
  };

  // effects
  useEffect(() => {
    // Fetch the questions
    getQuestion();
  }, []);

  return (
    <>
      <div className="drop-shadow-lg flex justify-between items-center  mb-6 font-inter bg-white px-6 py-4 rounded-2xl">
        <div>
          <div className="flex gap-x-6 items-center">
            {/* Exam image */}
            <div className="relative w-20 h-20">
              <Image
                fill
                src={imageSrc}
                alt={exam?.title + " image"}
                objectFit="cover"
                sizes="100%"
              />
            </div>{" "}
            {/* Exam title and no. of question */}
            <div>
              <h4 className="font-medium text-[16px] leading-4 tracking-[0] text-[#0F0F0F] mb-1">
                {/* Exam title */}
                {exam?.title}
              </h4>
              <h5 className="font-normal text-[13px] leading-4 tracking-[0] text-center text-[#535353] ">
                {/* No. of question */}
                {exam.numberOfQuestions} Questions
              </h5>
            </div>
          </div>
        </div>

        {/* Durtion of exam and start button */}
        <div>
          <h4 className="mb-2 font-normal text-[13px] leading-4 tracking-[0] text-center">
            {/* Duration of exam */}
            {exam.duration} Minutes
          </h4>

          {/* Button to start exam */}
          <button
            disabled={isLoading}
            onClick={() => startExam(exam._id)}
            className="bg-mainColor py-1 px-6 rounded-full text-white"
          >
            Strat
          </button>
        </div>
      </div>
      {initExam && questions && <QuestionsComponent questions={questions} />}
    </>
  );
}
