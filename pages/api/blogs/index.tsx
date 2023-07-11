import { Blog, HomeBlog } from "@/utils/TypeInterfaces";
import {
  ENDPOINT,
  PROJ_ID,
  BLOGS_DB_ID,
  TRENDING_ID,
} from "@/utils/sharedConst";
import { Client, Databases } from "appwrite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint(`${ENDPOINT}`) // Your API Endpoint
      .setProject(`${PROJ_ID}`); // Your project ID
    const promise1 = databases.listDocuments(
      `${BLOGS_DB_ID}`,
      `${TRENDING_ID}`
    );
    const response1 = await promise1;
    const dataArray1 = response1.documents.map((document): Blog => {
      return {
        Title: document.Title,
        Content: document.Content,
        CreatedOn: document.$createdAt,
        Author: document.Author,
        id: document.$id,
        Image1: document.Image1,
        Image2: document.Image2 || null,
      };
    });
    const responseData: HomeBlog = {
      data: dataArray1,
    };
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
  }
}
