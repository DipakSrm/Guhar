import { calculation } from "@/utils/sharedFunction";
import { Post } from "@/utils/TypeInterfaces";
import { useRouter } from "next/navigation";
export default function ({ item }: Post) {
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
        className="shadow   gap-3 hover:cursor-pointer min-w-[30%] my-3 bg-white rounded-md"
        onClick={() => router.push(`${`/trending/${item.id}`}`)}
      >
        <div className={" px-1 py-2 rounded-md  "}>
          {" "}
          <video
            src={item.Video1}
            height={100}
            width={300}
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
