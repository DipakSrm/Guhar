import Image from "next/image";
import { calculation, limitParagraph } from "@/utils/sharedFunction";
import { Post, HomePost } from "@/utils/TypeInterfaces";
import { useRouter } from "next/router";
export default function ({ item, index }: Post) {
  const router = useRouter();

  return (
    <>
      <div
        key={item.id ? item.id : ""}
        className="shadow   gap-3 hover:cursor-pointer min-w-[30%] my-3 bg-white rounded-md"
        onClick={() =>
          router.push(
            `${
              item.Category
                ? `/categories/${item.Category}/${item.id}`
                : `/blogs/${item.id}`
            }`
          )
        }
      >
        <div className={" px-1 py-2 rounded-md  "}>
          {" "}
          <Image
            src={item.Image || item.Image1}
            height={100}
            width={300}
            alt="Image"
            className="rounded-md"
          />
        </div>
        <div className=" px-4 py-2">
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
