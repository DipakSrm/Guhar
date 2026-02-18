import Link from "next/link";
import { useState } from "react";
import Bars from "@heroicons/react/24/solid/Bars4Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import Image from "next/image";

const navigationItems = [
  { href: "/news", label: "Latest" },
  { href: "/blogs", label: "Blogs" },
  { href: "/categories/currentaffairs", label: "Current Affairs" },
  { href: "/categories/sports", label: "Sports" },
  { href: "/categories/economics", label: "Economy" },
  { href: "/trending", label: "Trending" },
  { href: "/contact-us", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6"
      >
        <Link href="/" className="inline-flex items-center gap-3" aria-label="Go to homepage">
          <Image src="/logo3.png" alt="Guhar logo" width={110} height={52} priority />
          <span className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 md:block">
            Nepal & Global News
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-md p-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
        </button>

        <ul className="hidden items-center gap-5 md:flex">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-semibold text-gray-700 transition hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <ul className="space-y-2" aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-100 hover:text-red-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
