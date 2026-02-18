import MainLayout from "@/components/layouts/mainlayout";
import { Blog, HomeBlog } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import { NextApiRequest } from "next";
import SeoHead from "@/components/shared/seo-head";

export default function BlogsPage({ data }: HomeBlog) {
  return (
    <MainLayout>
      <SeoHead
        title="Blogs & Features | Guhar"
        description="Explore analysis, explainers, and featured stories curated by Guhar editors."
        path="/blogs"
      />
      <h1 className="mb-6 border-b border-gray-300 pb-3 text-4xl font-bold text-gray-900 md:text-5xl">
        Blogs & Features
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {(data || []).map((item: Blog, index: number) => (
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
  const response = await fetch(`${baseUrl}/api/blogs`);
  const data = await response.json();

  return {
    props: {
      data: data.data || [],
    },
  };
}
