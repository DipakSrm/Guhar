import MainLayout from "@/components/layouts/mainlayout";
import { Blog, HomeBlog, HomeTrending, HomePost } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import Link from "next/link";
import Carousel from "@/components/carousle/carousel_for_home";
import SeoHead from "@/components/shared/seo-head";
import { NextApiRequest } from "next";

type HomePageProps = {
  data_cms: HomePost["data"];
  data_blogs: HomeBlog["data"];
  data_trending: HomeTrending["data"];
};

const categories = [
  { href: "/categories/currentaffairs", label: "Current Affairs" },
  { href: "/categories/sports", label: "Sports" },
  { href: "/categories/economics", label: "Economy" },
  { href: "/blogs", label: "Opinion" },
  { href: "/trending", label: "Video" },
];

export default function HomePage({ data_cms, data_blogs, data_trending }: HomePageProps) {
  const breakingHeadlines = (data_cms || []).slice(0, 5);

  return (
    <MainLayout>
      <SeoHead
        title="Guhar | Professional News Portal for Nepal"
        description="Get verified top stories, in-depth reports, and category-focused coverage from Nepal and around the world."
        path="/"
      />

      <section className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white p-3" aria-label="Category shortcuts">
        <span className="rounded bg-red-700 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">Sections</span>
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-red-700 hover:text-red-700"
          >
            {category.label}
          </Link>
        ))}
      </section>

      <section className="rounded-2xl bg-gradient-to-r from-red-900 to-red-700 p-6 text-white md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">Live newsroom</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Trusted journalism with a modern reading experience</h1>
        <p className="mt-4 max-w-3xl text-sm md:text-base">
          Discover breaking updates, expert analysis, and curated headlines in an accessible layout designed for all readers.
        </p>
      </section>

      <section className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3" aria-label="Breaking news ticker">
        <span className="rounded bg-red-700 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">Breaking</span>
        <ul className="space-y-1 text-sm font-medium text-gray-800">
          {breakingHeadlines.map((item: Blog) => (
            <li key={item.id}>
              <Link href={item.Category ? `/categories/${item.Category}/${item.id}` : `/blogs/${item.id}`} className="hover:text-red-700">
                {item.Title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-5" aria-label="Top stories and highlights">
        <div className="xl:col-span-3">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Top Stories</h2>
          <Carousel items={data_trending || []} data={[]} />
        </div>
        <aside className="xl:col-span-2" aria-label="Editor's picks">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Editor&apos;s Picks</h2>
            <Link href="/news" className="text-sm font-semibold text-red-700 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {(data_cms || []).slice(0, 3).map((item: Blog) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3" aria-label="Trending now and most read">
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-2 border-b border-gray-300 pb-3 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <Link href="/blogs" className="text-sm font-semibold uppercase tracking-wide text-red-700 hover:underline">
              More articles
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(data_blogs || []).slice(0, 6).map((item: Blog) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-4" aria-label="Most read stories">
          <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-bold text-gray-900">Most Read</h2>
          <ol className="space-y-3">
            {(data_blogs || []).slice(0, 8).map((item: Blog, index: number) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <Link href={`/blogs/${item.id}`} className="text-sm font-semibold text-gray-800 hover:text-red-700">
                  {item.Title}
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </MainLayout>
  );
}

function getBaseUrl(req: NextApiRequest) {
  const protocol = (req.headers["x-forwarded-proto"] as string) || "http";
  return `${protocol}://${req.headers.host}`;
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = getBaseUrl(req);

  try {
    const [responseCms, responseBlogs, responseTrending] = await Promise.all([
      fetch(`${baseUrl}/api/cat_index`),
      fetch(`${baseUrl}/api/blogs`),
      fetch(`${baseUrl}/api/trending`),
    ]);

    const [dataCms, dataBlogs, dataTrending] = await Promise.all([
      responseCms.json(),
      responseBlogs.json(),
      responseTrending.json(),
    ]);

    return {
      props: {
        data_trending: dataTrending?.data || [],
        data_cms: dataCms?.data || [],
        data_blogs: dataBlogs?.data || [],
      },
    };
  } catch (error) {
    console.log("Error:", error);

    return {
      props: {
        data_trending: [],
        data_cms: [],
        data_blogs: [],
      },
    };
  }
}
