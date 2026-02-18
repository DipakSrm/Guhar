import Link from "next/link";

const topLinks = [
  { href: "/news", label: "Latest" },
  { href: "/trending", label: "Trending" },
  { href: "/blogs", label: "Opinion" },
  { href: "/contact-us", label: "Contact" },
];

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b border-gray-200 bg-gray-900 text-gray-100">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs md:px-6">
        <p aria-label="Today date" className="font-medium">
          {today}
        </p>
        <ul className="flex items-center gap-3">
          {topLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-red-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
