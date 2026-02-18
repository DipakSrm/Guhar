import Card4Trending from "@/components/Card4Trending";
import MainLayout from "@/components/layouts/mainlayout";
import { Trending } from "@/utils/TypeInterfaces";
import { NextApiRequest } from "next";
import SeoHead from "@/components/shared/seo-head";
import Pagination from "@/components/shared/pagination";

type TrendingPageProps = {
  data: Trending[];
  currentPage: number;
  totalPages: number;
};

const PAGE_SIZE = 6;

export default function TrendingPage({ data, currentPage, totalPages }: TrendingPageProps) {
  return (
    <MainLayout>
      <SeoHead
        title={`Trending Videos${currentPage > 1 ? ` - Page ${currentPage}` : ""} | Guhar`}
        description="Watch and follow trending visual stories and highlights selected by Guhar."
        path={currentPage > 1 ? `/trending?page=${currentPage}` : "/trending"}
      />
      <header className="mb-6 border-b border-gray-300 pb-3">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Trending Videos</h1>
        <p className="mt-2 text-sm text-gray-600">The most discussed visual stories right now.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {(data || []).map((item: Trending, index: number) => (
          <Card4Trending item={item} index={index} key={item.id} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/trending" />
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
  try {
    const response = await fetch(`${baseUrl}/api/trending`);
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
  } catch (error) {
    console.log(error);

    return {
      props: {
        data: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
}
