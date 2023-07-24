import { Trending } from "@/utils/TypeInterfaces";
import { limitParagraph } from "@/utils/sharedFunction";
import Image from "next/image";
export default function InCarousel({
  item,
  index,
}: {
  item: Trending;
  index: number;
}) {
  return (
    <>
      <div className="relative ease-in-out">
        <Image
          src={item.Image1 ? item.Image1 : ""}
          className="rounded-md shadow"
          alt="..."
          width={1000}
          height={1000}
        />
        <div className="absolute grid place-content-center place-items-center bottom-[10%] left-[5%]  bg-gray-200 min-h-[70%] min-w-[80%] lg:max-w-[80%] px-5 py-3 rounded-md gap-3">
          <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold text-black-900 text-red-900">
            {item.Title}
          </h1>
          <p className="lg:text-2xl md:text-2xl text-lg font-thin">
            {limitParagraph(item.Content ? item.Content : "", 150)}
          </p>
        </div>
      </div>
    </>
  );
}
