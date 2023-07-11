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
        className="shadow grid grid-cols-5 gap-3 hover:cursor-pointer min-w-[30%]"
        onClick={() => router.push(`/categories/${item.Category}/${item.id}`)}
      >
        <div className={"col-span-2 px-1 py-2 rounded-md  "}>
          {" "}
          <Image
            src={item.Image || item.Image1}
            height={100}
            width={300}
            alt="Image"
            className="rounded-md"
          />
        </div>
        <div className="col-span-3">
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
