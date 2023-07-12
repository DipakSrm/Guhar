import { Post } from "@/utils/TypeInterfaces";
import { calculation } from "@/utils/sharedFunction";
import Image from "next/image";

const InCard: React.FC<Post> = ({
  Title,
  Content,
  Image_Url,
  Author,
  CreatedOn,
}: Post) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 ">
        {" "}
        <h1 className="font-bold text-6xl">{Title} </h1>
        <p className="font-thin text-2xl ">({calculation(CreatedOn)})</p>
      </div>{" "}
      <div className="mx-auto w-[60%] my-[5%] ">
        <Image
          src={Image_Url}
          alt="Image"
          className="my-10 rounded-sm shadow"
          width={800}
          height={800}
        />{" "}
        <p className="text-xl font-semibold">{Content}</p>
        <p className=" text-right font-bold text-l">-({Author})</p>
      </div>
    </>
  );
};
export default InCard;
