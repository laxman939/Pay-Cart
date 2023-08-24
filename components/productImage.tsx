import Image from "next/image";

type props = {
  product: productType;
  fill?: boolean;
};

const ProductImage = ({ product, fill }: props) => {
  return (
    <>
      <Image
        src={product.image}
        width={100}
        height={95}
        alt={product.title}
        className="mx-auto my-2"
      />
    </>
  );
};

export default ProductImage;
