"use client";
import Product from "../../../../components/product";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const params = useParams();

  let product: productType = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  };

  const getProduct = async () => {
    let res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    product = await res.json();
  };
  getProduct();

  return (
    <div>
      {product.id !== 0 ? (
        <Product product={product} key={product.id} page="products" />
      ) : null}
    </div>
  );
};

export default ProductPage;
