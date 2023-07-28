import Link from "next/link";
import { useState } from "react";
import Bars from "@heroicons/react/24/solid/Bars4Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import Image from "next/image";
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
          className="text-white text-lg hidden lg:block md:block hover:text-gray-300"
        >
          Blogs
        </Link>
        <Link
          href="/categories/currentaffairs"
          className="text-white text-lg hidden lg:block md:block hover:text-gray-300"
        >
          Current Affairs
        </Link>
        <Link
          href="/categories/sports"
          className="text-white text-lg hidden lg:block md:block hover:text-gray-300"
        >
          Sports
        </Link>
        <Link href="/" className="text-white text-3xl font-bold ">
          <div className="flex items-center">
            <div className=" max-h-[150px] max-w-[150px] ">
              <Image
                className=""
                src="/logo2.png"
                alt="logo guhar"
                height={1000}
                width={1000}
              />
            </div>
          </div>
        </Link>
        <Link
          href="/categories/economics"
          className="text-white text-lg hidden lg:block md:block hover:text-gray-300"
        >
          Economics
        </Link>

        <div className="text-white text-lg hidden lg:block md:block hover:text-gray-300">
          {" "}
          <Link href="/trending">Trending</Link>
        </div>

        <Link
          href="/contact-us"
          className="text-white text-lg  flex gap-1 hover:text-gray-300"
        >
          <PhoneIcon className="w-[20px]" />
          About Us
        </Link>
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
            About Us
          </Link>
        </div>
      )}
    </>
  );
}
