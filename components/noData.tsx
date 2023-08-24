import { useSelector } from "react-redux";

type props = {
  pageName: string;
};

const NoData = ({ pageName }: props) => {
  const { cartItems, favItems } = useSelector((state: any) => state.cart);

  return (
    <>
      {" "}
      <h4 className="text-center my-5 text-2xl tracking-wide">
        {cartItems.length === 0 &&
          pageName === "cart" &&
          "You haven't added any products yet"}
        {favItems.length === 0 &&
          pageName === "favorite" &&
          "You haven't added any products yet"}
      </h4>
    </>
  );
};

export default NoData;
