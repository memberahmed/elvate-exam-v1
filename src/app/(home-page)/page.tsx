import Profile from "./_components/profile/profile";
import SearchComponent from "./_components/search-component/search.component";
import Subjects from "./_components/subjucts/subjucts";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <main>
        {/* Search Componet section */}
        <SearchComponent />
        {/* Profile section */}
        <Profile />
        {/* Subjucts section */}
        <Suspense fallback={<p>loading....</p>}>
          <Subjects />
        </Suspense>
      </main>
    </>
  );
}
