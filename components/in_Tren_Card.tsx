import {
  Blog,
  HomeBlog,
  HomeTrending,
  Post,
  Trending,
} from "@/utils/TypeInterfaces";
import { calculation, sort } from "@/utils/sharedFunction";
import Image from "next/image";
import CatCard from "./CatCard";
import Link from "next/link";

import Card from "./card";
import Card4Trending from "./Card4Trending";

export default function InTrendCard({
  data1,
  data2,
  data3,
}: {
  data1: Trending;
  data2: HomeTrending;
  data3: HomeBlog;
}) {
  const {
    Title,
    id,
    Author,
    $createdAt: CreatedOn,
    Content,
    Image1,

    Video1,
  } = data1;

  if (!data1) {
    return "Loading...";
  }

  return (
    <div className="mx-3" key={id}>
      <div className="flex flex-col">
        <h1 className="font-bold text-6xl text-red-900 my-5">{Title}</h1>
        <p className="font-semibold text-2xl text-red-700">
          Published: {sort(CreatedOn ? CreatedOn : "")}
          <br />
          Source: <span className="text-black font-thin">{Author}</span>
        </p>
      </div>
      {Video1 && (
        <video
          autoPlay
          width={1000}
          height={1000}
          className="rounded-md my-2"
          controls
        >
          <source src={Video1} />
        </video>
      )}
      <div className="bg-white w-full md:w-[70%] lg:w-[60%] rounded-md py-8 px-8">
        <p className="text-2xl leading-normal font-semibold">{Content}</p>
        <Image
          src={Image1 ? Image1 : ""}
          width={500}
          height={500}
          alt="picture"
        />
        {/**new trending section */}
        <h1 className="font-bold text-6xl text-red-900 my-5">
          More Stories Like This
        </h1>{" "}
        <div className="grid grid-cols-2 gap-8 p-4">
          {data2.map((item: Trending, index: number) => {
            if (index < 5) {
              return <Card4Trending item={item} index={index} key={item.id} />;
            }
            if (index == 5) {
              return (
                <Link
                  href="/trending"
                  key="see-more-link"
                  className="font-semibold text-xl text-red-400"
                >
                  See More...
                </Link>
              );
            }
          })}
        </div>
        {/**New Sectiojn */}
        <h1 className="font-bold text-6xl text-red-900 my-5">
          Trending Blogs
        </h1>{" "}
        <div className="lg:overflow-x-auto ">
          <div className=" flex gap-3 py-4 flex-col lg:flex-row">
            {data3.map((item: Blog, index: number) => {
              if (index < 10) {
                return <Card item={item} index={index} key={item.id} />;
              }
              if (index == 10) {
                return (
                  <Link
                    href="/blogs"
                    key="see-more-link"
                    className="text-lg font-semibold text-red-700 w-full h-full my-auto mx-4"
                  >
                    See More...
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
