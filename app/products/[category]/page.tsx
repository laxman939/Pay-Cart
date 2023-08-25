"use client";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../../components/commonMethods";
import Product from "../../../../components/product";
import { useRouter, useParams } from "next/navigation";

const Category = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const router = useRouter();
  const params: any = useParams();

  console.log(decodeURIComponent(params.category));

  const getPtoducts = async () => {
    const products = await getProductsByCategory(
      decodeURIComponent(params.category)
    );
    setProducts(products);
  };

  useEffect(() => {
    getPtoducts();
  }, []);

  return (
    <>
      <div className="">
        <nav className="flex px-5 mx-5 mb-3">
          <div className="">
            <span
              className={`mx-3 cursor-pointer ${
                decodeURIComponent(params.category) === "all"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/`);
              }}
            >
              All
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                decodeURIComponent(params.category) === "men's clothing"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/products/men's clothing`);
              }}
            >
              Men&apos;s clothing
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                decodeURIComponent(params.category) === "women's clothing"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/products/women's clothing`);
              }}
            >
              Women&apos;s clothing
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                decodeURIComponent(params.category) === "electronics"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/products/electronics`);
              }}
            >
              Electronics
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                decodeURIComponent(params.category) === "jewelery"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/products/jewelery`);
              }}
            >
              Jewellary
            </span>
          </div>
        </nav>
        <div className="">
          <div className="flex justify-center flex-wrap">
            {products.map((product: any) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
