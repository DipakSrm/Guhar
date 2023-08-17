import CatCard from "@/components/CatCard";
import MainLayout from "@/components/layouts/mainlayout";
import { HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Economics({ data }: HomePost) {
  const router = useRouter();

  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Sports Page</title>
        <meta
          name="description"
          content="latest sports news all over nepal "
        ></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <MainLayout>
        <h1 className="text-center font-bold text-6xl my-8">ताजा खबर</h1>
        <h1 className="text-center font-semibold text-3xl text-red-900">
          खेलकुद
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1  gap-6 my-5 ">
          {" "}
          {data.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => router.push(`/categories/sports/${item.id}`)}
                className="hover:cursor-pointer"
              >
                <CatCard
                  Title={item.title}
                  Content={item.content}
                  ImageUrl={item.image}
                  Author={item.Author}
                  CreatedOn={item.createdon}
                  id={item.id}
                  key={item.id}
                />
              </div>
            );
          })}
        </div>
      </MainLayout>
    </>
  );
}
// ...
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    const baseUrl = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
    const response = await fetch(`${baseUrl}/api/categories/sports/`);
    const data = await response.json();
    return {
      props: {
        data: data.data, // Pass the response directly as 'data'
      },
    };
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    return {
      props: {
        data: [], // Set an empty array as the 'data' property in case of an error
      },
    };
  }
}
