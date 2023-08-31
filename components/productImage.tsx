"use client";
import { useState } from "react";
import Image from "next/image";

type props = {
  product: productType;
  fill?: boolean;
};

const ProductImage = ({ product, fill }: props) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {fill ? (
        <Image
          src={product.image}
          width={100}
          height={95}
          alt={product.title}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            loading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      ) : (
        <Image
          src={product.image}
          width={100}
          height={95}
          alt={product.title}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            loading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      )}
    </>
  );
};

export default ProductImage;
