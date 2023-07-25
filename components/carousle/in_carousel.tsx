import { Trending } from "@/utils/TypeInterfaces";
import { limitParagraph } from "@/utils/sharedFunction";
import Image from "next/image";
import { useRouter } from "next/router";
export default function InCarousel({
  item,
  index,
}: {
  item: Trending;
  index: number;
}) {
  const router = useRouter();
  return (
    <>
      <div className="relative ease-in-out ">
        <Image
          src={item.Image1 ? item.Image1 : ""}
          className="rounded-md shadow"
          alt="..."
          width={1000}
          height={1000}
        />
        <div
          onClick={() => router.push(`/trending/${item.id}`)}
          className="hover:cursor-pointer absolute grid place-content-center place-items-center bottom-[10%] left-[5%]  bg-gray-50 min-h-[70%] min-w-[80%] lg:max-w-[80%] px-5 py-3 rounded-md gap-3"
        >
          <h1 className="lg:text-6xl md:text-4xl text-[3vh] font-bold text-black-900 text-red-900">
            {item.Title}
          </h1>
          <p className="lg:text-2xl md:text-2xl text-[1.5vh] font-thin">
            {limitParagraph(item.Content ? item.Content : "", 150)}
            {}
          </p>
        </div>
      </div>
    </>
  );
}
