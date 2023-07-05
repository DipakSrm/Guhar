import { Client, Databases } from "appwrite";
export function DbConnect() {
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("648d91fcb9386a6a3ee5"); // Your project ID

  const databases = new Databases(client);
}
