"use client";
import { Button } from "@mui/material";
import landing1 from "../../public/images/landing1.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Item({ item }: any) {
  const router = useRouter();

  return (
    <section className={`px-3 border ${item.name} relative`}>
      {/* <Image
        src={landing1}
        width={100}
        height={95}
        // alt={product.title}
        alt=""
        className="mx-auto my-2"
      /> */}
      <div
        className="flex items-center text-slate-950 hover:text-black cursor-pointer text-2xl font-bold"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </span>
      </div>
      <div
        className={`absolute bottom-1/3 right-1/4
        }`}
        // className={`mt-48  ${
        //   item.name === "random3" || item.name === "random2"
        //     ? "text-end mr-40"
        //     : "text-start ml-24"
        // }`}
      >
        <h1 className="text-3xl font-bold tracking-wide text-fuchsia-600 my-2">
          {item.title}
        </h1>
        {/* <h2>{item.name}</h2> */}
        <p>
          <span className="italic">{item.description}</span>{" "}
          <span className="text-xl text-purple-600 font-bold">
            {item.offerPercentage}%
          </span>
        </p>
        <Button
          className={`btnAdd mt-6`}
          onClick={() => {
            router.push(`/products`);
            // getProductsByCategory("all");
          }}
        >
          Shop now
        </Button>
      </div>
    </section>
  );
}
