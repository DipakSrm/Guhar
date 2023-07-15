import CatCard from "@/components/CatCard";
import MainLayout from "@/components/layouts/mainlayout";
import { Post, HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";

export default function CurrentAffairs({ data }: HomePost) {
  console.log("data", data);

  const router = useRouter();

  return (
    <>
      <MainLayout>
        <h1 className="text-center font-bold text-6xl my-8">ताजा खबर</h1>
        <h1 className="text-center font-semibold text-3xl text-red-900">
          वर्तमान मामिलामा
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1  gap-6 my-5 ">
          {" "}
          {data.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() =>
                  router.push(`/categories/currentaffairs/${item.id}`)
                }
                className="hover:cursor-pointer"
              >
                <CatCard
                  Title={item.title}
                  Content={item.content}
                  ImageUrl={item.image}
                  Author={item.author}
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
    const response = await fetch(`${baseUrl}/api/categories/current/`);
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
