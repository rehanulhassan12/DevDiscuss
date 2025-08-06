import { IndexType, Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  try {
    // create collection
    await databases.createCollection(db, commentCollection, commentCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);

    console.log("comment collection created");

    // create attributes and indexes

    await Promise.all([
      databases.createStringAttribute(
        db,
        commentCollection,
        "content",
        10000,
        true
      ),
      databases.createStringAttribute(
        db,
        commentCollection,
        "authorId",
        55,
        true
      ),
      databases.createStringAttribute(
        db,
        commentCollection,
        "typeId",
        55,
        true
      ),
      databases.createEnumAttribute(
        db,
        commentCollection,
        "type",
        ["question", "answer"],
        true
      ),
    ]);

    console.log("comment attribute created");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error in creating comment collection", error);
    }
  }
}
