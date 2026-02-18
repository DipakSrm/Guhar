import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
    if (totalPages <= 7) {
      return true;
    }

    return Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
  });

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
      <Link
        href={createHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`rounded-md border px-3 py-2 text-sm font-semibold ${
          currentPage === 1
            ? "pointer-events-none border-gray-200 text-gray-400"
            : "border-gray-300 text-gray-700 hover:border-red-700 hover:text-red-700"
        }`}
      >
        Previous
      </Link>

      {pages.map((page, index) => {
        const previous = pages[index - 1];
        const showDots = previous && page - previous > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {showDots ? <span className="px-1 text-gray-500">…</span> : null}
            <Link
              href={createHref(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                page === currentPage
                  ? "border-red-700 bg-red-700 text-white"
                  : "border-gray-300 text-gray-700 hover:border-red-700 hover:text-red-700"
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={createHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`rounded-md border px-3 py-2 text-sm font-semibold ${
          currentPage === totalPages
            ? "pointer-events-none border-gray-200 text-gray-400"
            : "border-gray-300 text-gray-700 hover:border-red-700 hover:text-red-700"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
