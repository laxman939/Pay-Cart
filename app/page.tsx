import LandingPage from "@/components/landing/landingPage";
// import Products from "./products/page";

export default async function Page() {
  return (
    <>
      {/* <nav className="px-6 py-4">
        <Nav />
      </nav> */}
      <main className="flex items-center justify-between flex-wrap">
        {/* <Products products={products} category={"all"} /> */}
        <LandingPage />
      </main>
    </>
  );
}
