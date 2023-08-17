import InBloCard from "@/components/in_Blo_Card";

import { HomePost, Blog, HomeBlog } from "@/utils/TypeInterfaces";
import Head from "next/head";

export default function InBlog({
  data1,
  data2,
  data3,
}: {
  data1: Blog;
  data2: HomeBlog;
  data3: HomePost;
}) {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{data1.Title}</title>
        <meta name="description" content={data1.Content}></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <InBloCard data1={data1} data2={data2} data3={data3} />
    </>
  );
}
// ...
export async function getServerSideProps(context: any) {
  const { req, params } = context;
  const { id } = params;

  try {
    const baseUrl = `${req?.headers["x-forwarded-proto"]}://${req?.headers.host}`;
    const response1 = await fetch(`${baseUrl}/api/blogs/${id}`);
    const response2 = await fetch(`${baseUrl}/api/blogs`);
    const response3 = await fetch(`${baseUrl}/api/cat_index`);
    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    return {
      props: {
        data3: data3.data,
        data2: data2.data,
        data1: data1,
        // Pass the 'data' object as a prop
      },
    };
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
  }
}
