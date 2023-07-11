import MainLayout from "@/components/layouts/mainlayout";
import { Post } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import { HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";

export default function HomePage({ data }: HomePost) {
  if (!data) {
    return <>loading...</>;
  }
  console.log("data", data);
  return (
    <MainLayout>
      <h1 className="text-red-900 my-6 text-7xl font-bold text-center">
        Latest News
      </h1>
      <div className="grid h-full  grid-rows-3 xl:grid-cols-2  gap-3 my-3">
        {data.map((item: Post, index: number) => {
          return <Card item={item} index={index} key={item.id} />;
        })}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
  const response = await fetch(`${baseUrl}/api/cat_index`);
  const data = await response.json();

  return {
    props: {
      data: data.data,
    },
  };
}
