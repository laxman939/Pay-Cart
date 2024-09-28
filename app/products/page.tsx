"use client";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/components/commonMethods";
import Product from "../../components/product";
import { useRouter, useParams } from "next/navigation";
import Nav from "@/components/nav";

type PropsType = {
  category?: string; // Make it optional since the page may not have category initially
};

export default function ProductsPage({ category }: PropsType) {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const params: any = useParams();

  const getAllProducts = async () => {
    const data = await getProductsByCategory("all");
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <nav className="px-6 py-4">
        <Nav />
      </nav>
      <div className="">
        <nav className="flex px-5 mx-5 mb-3">
          <div className="">
            <span
              className={`mx-3 cursor-pointer ${
                !category
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
        <div className="">
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
