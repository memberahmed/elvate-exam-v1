import Profile from "./_components/profile/profile";
import SearchComponent from "./_components/search-component/search.component";
import Subjects from "./_components/subjucts/subjucts";

export default async function Home() {
  // const query = `/products?sort=-sold${searchParams.category ? `&category=${searchParams.category}` : ""}`;

  return (
    <>
      <main>
        {/* Search Componet section */}
        <SearchComponent />
        {/* Profile section */}
        <Profile />
        {/* Subjucts section */}
        <Subjects />
      </main>
    </>
  );
}
