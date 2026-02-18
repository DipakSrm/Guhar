import Link from "next/link";
import { calculation } from "@/utils/sharedFunction";
import { Post } from "@/utils/TypeInterfaces";

export default function Card4Trending({ item }: Post) {
  function limitParagraph(paragraph: string, limit: number) {
    if (paragraph.length <= limit) {
      return paragraph;
    }

    return `${paragraph.substring(0, limit).trim()}...`;
  }

  return (
    <article className="h-full min-w-[30%] rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/trending/${item.id}`}
        className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
      >
        <div className="px-2 py-2">
          <video
            src={item.Video1}
            className="h-56 w-full rounded-lg bg-black object-cover"
            muted
            playsInline
            aria-label={item.Title || "Trending video"}
          />
        </div>
        <div className="px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">{item.Title}</h2>
          <p className="text-base text-gray-700">{limitParagraph(item.Content, 140)}</p>
          <p className="mt-4 text-right text-sm font-semibold text-gray-600">
            {item.CreatedOn ? calculation(item.CreatedOn) : "Recently updated"}
          </p>
        </div>
      </Link>
    </article>
  );
}
