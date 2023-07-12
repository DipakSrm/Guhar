import { Blog, HomeBlog } from "@/utils/TypeInterfaces";
import { calculation } from "@/utils/sharedFunction";
import Image from "next/image";

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
    CreatedOn,
  }: Blog = data1;
  console.log("data2", data2);
  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 ">
        {" "}
        <h1 className="font-bold text-6xl">{Title} </h1>
        <p className="font-thin text-2xl ">({calculation(CreatedOn)})</p>
      </div>{" "}
      <div className="mx-auto w-[60%] my-[5%] ">
        <Image
          src={Image1 ? Image1 : ""}
          alt="Image"
          className="my-10 rounded-sm shadow"
          width={800}
          height={800}
        />
        <p className="text-xl font-semibold">{Content}</p>
        {Image2 && (
          <img src={Image2} height={500} width={500} className="block" />
        )}
        <p className=" text-right font-bold text-l">-({Author})</p>
      </div>
    </>
  );
}
