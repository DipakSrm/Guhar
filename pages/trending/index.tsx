import Card4Trending from "@/components/Card4Trending";
import MainLayout from "@/components/layouts/mainlayout";
import { HomeTrending, Trending } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import SeoHead from "@/components/shared/seo-head";

export default function TrendingPage({ data }: HomeTrending) {
  return (
    <MainLayout>
      <SeoHead
        title="Trending Videos | Guhar"
        description="Watch and follow trending visual stories and highlights selected by Guhar."
        path="/trending"
      />
      <h1 className="mb-6 border-b border-gray-300 pb-3 text-4xl font-bold text-gray-900 md:text-5xl">
        Trending Videos
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {(data || []).map((item: Trending, index: number) => (
          <Card4Trending item={item} index={index} key={item.id} />
        ))}
      </div>
    </MainLayout>
  );
}

function getBaseUrl(req: NextApiRequest) {
  const protocol = (req.headers["x-forwarded-proto"] as string) || "http";
  return `${protocol}://${req.headers.host}`;
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = getBaseUrl(req);
  try {
    const response = await fetch(`${baseUrl}/api/trending`);
    const data = await response.json();
    return {
      props: {
        data: data.data || [],
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        data: [],
      },
    };
  }
}
