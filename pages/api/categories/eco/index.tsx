import { Client, Databases } from "appwrite";
import { Post, HomePost } from "@/utils/TypeInterfaces";
import { CMS_DB_ID, ECO_ID, ENDPOINT, PROJ_ID } from "@/utils/sharedConst";

const handler = async (req: string, res: HomePost) => {
  try {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint(`${ENDPOINT}`) // Your API Endpoint
      .setProject(`${PROJ_ID}`); // Your project ID

    const promise = databases.listDocuments(`${CMS_DB_ID}`, `${ECO_ID}`);

    const response = await promise;

    // Assuming the response is an array of objects
    const dataArray = response.documents.map((document) => {
      return {
        Author: document.Aurthor,
        title: document.Title,
        createdon: document.$createdAt,
        content: document.Content,
        id: document.$id,
        Category: document.Category,
        image: document["Image"],
      };
    });

    const responseData: HomePost = {
      data: dataArray,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
  }
};
export default handler;
