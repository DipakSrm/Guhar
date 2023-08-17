import MainLayout from "@/components/layouts/mainlayout";
import { Blog, HomeBlog, HomeTrending } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import { HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import Head from "next/head";
import Link from "next/link";
import Carousel from "@/components/carousle/carousel_for_home";

export default function HomePage({
  data_cms,
  data_blogs,
  data_trending,
}: {
  data_cms: HomePost;
  data_blogs: HomeBlog;
  data_trending: HomeTrending;
}) {
  if (!data_cms) {
    return <>loading...</>;
  }

  return (
    <MainLayout>
      <Head>
        <title>Guhar.com</title>
        <meta
          property="og:title"
          content="Title of of page Guhar.com"
          key="title"
        />
      </Head>
      <div className="grid grid-cols-5 py-5 mx-4 ">
        <div className="lg:col-span-3 w-full mx-auto col-span-12">
          <Carousel items={data_trending} data={[]} />
        </div>
        <div className="lg:col-span-2 col-span-12  ">
          {data_cms.map((item: Blog, index: number) => {
            if (index < 3) {
              return (
                <div key={item.id}>
                  <Card item={item} index={index} />
                </div>
              );
            }
            return null; // Skip rendering for items beyond the limit
          })}
        </div>
      </div>{" "}
      {/* Section Break */}
      <div className="flex items-center justify-between mx-3 py-8 px-4 my-4 flex-col md:flex-row lg:flex-row sm:gap-8">
        <div className="text-6xl text-red-900 font-bold text-left order-2 lg:order-1 md:order-1">
          Trending Now{" "}
        </div>

        <div className="text-lg font-semibold text-red-700 text-right  order-1 lg:order-2 md:order-2">
          <Link href="/news">See More...</Link>
        </div>
      </div>
      {/* Section Break */}
      <div className="lg:overflow-x-auto ">
        <div className="flex gap-3 py-4 flex-col lg:flex-row">
          {data_blogs.map((item: Blog, index: number) => {
            if (index < 10) {
              return (
                <div key={item.id} className="min-w-[30%]">
                  <Card item={item} index={index} />
                </div>
              );
            }
            if (index === 10) {
              return (
                <div
                  key="see-more"
                  className="text-lg font-semibold text-red-700 w-full h-full my-auto mx-4"
                >
                  <Link href="/blogs">See More...</Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;

  try {
    const response_cms = await fetch(`${baseUrl}/api/cat_index`);
    const response_blogs = await fetch(`${baseUrl}/api/blogs`);
    const response_trending = await fetch(`${baseUrl}/api/trending`);
    if (!response_cms.ok || !response_blogs.ok) {
      console.log("Error in API response");
      // Handle the error or return an appropriate response
    }

    const data_cms = await response_cms.json();
    const data_blogs = await response_blogs.json();
    const data_trending = await response_trending.json();

    return {
      props: {
        data_trending: data_trending.data,
        data_cms: data_cms.data,
        data_blogs: data_blogs.data,
      },
    };
  } catch (error) {
    console.log("Error:", error);
    // Handle the error or return an appropriate response
  }
}
