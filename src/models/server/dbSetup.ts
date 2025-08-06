import { databases } from "./config";
import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import createStorage from "./storageSetup";

export default async function getOrCreateDb() {
  try {
    await databases.get(db);
    console.log("Database connected successfully");
  } catch (error: any) {
    try {
      await databases.create(db, db);

      console.log("Database created successfully");

      Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createVoteCollection(),
        createCommentCollection(),
      ]);

      console.log("collection are created successfully ");
      console.log("DB connected successfully");
    } catch (error: any) {
      console.log("error in creating database or collections", error);
    }
  }
  return databases;
}
