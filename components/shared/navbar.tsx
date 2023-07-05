import Link from "next/link";
import CheveronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { useState } from "react";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnyfyingIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

export default function Navbar() {
  const [dropOpen, setdropOpen] = useState(false);
  const [barsOpen, setbarsOpen] = useState(true);

  return (
    <>
      <div className="w-full h-[20%] bg-black text-white flex justify-evenly items-center">
        <button onClick={() => setbarsOpen(!barsOpen)}>
          <Bars3Icon className="w-6" />
        </button>
        <div className="text-3xl font-bold py-6">गुहर</div>

        <div className="flex gap-2">
          <span>
            {" "}
            <MagnyfyingIcon className="w-6" />
          </span>
          Search
        </div>
      </div>
      <div
        className={`bg-black text-white w-full flex justify-evenly overflow-hidden transition-all ${
          barsOpen ? `block max-h-400px ease-in` : `max-h-0 ease-out hidden`
        }`}
      >
        <div className="">
          <ul>
            <li className="inline-block p-4">
              <Link href="/">Home</Link>
            </li>
            <li className="inline-block p-4">
              <div className="flex gap-3 ">
                <span>Categories</span>
                <button onClick={() => setdropOpen(!dropOpen)}>
                  <CheveronDownIcon className="w-6 " />
                </button>
              </div>
              <ul
                className={`overflow-hidden transition-all ${
                  dropOpen ? "max-h-[200px] ease-in" : "max-h-0 ease-out"
                }`}
              >
                <li className="text-slate-400 hover:text-white">
                  <Link href="/categories/sports">Sports</Link>
                </li>
                <li className="text-slate-400 hover:text-white">
                  <Link href="/categories/economics">Economics</Link>
                </li>
                <li className="text-slate-400 hover:text-white">
                  <Link href="/currentaffairs">CurrentAffairs</Link>
                </li>
              </ul>
            </li>
            <li className="inline-block p-4">
              <Link href="/About-Us">About-Us</Link>
            </li>
            <li className="inline-block p-4">
              <Link href="/Contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
