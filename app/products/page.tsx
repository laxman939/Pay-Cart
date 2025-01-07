"use client";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/components/commonMethods";
import Product from "../../components/product";
import { useRouter, useParams } from "next/navigation";
import Nav from "@/components/nav";
import CartLoader from "@/components/CartLoader/CartLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);
  const router = useRouter();
  const params: any = useParams();
  const category = params?.category || "all";

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
                category === "all"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/products`);
                // getProductsByCategory("all");
              }}
            >
              All
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                category === "men's clothing"
                  ? "border-b-4 border-b-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                router.push(`/products/men's clothing`);
                // getProductsByCategory("men's clothing")
              }}
            >
              Men&apos;s clothing
            </span>
            <span
              className={`mx-3 cursor-pointer ${
                category === "women's clothing"
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
                category === "electronics"
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
                category === "jewelery"
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
            {products?.length > 0 ? (
              <>
                {products.map((product: any) => {
                  return (
                    <Product
                      product={product}
                      key={product.id}
                      page="products"
                    />
                  );
                })}
              </>
            ) : (
              <div className="my-20">
                <CartLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
