import { fetchExams } from "@/lib/api/get-exams.api";
import SearchComponent from "../(home-page)/_components/search-component/search.component";
import ExamCard from "./_components/exam-card";

type ExamsProps = {
  searchParams: SearchParams;
};

export default async function ExamsPage({ searchParams }: ExamsProps) {
  const qurey = `/exams${
    searchParams.subject ? `${`?subject=` + searchParams.subject}` : ""
  }`;
  const payload = await fetchExams(qurey);
  const exams = "exams" in payload ? payload.exams : [];

  return (
    <>
      <SearchComponent />
      <div className="mt-10">
        <h3 className="font-inter font-medium text-xl leading-5 tracking-[0] mb-6">
          Front-End Quiz
        </h3>
        {exams?.map((exam) => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </div>
    </>
  );
}
