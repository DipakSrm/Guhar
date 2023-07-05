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
      <div className="grid h-full  grid-rows-3 xl:grid-cols-2  gap-1 my-3">
        {data.map((item: Post, index: number) => {
          return <Card item={item} index={index} key={item.id} />;
        })}
      </div>
    </MainLayout>
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
