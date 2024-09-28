"use client"; // Mark this as a client component since we're using hooks

import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/components/commonMethods";
import Product from "../../components/product";
import { useRouter, useParams } from "next/navigation";
import Nav from "@/components/nav";

// Default export required for Next.js pages
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const params = useParams();

  const category: any = params?.category || "all"; // Default to 'all' if no category

  const getAllProducts = async () => {
    const data = await getProductsByCategory(category);
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, [category]); // Refetch when category changes

  return (
    <>
      <nav className="px-6 py-4">
        <Nav />
      </nav>
      <div>
        <nav className="flex px-5 mx-5 mb-3">
          <div>
            <span
              className={`mx-3 cursor-pointer ${
                category === "all"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => router.push("/products")}
            >
              All
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                category === "men's clothing"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => router.push("/products/men's clothing")}
            >
              Men&apos;s clothing
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                category === "women's clothing"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => router.push("/products/women's clothing")}
            >
              Women&apos;s clothing
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                category === "electronics"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => router.push("/products/electronics")}
            >
              Electronics
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                category === "jewelery"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => router.push("/products/jewelery")}
            >
              Jewellery
            </span>
          </div>
        </nav>
        <div>
          <div className="flex justify-center flex-wrap">
            {products.map((product: any) => (
              <Product product={product} key={product.id} page="products" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
