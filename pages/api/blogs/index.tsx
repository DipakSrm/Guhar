import { Client, Databases, Query } from "appwrite";
import { HomePost } from "@/utils/TypeInterfaces";
import {
  CURRENT_ID,
  DB_ID,
  ECO_ID,
  ENDPOINT,
  PROJ_ID,
  SPORTS_ID,
} from "@/utils/sharedConst";

const handler = async (req: string, res: HomePost) => {
  try {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint(`${ENDPOINT}`) // Your API Endpoint
      .setProject(`${PROJ_ID}`); // Your project ID

    const promise1 = databases.listDocuments(`${DB_ID}`, `${CURRENT_ID}`, [
      Query.orderDesc("$createdAt"), // Order by title in ascending order
      // Order by year in descending order
    ]);

    const promise2 = databases.listDocuments(`${DB_ID}`, `${SPORTS_ID}`, [
      Query.orderDesc("$createdAt"), // Order by title in ascending order
      // Order by year in descending order
    ]);
    const promise3 = databases.listDocuments(`${DB_ID}`, `${ECO_ID}`, [
      Query.orderDesc("$createdAt"), // Order by title in ascending order
      // Order by year in descending order
    ]);

    const [response1, response2, response3] = await Promise.all([
      promise1,
      promise2,
      promise3,
    ]);

    const dataArray1 = response1.documents.map((document) => {
      return {
        Author: document.aurthor,
        Title: document.Title,
        CreatedOn: document.$createdAt,
        Content: document.Content,
        id: document.$id,
        Image: document["Image"],
      };
    });

    const dataArray2 = response2.documents.map((document) => {
      return {
        Author: document.aurthor,
        Title: document.Title,
        CreatedOn: document.$createdAt,
        Content: document.Content,
        id: document.$id,
        Image: document["Image"],
      };
    });
    const dataArray3 = response3.documents.map((document) => {
      return {
        Author: document.aurthor,
        Title: document.Title,
        CreatedOn: document.$createdAt,
        Content: document.Content,
        id: document.$id,
        Image: document["Image"],
      };
    });

    const responseData: HomePost = {
      data: [...dataArray1, ...dataArray2, ...dataArray3],
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
