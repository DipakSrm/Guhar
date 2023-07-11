import MainLayout from "@/components/layouts/mainlayout";
import { Blog, HomeBlog, Post } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import { HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import Image from "next/image";
import Link from "next/link";

export default function HomePage({ data_cms, data_blogs }: HomeBlog) {
  if (!data_cms) {
    return <>loading...</>;
  }
  console.log("data", data_cms);
  console.log("data blogs", data_blogs);
  return (
    <MainLayout>
      <div className="grid grid-cols-5  my-6 py-5  mx-4">
        <div className="lg:col-span-3 w-full mx-auto col-span-12">
          <Image
            src={`https://cloud.appwrite.io/v1/storage/buckets/648d9fe4c0445ed85915/files/64a6fc759cc96b4417c0/view?project=648d91fcb9386a6a3ee5&mode=admin`}
            width={1000}
            height={1000}
            alt="Latest update of all news"
            className="shadow round-lg"
          ></Image>
        </div>
        <div className="lg:col-span-2 col-span-12  ">
          {data_cms.map((item: Blog, index: number) => {
            if (index < 3) {
              return <Card item={item} index={index} key={item.id} />;
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

        <div className="text-lg font-semibold text-red-700 text-right onclick order-1 lg:order-2 md:order-2">
          <Link href="/news">See More...</Link>
        </div>
      </div>
      {/* Section Break */}
      <div className="lg:overflow-x-auto ">
        <div className=" flex gap-3 py-4 flex-col lg:flex-row">
          {data_blogs.map((item: Blog) => {
            return <Card item={item} key={item.id} />;
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

    if (!response_cms.ok || !response_blogs.ok) {
      console.log("Error in API response");
      // Handle the error or return an appropriate response
    }

    const data_cms = await response_cms.json();
    const data_blogs = await response_blogs.json();
    console.log("data_cms", data_cms);
    console.log("data_blogs", data_blogs);

    return {
      props: {
        data_cms: data_cms.data,
        data_blogs: data_blogs.data,
      },
    };
  } catch (error) {
    console.log("Error:", error);
    // Handle the error or return an appropriate response
  }
}
