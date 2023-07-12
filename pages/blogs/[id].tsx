import InBloCard from "@/components/in_Blo_Card";
import Footer from "@/components/shared/footer";
import { Post, HomePost, Blog } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";

export default function InBlog({ data }: Blog) {
  console.log("data", data);
  const { Title, Author, Content, Image1, Image2, $createdAt }: Blog =
    data.data;
  const router = useRouter();

  return (
    <>
      <InBloCard
        Title={Title}
        Author={Author}
        Content={Content}
        Image1_Url={Image1}
        Image2_Url={Image2}
        CreatedOn={$createdAt}
      />
    </>
  );
}
// ...
export async function getServerSideProps(context: any) {
  const { req, params } = context;
  const { id } = params;

  try {
    const baseUrl = `${req?.headers["x-forwarded-proto"]}://${req?.headers.host}`;
    const response = await fetch(`${baseUrl}/api/blogs/${id}`);
    const data = await response.json();

    return {
      props: {
        data: {
          data: data,
        }, // Pass the 'data' object as a prop
      },
    };
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
  }
}
