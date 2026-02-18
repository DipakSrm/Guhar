import MainLayout from "@/components/layouts/mainlayout";
import { Blog } from "@/utils/TypeInterfaces";
import Card from "@/components/card";
import { NextApiRequest } from "next";
import SeoHead from "@/components/shared/seo-head";
import Pagination from "@/components/shared/pagination";

type BlogsPageProps = {
  data: Blog[];
  currentPage: number;
  totalPages: number;
};

const PAGE_SIZE = 8;

export default function BlogsPage({ data, currentPage, totalPages }: BlogsPageProps) {
  return (
    <MainLayout>
      <SeoHead
        title={`Blogs & Features${currentPage > 1 ? ` - Page ${currentPage}` : ""} | Guhar`}
        description="Explore analysis, explainers, and featured stories curated by Guhar editors."
        path={currentPage > 1 ? `/blogs?page=${currentPage}` : "/blogs"}
      />
      <header className="mb-6 border-b border-gray-300 pb-3">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Blogs & Features</h1>
        <p className="mt-2 text-sm text-gray-600">Editorial analysis, explainers, and long-form reads.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {(data || []).map((item: Blog, index: number) => (
          <Card item={item} index={index} key={item.id} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blogs" />
    </MainLayout>
  );
}

function getBaseUrl(req: NextApiRequest) {
  const protocol = (req.headers["x-forwarded-proto"] as string) || "http";
  return `${protocol}://${req.headers.host}`;
}

function parsePage(page: string | string[] | undefined) {
  const raw = Array.isArray(page) ? page[0] : page;
  const parsed = Number.parseInt(raw || "1", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

export async function getServerSideProps({ req, query }: { req: NextApiRequest; query: { page?: string | string[] } }) {
  const baseUrl = getBaseUrl(req);
  const page = parsePage(query.page);
  const response = await fetch(`${baseUrl}/api/blogs`);
  const json = await response.json();
  const data = json.data || [];
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;

  return {
    props: {
      data: data.slice(start, start + PAGE_SIZE),
      currentPage: safePage,
      totalPages,
    },
  };
}
