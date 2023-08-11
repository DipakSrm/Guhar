import { Post } from "@/utils/TypeInterfaces";
import { calculation } from "@/utils/sharedFunction";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CatCard({
  Title,
  Content,
  CreatedOn,
  Author,
  ImageUrl,
  Category,
  id,
}: Post) {
  const router = useRouter();
  return (
    <div
      className="rounded-lg shadow hover:cursor-pointer"
      onClick={() =>
        router.push(
          `${
            Category
              ? `/categories/${Category.toLowerCase()}/${id}`
              : `/blogs/${id}`
          }`
        )
      }
    >
      <Image
        src={ImageUrl ? ImageUrl : ""}
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
