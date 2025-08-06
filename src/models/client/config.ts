import { Client, Account,Avatars,Databases,Storage } from 'appwrite';
import { env } from '@/env';


export const client = new Client();

client
    .setEndpoint(env.appWrite.endpoint)
    .setProject(env.appWrite.projectId);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);


