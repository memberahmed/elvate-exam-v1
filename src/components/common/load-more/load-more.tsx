"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SubjectCard from "../subject-card/subject-card";

const LoadMore = () => {
  //  States
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const { inView, ref } = useInView();

  //Funtions
  async function getSubjects(page: number) {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/exams?page=${page}`
      );
      const payload: ApiResponse<PaginatedResponse<Subject[]>> =
        await response.json();

      //If response is success
      if (!("code" in payload)) {
        setSubjects((prevSubjects) => [
          ...(prevSubjects || []),
          ...payload.subjects,
        ]);

        // If the user gets the Last page
        if (payload.metadata.currentPage >= payload.metadata.numberOfPages) {
          setHasMore(false);

          // If threre are more pages to load
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        // Setting error message for the user
        setError(payload.message);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
      setError(null);
    }
  }

  // Effects
  useEffect(() => {
    if (inView && !loading && hasMore) {
      getSubjects(page);
    }
  }, [inView, page, hasMore, loading]);

  return (
    <div>
      {/* Loader */}
      {loading && (
        <p className="p-5 text-center min-h-10 text-indigo-700">Loading...</p>
      )}

      {/* Error message form back end */}
      {error && (
        <p className="p-4 min-h-10 text-center text-red-400 font-bold">
          {error}
        </p>
      )}

      {/* Load more section */}
      <div className="grid grid-cols-1 mt-5 md:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-4">
        {subjects?.map((subject: Subject, index: number) => (
          //  Animate={true} so these cards animate when rendered.
          <SubjectCard
            key={subject._id}
            subject={subject}
            index={index}
            animate={true}
          />
        ))}
      </div>
      {/* No more pages to load */}
      {!hasMore && (
        <p className="text-center p-5 font-bold text-indigo-700">
          No more subjects to load.
        </p>
      )}
      <div ref={ref} style={{ height: "1px" }} />
    </div>
  );
};

export default LoadMore;
