import { answerCollection, db } from "../name";
import { Permission } from "node-appwrite";
import { databases } from "./config";

export default async function createAnswerCollection() {
  try {
    // create collection
    await databases.createCollection(db, answerCollection, answerCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);

    console.log("answler collection created");

    // create attributes and indexes

    await Promise.all([
      databases.createStringAttribute(
        db,
        answerCollection,
        "content",
        10000,
        true
      ),
      databases.createStringAttribute(
        db,
        answerCollection,
        "authorId",
        55,
        true
      ),
      databases.createStringAttribute(
        db,
        answerCollection,
        "questionId",
        55,
        true
      ),
    ]);

    console.log("answer attribute created");
  } catch (error: any) {
    console.log("error in creating answer collection", error);
  }
}
