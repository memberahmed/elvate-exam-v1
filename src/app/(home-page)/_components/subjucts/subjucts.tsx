import SubjectCard from "@/components/common/subject-card/subject-card";
import LoadMore from "@/components/common/load-more/load-more";
import { fetchExams } from "@/lib/api/get-diplomas.action";

export default async function Subjects() {
  // Variables
  const payload = await fetchExams(1);

  return (
    <section className="bg-white mt-10 px-4 py-8 rounded-[20px]">
      {/* Headers */}
      <h2 className="text-mainColor text-2xl flex justify-between">
        <span>Quizes</span> <span>View All</span>
      </h2>

      {/* body */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-4">
        {"subjects" in payload &&
          payload.subjects.map((subject: Subject, index: number) => (
            // No animate prop – rendered statically
            <SubjectCard key={subject._id} subject={subject} index={index} />
          ))}
      </div>
      <LoadMore />
    </section>
  );
}
