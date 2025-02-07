import SideNav from "@/components/common/side-nav";

type LayOutpors = {
  children: React.ReactNode;
};
export default function Layout({ children }: LayOutpors) {
  return (
    <>
      <main>
        <section className="container py-10 mx-auto flex md:flex-row flex-col ">
          {/* Side nav component */}
          <div className="w-full lg:w-2/12 max-lg:px-4">
            <SideNav />
          </div>

          {/* The children componet */}
          <div className="w-full lg:w-10/12 max-lg:px-4">{children}</div>
        </section>
      </main>
    </>
  );
}
