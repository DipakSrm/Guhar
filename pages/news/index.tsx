import MainLayout from "@/components/layouts/mainlayout";
import { Post } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import { HomePost } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import SeoHead from "@/components/shared/seo-head";

export default function NewsPage({ data }: HomePost) {
  return (
    <MainLayout>
      <SeoHead
        title="Latest News | Guhar"
        description="Read the latest verified updates from Nepal and around the globe on Guhar."
        path="/news"
      />
      <h1 className="mb-6 border-b border-gray-300 pb-3 text-4xl font-bold text-gray-900 md:text-5xl">
        Latest News
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {(data || []).map((item: Post, index: number) => (
          <Card item={item} index={index} key={item.id} />
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
  const response = await fetch(`${baseUrl}/api/cat_index`);
  const data = await response.json();

  return {
    props: {
      data: data.data || [],
    },
  };
}
