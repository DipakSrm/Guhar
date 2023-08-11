import Card4Trending from "@/components/Card4Trending";

import MainLayout from "@/components/layouts/mainlayout";
import { HomeTrending, Trending } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";

export default function TrendingPage({ data }: HomeTrending) {
  return (
    <>
      <MainLayout>
        <h1 className="text-red-900  py-4 text-7xl font-bold text-center">
          Latest News
        </h1>
        <div className="grid h-full  grid-rows-3 xl:grid-cols-2  gap-6 my-3 ">
          {data.map((item: Trending, index: number) => {
            return <Card4Trending item={item} index={index} key={item.id} />;
          })}
        </div>
      </MainLayout>
    </>
  );
}
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
  try {
    const response = await fetch(`${baseUrl}/api/trending`);
    const data = await response.json();
    return {
      props: {
        data: data.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
