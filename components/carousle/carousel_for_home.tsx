"use client";
import { HomeTrending, Trending } from "@/utils/TypeInterfaces";
import React, { useState, useEffect } from "react";
import InCarousel from "./in_carousel";
import Image from "next/image";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
export default function Carousel({ items }: HomeTrending) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % items.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className=" w-full overflow-hidden  items-center ">
      <div
        className="grid grid-flow-row w-full h-full transition-transform"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          gridTemplateColumns: `repeat(${items.length}, 100%)`,
          transition: "transform 1s ease-in-out",
        }}
      >
        {items.map((item: Trending, index: number) => {
          return (
            <div key={index} className=" h-full w-full flex items-center">
              <button
                onClick={() => setCurrentSlide(currentSlide - 1)}
                disabled={currentSlide == 0}
              >
                <ChevronLeftIcon className="font-bold lg:w-8 md:w-6 w-4" />
              </button>
              <InCarousel item={item} index={index} />
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                disabled={currentSlide === items.length - 1}
              >
                <ChevronRightIcon className="font-bold lg:w-8 md:w-6 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
