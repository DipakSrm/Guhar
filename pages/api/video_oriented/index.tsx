import { Client, Databases } from "appwrite";
import { HomeVideoOriented, VideoOriented } from "@/utils/TypeInterfaces";
import {
  ENDPOINT,
  PROJ_ID,
  SPECIAL_DB_ID,
  VIDEOS_ORIENTED_ID,
} from "@/utils/sharedConst";
const handler = async (req: string, res: HomeVideoOriented) => {
  try {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint(`${ENDPOINT}`) // Your API Endpoint
      .setProject(`${PROJ_ID}`); // Your project ID

    const promise = databases.listDocuments(
      `${SPECIAL_DB_ID}`,
      `${VIDEOS_ORIENTED_ID}`
    );

    const response = await promise;

    // Assuming the response is an array of objects
    const dataArray = response.documents.map((document): VideoOriented => {
      return {
        Author: document.Author,
        Title: document.Title,
        CreatedOn: document.$createdAt,
        Content: document.Content,
        id: document.$id,
        Video1: document.Video1,
      };
    });

    const responseData: HomeVideoOriented = {
      data: dataArray,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
  }
};
export default handler;
