import { Post } from "@/utils/TypeInterfaces";
import { calculation } from "@/utils/sharedFunction";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CatCard({
  Title,
  Content,
  CreatedOn,
  Author,
  ImageUrl,
}: Post) {
  const router = useRouter();
  return (
    <div className="rounded-lg shadow">
      <Image
        src={ImageUrl}
        alt="Card Image"
        height={500}
        width={500}
        className="roiunded-sm"
      />
      <h1 className="font-bold text-2xl">{Title}</h1>
      <p>{Content ? Content.slice(0, 100) : `Loading..`}...</p>
      <p>Created On: {calculation(CreatedOn)}</p>
      <p>Author: {Author}</p>
    </div>
  );
}
