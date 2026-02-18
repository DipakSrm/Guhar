import Image from "next/image";
import Link from "next/link";
import { calculation, limitParagraph } from "@/utils/sharedFunction";
import { Post } from "@/utils/TypeInterfaces";

export default function Card({ item }: Post) {
  const href = item.Category
    ? `/categories/${item.Category}/${item.id}`
    : `/blogs/${item.id}`;

  return (
    <article className="h-full min-w-[30%] rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 rounded-xl">
        <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-gray-100">
          <Image
            src={item.Image || item.Image1 || "/logo2.png"}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            alt={item.Title || "News image"}
            className="object-cover"
          />
        </div>
        <div className="px-5 py-4">
          <h2 className="mb-3 line-clamp-2 text-2xl font-semibold text-gray-900">
            {item.Title}
          </h2>
          <p className="line-clamp-3 text-base text-gray-700">
            {limitParagraph(item.Content, 140)}
          </p>
          <p className="mt-4 text-right text-sm font-semibold text-gray-600">
            {item.CreatedOn ? calculation(item.CreatedOn) : "Recently updated"}
          </p>
        </div>
      </Link>
    </article>
  );
}
