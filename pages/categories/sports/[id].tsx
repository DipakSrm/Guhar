import InCard from "@/components/in_Cat_Card";
import Footer from "@/components/shared/footer";
import { Post, HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import Cardlayout from "@/components/layouts/cardlayout";
const BASE_URL = process.env.BASE_URI;
export default function CurrentAffairsId({
  data1,
  data2,
}: {
  data1: Post;
  data2: HomePost;
}) {
  console.log("data", data1);
  console.log("data2", data2);
  const router = useRouter();
  return (
    <>
      {" "}
      <Cardlayout>
        <InCard data1={data1} data2={data2} />
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
    const response1 = await fetch(`${baseUrl}/api/categories/sports/${id}`);
    const response2 = await fetch(`${baseUrl}/api/categories/sports`);
    const data1 = await response1.json(); // Access the 'data' array from the response
    const data2 = await response2.json();
    return {
      props: {
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
