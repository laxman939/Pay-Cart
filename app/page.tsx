import Products from "./products/page";
import { getProductsByCategory } from "../components/commonMethods";

export default async function Page() {
  const products = await getProductsByCategory("all");

  return (
    <main className="flex items-center justify-between flex-wrap py-2">
      <Products products={products} category={"all"} />
    </main>
  );
}
