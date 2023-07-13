import { HomePost, Post } from "@/utils/TypeInterfaces";
import { calculation, sort } from "@/utils/sharedFunction";
import Image from "next/image";
import CatCard from "./CatCard";
import Link from "next/link";

export default function InBlog({
  data1,
  data2,
}: {
  data1: Post;
  data2: HomePost;
}) {
  console.log("data2", data2);
  const {
    Title,
    aurthor: Author,
    Content,
    Image: Image_Url,
    $createdAt: CreatedOn,
  } = data1;
  if (!data1) {
    return "Loading...";
  }

  return (
    <div className="mx-3">
      <div className="flex flex-col">
        <h1 className="font-bold text-6xl text-red-900 my-5">{Title}</h1>
        <p className="font-semibold text-2xl text-red-700">
          Published: {sort(CreatedOn ? CreatedOn : "")}
        </p>
      </div>
      {Image_Url && (
        <Image
          src={Image_Url}
          alt="Image"
          className="my-6 rounded-lg shadow"
          width={800}
          height={800}
        />
      )}
      <div className="bg-white w-[60%] rounded-md py-8 px-8">
        <p className="text-2xl leading-normal font-semibold">{Content}</p>
        <p className="text-right font-bold text-l py-3">-{Author}</p>
        {/**new trending section */}
        <h1 className="font-bold text-6xl text-red-900 my-5">
          More Stories Like This
        </h1>{" "}
        <div className="grid grid-cols-2 gap-8 p-4">
          {data2.map((item: Post, index: number) => {
            if (index < 5) {
              return (
                <CatCard
                  Title={item.title}
                  Content={item.content}
                  ImageUrl={item.image}
                  Author={item.author}
                  CreatedOn={item.createdon}
                  Category={item.Category}
                  id={item.id}
                  key={item.id}
                />
              );
            }
            if (index == 5) {
              return (
                <Link
                  href="/news"
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
  );
}
