import { Blog } from "@/utils/TypeInterfaces";
import { calculation } from "@/utils/sharedFunction";
import Image from "next/image";

export default function InBloCard({
  Title,
  Author,
  Content,
  Image1_Url,
  Image2_Url,
  CreatedOn,
}: Blog) {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 ">
        {" "}
        <h1 className="font-bold text-6xl">{Title} </h1>
        <p className="font-thin text-2xl ">({calculation(CreatedOn)})</p>
      </div>{" "}
      <div className="mx-auto w-[60%] my-[5%] ">
        <Image
          src={Image1_Url}
          alt="Image"
          className="my-10 rounded-sm shadow"
          width={800}
          height={800}
        />
        <p className="text-xl font-semibold">{Content}</p>
        <img
          src={Image2_Url}
          height={500}
          width={500}
          className={Image2_Url ? "block" : "hidden"}
        />
        <p className=" text-right font-bold text-l">-({Author})</p>
      </div>
    </>
  );
}
