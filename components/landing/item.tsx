"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Item({ item }: any) {
  const router = useRouter();

  return (
    <section
      className={`px-3 border ${item.name} relative rounded-lg border-teal-900`}
    >
      <div
        className={`absolute bottom-1/3 left-10 ml-10
        }`}
      >
        <h1 className="text-3xl font-bold tracking-wide text-fuchsia-600 my-2">
          {item.title}
        </h1>
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
          }}
        >
          Shop now
        </Button>
      </div>
    </section>
  );
}
