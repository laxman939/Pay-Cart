"use client";
import Carousel from "react-material-ui-carousel";
import Item from "./item";
import Image from "next/image";
import banner1 from "../../public/images/image1.jpg";
import banner2 from "../../public/images/image2.jpg";
import Nav from "../nav";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../product";
import Register from "../Registration/page";

const LandingPage = () => {
  let items = [
    {
      name: "random1",
      title: "Special offers",
      description: "Celebrate end of season sale with up to",
      bgImage: "/images/banner33.jpg",
      bgColor: "#e1e6e2",
      offerPercentage: 80,
    },
    {
      name: "random2",
      title: "Festival offers",
      description: "Diwali special offer with up to",
      bgImage: "/images/banner2.jpg",
      bgColor: "#edfaf1",
      offerPercentage: 75,
    },
    {
      name: "random3",
      title: "Special discount sale",
      description: "Great indian festival offers with upto",
      bgImage: "/images/banner3.jpg",
      bgColor: "#f5f7f6",
      offerPercentage: 85,
    },
  ];

  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("new");
  const [products, setProducts] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const getProductsByCategory = async () => {
    let url = `https://fakestoreapi.com/products?limit=4`;

    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, [type]);

  return (
    <div className="w-full">
      <div className="py-5">
        <Nav
          setShowLoginPage={setShowLoginPage}
          showLoginPage={showLoginPage}
        />
      </div>
      {/* <div
        className="flex items-center text-slate-950 hover:text-black cursor-pointer text-2xl font-bold ml-2 mt-2"
        // onClick={() => setPageName("home")}
      >
        <span>PayCart</span>
        <span className="px-1 font-bolder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </span>
      </div> */}
      {showLoginPage ? (
        <Register />
      ) : (
        <>
          <div className="">
            <div className="flex justify-between gap-2 items-center mx-2">
              <Carousel
                className="w-9/12"
                navButtonsAlwaysVisible
                fullHeightHover={true}
              >
                {items.length > 0 &&
                  items.map((item, i) => <Item key={item.title} item={item} />)}
              </Carousel>
              <div className="flex flex-col items-center my-auto sideImages">
                <div className="relative">
                  <Image
                    src={banner1}
                    alt=""
                    width={300}
                    height={100}
                    className={` duration-700 ease-in-out group-hover:opacity-75 ${
                      loading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    }`}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <div className=" absolute bottom-2 right-2 text-white bg-gray-900 px-2 rounded">
                    Men collections
                  </div>
                </div>
                <div className="pt-3 relative">
                  {" "}
                  <Image
                    src={banner2}
                    alt=""
                    width={300}
                    height={100}
                    className={` duration-700 ease-in-out group-hover:opacity-75 ${
                      loading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    }`}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <div className=" absolute bottom-2 right-2 text-white bg-gray-600 px-2 rounded">
                    Summer collections
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-5 mx-2 my-3 bg-gray-300 font-bold">
              <span
                className={`py-3 px-4 cursor-pointer ${
                  type === "new" ? "bg-gray-400" : "bg-gray-300"
                }`}
                onClick={() => setType("new")}
              >
                New arrivals
              </span>
              <span
                className={`py-3 px-4 cursor-pointer ${
                  type === "best" ? "bg-gray-400" : "bg-gray-300"
                }`}
                onClick={() => setType("best")}
              >
                Best sellers
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-center flex-wrap">
              {products.map((product: any) => {
                return (
                  <Product product={product} key={product.id} page="landing" />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
