import InCard from "@/components/in_Cat_Card";

import { Post, HomePost, HomeBlog } from "@/utils/TypeInterfaces";

import Cardlayout from "@/components/layouts/cardlayout";
export default function CurrentAffairsId({
  data1,
  data2,
  data3,
}: {
  data1: Post;
  data2: HomePost;
  data3: HomeBlog;
}) {
  return (
    <>
      {" "}
      <Cardlayout>
        <InCard data1={data1} data2={data2} data3={data3} />
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
    const response1 = await fetch(`${baseUrl}/api/categories/current/${id}`);
    const response2 = await fetch(`${baseUrl}/api/categories/current`);
    const response3 = await fetch(`${baseUrl}/api/blogs`);
    const data1: Post = await response1.json(); // Access the 'data' array from the response
    const data2: HomePost = await response2.json();
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
