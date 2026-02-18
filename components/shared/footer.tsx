import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="text-sm font-semibold text-gray-900">Guhar News Portal</p>
          <p className="text-sm text-gray-600">
            Reliable coverage of Nepal and global affairs with accessible storytelling.
          </p>
        </div>

        <ul className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700">
          <li>
            <Link href="/news" className="hover:text-red-700">
              Latest News
            </Link>
          </li>
          <li>
            <Link href="/trending" className="hover:text-red-700">
              Trending
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-red-700">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 text-center text-xs text-gray-500 md:px-6">
        © {new Date().getFullYear()} Guhar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
