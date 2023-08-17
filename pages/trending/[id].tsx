import InTrendCard from "@/components/in_Tren_Card";

import { HomeBlog, Trending, HomeTrending } from "@/utils/TypeInterfaces";

import Cardlayout from "@/components/layouts/cardlayout";
import Head from "next/head";

export default function CurrentAffairsId({
  data1,
  data2,
  data3,
}: {
  data1: Trending;
  data2: HomeTrending;
  data3: HomeBlog;
}) {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{data1.Title}</title>
        <meta name="description" content={data1.Content}></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Cardlayout>
        <InTrendCard data1={data1} data2={data2} data3={data3} />
      </Cardlayout>
    </>
  );
}

// ...
export async function getServerSideProps(context: any) {
  const { req } = context;
  const { params } = context;
  const { id } = params;
  try {
    const baseUrl = `${req?.headers["x-forwarded-proto"]}://${req?.headers.host}`;
    const response1 = await fetch(`${baseUrl}/api/trending/${id}`);
    const response2 = await fetch(`${baseUrl}/api/trending`);
    const response3 = await fetch(`${baseUrl}/api/blogs`);
    const data1: Trending = await response1.json(); // Access the 'data' array from the response
    const data2: HomeTrending = await response2.json();
    const data3: HomeBlog = await response3.json();
    return {
      props: {
        data3: data3.data,
        data2: data2.data,
        data1: data1,
      },
    };
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}
