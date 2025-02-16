"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";

type SubjectCardProps = {
  subject: Subject;
  index: number;
  animate?: boolean; // optional prop to enable animation
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function SubjectCard({ subject, index, animate = false }: SubjectCardProps) {
  // Navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  // Functions
  const handClick = (subjectId: string) => {
    const searchQuery = new URLSearchParams(searchParams);

    searchQuery.set("subject", subjectId);

    router.replace(`/exams?${searchQuery.toString()}`);
  };

  // This is the inner content that both animated and static versions will share.
  const content = (
    <>
      <div className="relative w-full  md:w-[330px] h-48 sm:h-64 lg:h-72">
        <Image className="rounded-lg object-cover" src={subject.icon} alt={subject.name} fill sizes="100%" />
      </div>
      <div className="font-bold text-sm rounded-xl absolute bottom-7 right-7 left-7 p-4 bg-[#1935ca]/40 backdrop-blur-xl text-white">
        <h3>{subject.name}</h3>
        <p>Voluptatem aut ut dignissimos blanditiis</p>
      </div>
    </>
  );

  // Render animated if animate is true; otherwise, render statically.
  if (animate) {
    return (
      <motion.div
        onClick={() => handClick(subject._id)}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.25 * index,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative w-full cursor-pointer"
      >
        {content}
      </motion.div>
    );
  }
  // If no animations
  return (
    <div onClick={() => handClick(subject._id)} className="relative w-full cursor-pointer">
      {content}
    </div>
  );
}
