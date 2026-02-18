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

export default function HomePage({
  data_cms,
  data_blogs,
  data_trending,
}: HomePageProps) {
  return (
    <MainLayout>
      <SeoHead
        title="Guhar | Professional News Portal for Nepal"
        description="Get verified top stories, in-depth reports, and category-focused coverage from Nepal and around the world."
        path="/"
      />

      <section className="rounded-2xl bg-gradient-to-r from-red-900 to-red-700 p-6 text-white md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">Live newsroom</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Trusted journalism with a modern reading experience</h1>
        <p className="mt-4 max-w-3xl text-sm md:text-base">
          Discover breaking updates, expert analysis, and curated headlines in an accessible layout designed for all readers.
        </p>
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

      <section className="mt-10" aria-label="Trending now">
        <div className="mb-4 flex flex-col justify-between gap-2 border-b border-gray-300 pb-3 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <Link href="/blogs" className="text-sm font-semibold uppercase tracking-wide text-red-700 hover:underline">
            More articles
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(data_blogs || []).slice(0, 9).map((item: Blog) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
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
