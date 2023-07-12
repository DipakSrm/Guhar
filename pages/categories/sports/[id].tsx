import InCard from "@/components/in_Cat_Card";
import Footer from "@/components/shared/footer";
import { Post, HomePost } from "@/utils/TypeInterfaces";
import { useRouter } from "next/router";
const BASE_URL = process.env.BASE_URI;
export default function EconomicsId({ data }: Post) {
  console.log("data", data);
  const { Title, Content, Image, aurthor, $createdAt } = data.data;
  const router = useRouter();
  return (
    <>
      <InCard
        Title={Title}
        Content={Content}
        Image_Url={Image}
        Author={aurthor}
        CreatedOn={$createdAt}
      />
      <Footer />
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
    const response = await fetch(`${baseUrl}/api/categories/sports/${id}`);

    const data = await response.json(); // Access the 'data' array from the response

    return {
      props: {
        data: {
          data: data,
        },
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
