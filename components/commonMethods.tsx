import axios from "axios";

const getProductsByCategory = async (type: string) => {
  let url =
    type === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${type}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export { getProductsByCategory };
