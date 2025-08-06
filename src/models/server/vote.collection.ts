import { Permission } from "node-appwrite";
import { voteCollection, db } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
  try {
    // create collection
    await databases.createCollection(db, voteCollection, voteCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);

    console.log("vote collection created");

    // create attributes and indexes

    await Promise.all([
      databases.createStringAttribute(db, voteCollection, "votedBy", 55, true),
      databases.createStringAttribute(db, voteCollection, "typeId", 55, true),
      databases.createEnumAttribute(
        db,
        voteCollection,
        "type",
        ["question", "answer"],
        true
      ),
      databases.createEnumAttribute(
        db,
        voteCollection,
        "voteStatus",
        ["upvoted", "downvoted"],
        true
      ),
    ]);

    console.log("vote attribute created");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error in creating vote collection", error);
    }
  }
}
