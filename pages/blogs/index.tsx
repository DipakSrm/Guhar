import MainLayout from "@/components/layouts/mainlayout";
import { Blog, HomeBlog } from "@/utils/TypeInterfaces";
import Card from "@/components/card";

import { NextApiRequest } from "next";
import Head from "next/head";

export default function HomeBlog({ data }: HomeBlog) {
  if (!data) {
    return <>loading...</>;
  }

  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Blogs Page</title>
        <meta name="description" content="all latest blogs and news "></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <MainLayout>
        <h1 className="text-red-900 my-6 text-7xl font-bold text-center">
          Trending Now
        </h1>
        <div className="grid h-full  grid-rows-3 xl:grid-cols-2  gap-3 my-3">
          {data.map((item: Blog, index: number) => {
            return <Card item={item} index={index} key={item.id} />;
          })}
        </div>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
  const response = await fetch(`${baseUrl}/api/blogs`);
  const data = await response.json();

  return {
    props: {
      data: data.data,
    },
  };
}
