import InBloCard from "@/components/in_Blo_Card";
import Footer from "@/components/shared/footer";
import { Post, HomePost, Blog, HomeBlog } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";

export default function InBlog({
  data1,
  data2,
}: {
  data1: Blog;
  data2: HomeBlog;
}) {
  console.log("data", data1);
  console.log("data2", data2);

  const router = useRouter();

  return (
    <>
      <InBloCard data1={data1} data2={data2} />
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
    const data1 = await response1.json();
    const data2 = await response2.json();
    return {
      props: {
        data2: data2.data,
        data1: data1,
        // Pass the 'data' object as a prop
      },
    };
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
  }
}
