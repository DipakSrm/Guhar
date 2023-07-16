import { Blog, HomeBlog, HomePost, Post } from "@/utils/TypeInterfaces";
import { calculation, sort } from "@/utils/sharedFunction";
import Image from "next/image";
import Cardlayout from "./layouts/cardlayout";
import Card from "./card";
import CatCard from "./CatCard";
import Link from "next/link";

export default function InBloCard({
  data1,
  data2,
  data3,
}: {
  data1: Blog;
  data2: HomeBlog;
  data3: HomePost;
}) {
  const {
    Title,
    Author,
    Content,
    Image1,
    Image2 = "",
    $createdAt: CreatedOn,
    id,
  }: Blog = data1;
  console.log("data2", data2);
  console.log("data3", data3);
  return (
    <>
      <Cardlayout>
        {" "}
        <div className="mx-3" key={id}>
          <div className="flex flex-col">
            <h1 className="font-bold text-6xl text-red-900 my-5">{Title}</h1>
            <p className="font-semibold text-2xl text-red-700">
              Published: {sort(CreatedOn ? CreatedOn : "")}
              <br />
              Source: <span className="text-black font-thin">{Author}</span>
            </p>
          </div>
          {Image1 && (
            <Image
              src={Image1}
              alt="Image"
              className="my-6 rounded-lg shadow"
              width={800}
              height={800}
            />
          )}
          <div className="bg-white w-full md:w-[70%] lg:w-[60%] rounded-md py-8 px-8">
            <p className="text-2xl leading-normal font-semibold">{Content}</p>
            {Image2 && (
              <img src={Image2} height={500} width={500} className="block" />
            )}
            {/**new trending section */}
            <h1 className="font-bold text-6xl text-red-900 my-5">
              More Stories Like This
            </h1>{" "}
            <div className="grid grid-cols-2 gap-8 p-4">
              {data2.map((item: Blog, index: number) => {
                if (index < 6) {
                  return (
                    <CatCard
                      Title={item.Title}
                      Content={item.Content}
                      ImageUrl={item.Image1}
                      Author={item.Author}
                      CreatedOn={item.CreatedOn}
                      id={item.id}
                      key={item.id}
                    />
                  );
                }
                if (index == 7) {
                  return (
                    <Link
                      href="/blogs"
                      className="font-semibold text-xl text-red-400"
                    >
                      See More...
                    </Link>
                  );
                }
              })}
            </div>
            <h1 className="font-bold text-6xl text-red-900 my-5">
              Latest News On Guhar
            </h1>{" "}
            {/**NEw section */}
            <div className="lg:overflow-x-auto ">
              <div className=" flex gap-3 py-4 flex-col lg:flex-row">
                {data3.map((item: Post, index: number) => {
                  if (index < 10) {
                    return <Card item={item} index={index} key={item.id} />;
                  }
                  if (index == 10) {
                    return (
                      <Link
                        href="/news"
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
      </Cardlayout>
    </>
  );
}
