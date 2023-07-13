import { Blog, HomeBlog } from "@/utils/TypeInterfaces";
import { calculation, sort } from "@/utils/sharedFunction";
import Image from "next/image";
import Cardlayout from "./layouts/cardlayout";
import Card from "./card";
import CatCard from "./CatCard";
import Link from "next/link";

export default function InBloCard({
  data1,
  data2,
}: {
  data1: Blog;
  data2: HomeBlog;
}) {
  const {
    Title,
    Author,
    Content,
    Image1,
    Image2 = "",
    $createdAt: CreatedOn,
  }: Blog = data1;
  console.log("data2", data2);
  return (
    <>
      <Cardlayout>
        {" "}
        <div className="mx-3">
          <div className="flex flex-col">
            <h1 className="font-bold text-6xl text-red-900 my-5">{Title}</h1>
            <p className="font-semibold text-2xl text-red-700">
              Published: {sort(CreatedOn ? CreatedOn : "")}
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
          <div className="bg-white w-[60%] rounded-md py-8 px-8">
            <p className="text-2xl leading-normal font-semibold">{Content}</p>
            {Image2 && (
              <img src={Image2} height={500} width={500} className="block" />
            )}
            <p className="text-right font-bold text-l py-3">-{Author}</p>
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
          </div>
        </div>
      </Cardlayout>
    </>
  );
}
