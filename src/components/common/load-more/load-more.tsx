"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SubjectCard from "../subject-card/subject-card";

const LoadMore = () => {
  // States
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numberOfTries, setNumberOfTries] = useState<number>(3);

  // Intersection Observer hook
  const { inView, ref } = useInView();

  // Functoins
  // Function to fetch subjects
  async function getSubjects(page: number) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/subjects?page=${page}`);
      const payload: ApiResponse<PaginatedResponse<Subject[]>> = await response.json();

      // If response is successful
      if (!("code" in payload)) {
        setSubjects((prevSubjects) => [...(prevSubjects || []), ...payload.subjects]);

        // Check if there are more pages to load
        if (payload.metadata.currentPage >= payload.metadata.numberOfPages) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        setError(payload.message);
      }
    } catch (error: any) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Effects
  useEffect(() => {
    // Condition to call the APi
    if (!loading && inView && hasMore && numberOfTries > 0) {
      const timeout = setTimeout(() => {
        getSubjects(page);
        setNumberOfTries((prev) => prev - 1);
      }, 1000);

      // Cleanup timeout if dependencies change
      return () => {
        clearTimeout(timeout);
        setError(null);
      };
    }
  }, [inView, hasMore, numberOfTries, loading, page]);

  return (
    <div>
      {/* Error message */}
      {error && <p className="p-4 min-h-10 text-center text-red-400 font-bold">{error}</p>}

      {/* Subject cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-4">
        {subjects?.map((subject: Subject, index: number) => (
          <SubjectCard key={subject._id} subject={subject} index={index} animate={true} />
        ))}
      </div>

      {/* Message when no more subjects to load */}
      {!hasMore && <p className="text-center p-5 font-bold text-indigo-700">No more subjects to load.</p>}

      {/* Loader */}
      {loading && <p className="p-5 text-center text-3xl min-h-10 text-indigo-700">Loading...</p>}
      {/* Intersection observer target */}
      <div ref={ref} style={{ height: "1px" }} />
    </div>
  );
};

export default LoadMore;
