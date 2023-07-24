import InTrendCard from "@/components/in_Tren_Card";

import { HomeBlog, Trending, HomeTrending } from "@/utils/TypeInterfaces";

import { useRouter } from "next/router";
import Cardlayout from "@/components/layouts/cardlayout";

export default function CurrentAffairsId({
  data1,
  data2,
  data3,
}: {
  data1: Trending;
  data2: HomeTrending;
  data3: HomeBlog;
}) {
  console.log("data", data1);
  console.log("data2", data2);
  console.log("data3", data3);
  const router = useRouter();
  return (
    <>
      {" "}
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
