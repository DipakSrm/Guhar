import Link from "next/link";
import { useState } from "react";
import Bars from "@heroicons/react/24/solid/Bars4Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      {" "}
      <div className="bg-black w-full max-h-[20%] py-4 flex items-center justify-evenly ">
        <Bars
          className="w-5 block md:hidden lg:hidden text-white"
          onClick={() => setisOpen(!isOpen)}
        />
        <Link
          href="/blogs"
          className="text-white text-lg hidden lg:block md:block"
        >
          Blogs
        </Link>
        <Link
          href="/categories/currentaffairs"
          className="text-white text-lg hidden lg:block md:block"
        >
          Current Affairs
        </Link>
        <Link
          href="/categories/sports"
          className="text-white text-lg hidden lg:block md:block"
        >
          Sports
        </Link>
        <Link href="/" className="text-white text-3xl font-bold ">
          गुहार
        </Link>
        <Link
          href="/categories/economics"
          className="text-white text-lg hidden lg:block md:block"
        >
          Economics
        </Link>

        <Link
          href="/contact-us"
          className="text-white text-lg hidden lg:block md:block"
        >
          Contact Us
        </Link>
        <div className="text-white text-lg "> search</div>
      </div>
      {/**this is for small devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-50 flex flex-col justify-center items-center gap-3 transition-all ease-in duration-500 z-10"
          style={{ left: isOpen ? "0" : "-100%" }}
        >
          <XMarkIcon
            className="w-10 text-black absolute top-[10%] right-[10%]"
            onClick={() => setisOpen(!isOpen)}
          />
          <Link href="/" className="text-black text-3xl font-bold ">
            गुहार
          </Link>
          <Link href="/blogs" className="text-black text-lg ">
            Blogs
          </Link>
          <Link
            href="/categories/currentaffairs"
            className="text-black text-lg "
          >
            Current Affairs
          </Link>
          <Link href="/categories/sports" className="text-black text-lg ">
            Sports
          </Link>

          <Link href="/categories/economics" className="text-black text-lg ">
            Economics
          </Link>

          <Link href="/contact-us" className="text-black text-lg ">
            Contact Us
          </Link>
        </div>
      )}
    </>
  );
}
