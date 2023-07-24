"use client";
import { HomeTrending, Trending } from "@/utils/TypeInterfaces";
import React, { useState, useEffect } from "react";
import InCarousel from "./in_carousel";
import Image from "next/image";

export default function Carousel({ items }: HomeTrending) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % items.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative w-full overflow-hidden">
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
            <div key={index} className="relative h-full w-full">
              <InCarousel item={item} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
