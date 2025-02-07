// components/common/subject-card/subject-card.tsx
import Image from "next/image";
import * as motion from "motion/react-client";

type SubjectCardProps = {
  subject: Subject;
  index: number;
  animate?: boolean; // optional prop to enable animation
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function SubjectCard({
  subject,
  index,
  animate = false,
}: SubjectCardProps) {
  // This is the inner content that both animated and static versions will share.
  const content = (
    <>
      <div className="relative w-full sm:w-72 md:w-[330px] h-48 sm:h-64 lg:h-72">
        <Image
          className="rounded-lg object-cover"
          src={subject.icon}
          alt={subject.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.25 * index,
          ease: "easeInOut",
          duration: 0.25,
        }}
        viewport={{ amount: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative w-full"
      >
        {content}
      </motion.div>
    );
  }
  // If no animations
  return <div className="relative w-full">{content}</div>;
}
