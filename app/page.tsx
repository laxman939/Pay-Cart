import LandingPage from "@/components/landing/landingPage";
// import Products from "./products/page";

export default async function Page() {
  return (
    <>
      <main className="flex items-center justify-between flex-wrap">
        {/* <Products products={products} category={"all"} /> */}
        <LandingPage />
      </main>
    </>
  );
}
