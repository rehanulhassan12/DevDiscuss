import {Client,Users ,Account,Avatars,Databases,Storage} from "node-appwrite"
import { env } from '@/env';

export const client = new Client();

client
  .setEndpoint(env.appWrite.endpoint)
  .setProject(env.appWrite.projectId)
  .setKey(env.appWrite.apiKey);


export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);


