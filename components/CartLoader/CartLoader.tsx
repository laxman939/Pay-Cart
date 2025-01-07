import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const CartLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { color: "bg-purple-700", delay: "0s" },
    { color: "bg-fuchsia-600", delay: "0.2s" },
    { color: "bg-pink-500", delay: "0.4s" },
    { color: "bg-indigo-500", delay: "0.6s" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-8 rounded-xl">
      {/* Progress ring with cart */}
      <div className="relative w-32 h-32">
        {/* Animated ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            className="stroke-gray-200"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            className="stroke-purple-700"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: 377,
              strokeDashoffset: 377 - (377 * progress) / 100,
              transition: "stroke-dashoffset 0.1s ease",
            }}
          />
        </svg>

        {/* Centered cart icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingCart
            size={36}
            className="text-gray-700 animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>

      {/* Floating items */}
      <div className="relative mt-8 w-48 h-16">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute w-4 h-4 rounded-full ${item.color}`}
            style={{
              left: `${index * 30}%`,
              animation: "float 2s infinite",
              animationDelay: item.delay,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      {/* <div className="mt-6 text-gray-600 font-medium">Loading your cart...</div> */}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default CartLoader;
