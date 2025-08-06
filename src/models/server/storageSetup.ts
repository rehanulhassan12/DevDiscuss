import { Permission } from "node-appwrite";
import { questionsAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionsAttachmentBucket);
    console.log("storage connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("storage not created");
    }
    try {
      await storage.createBucket(
        questionsAttachmentBucket,
        questionsAttachmentBucket,
        [
          Permission.create("users"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
          Permission.read("any"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp"]
      );

      console.log("storage created");
      console.log("storage connected");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error in creating storage", error);
      }
    }
  }
}
