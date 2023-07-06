import Image from "next/image";
import { calculation } from "@/utils/sharedFunction";
import { Post, HomePost } from "@/utils/TypeInterfaces";
import { useRouter } from "next/router";
export default function ({ item, index }: Post) {
  const router = useRouter();
  function limitParagraph(paragraph: string, limit: number) {
    if (paragraph.length <= limit) {
      return paragraph;
    }

    return paragraph.substring(0, limit).trim() + "...";
  }
  return (
    <>
      <div
        key={item.id}
        className={
          index === 0
            ? `row-span-3  gap-6  col-span-1 flex flex-col justify-center items-center hover:cursor-pointer`
            : " col-span-1 md:flex lg:flex gap-4  px-1 py-2 rounded-md shadow-md xl:max-h-[30vh] hover:cursor-pointer"
        }
        onClick={() => router.push(`/categories/${item.Category}/${item.id}`)}
      >
        {" "}
        <Image
          src={item.Image}
          height={index === 0 ? 800 : 100}
          width={index === 0 ? 800 : 400}
          alt="Image"
          className="rounded-md"
        />
        <div className="">
          {" "}
          <h1 className="text-4xl font-semibold mb-2 py-2">{item.Title}</h1>
          <p className="font-light text-xl">
            {limitParagraph(item.Content, 100)}
          </p>
          <p className=" text-right font-bold">
            ({calculation(item.CreatedOn)})
          </p>
        </div>
      </div>
    </>
  );
}
