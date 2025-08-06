import { NextRequest, NextResponse } from "next/server";
import { databases, users } from "@/models/server/config";
import {
  db,
  answerCollection,
  voteCollection,
  questionCollection,
} from "@/models/name";
import { ID, Query } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";

export async function POST(req: NextRequest) {
  const { votedBy, voteStatus, type, typeId } = await req.json();
  console.log("input data is", votedBy, voteStatus, type, typeId);

  /// find in db if voted by user or not

  const response = await databases.listDocuments(db, voteCollection, [
    Query.equal("type", type),
    Query.equal("typeId", typeId),
    Query.equal("votedBy", votedBy),
  ]);
  console.log("present document is ", response.documents[0]);
  console.log("response is ", response);

  if (response.documents.length > 0) {
    /// delete the present document from db

    await databases.deleteDocument(
      db,
      voteCollection,
      response.documents[0].$id
    );

    // decrease user reputation but for that first we need to grap weather  its question or answer reputation

    const questionOrAnswer = await databases.getDocument(
      db,
      type == "question" ? questionCollection : answerCollection,
      typeId
    );

    /// now get user reputation from user pref using questionOrAnswer author id

    const prefs = await users.getPrefs<UserPrefs>(questionOrAnswer?.authorId);

    /// update the pref

    const updatedPref = await users.updatePrefs<UserPrefs>(
      questionOrAnswer.authorId,
      {
        reputation:
          voteStatus == "upvoted"
            ? Number(prefs.reputation - 1)
            : Number(prefs.reputation + 1),
      }
    );

    console.log(
      "user reputation updated successfully after deleting document ",
      updatedPref
    );
  }

  // there is a chance that document is either present and its status changed or not present in db

  if (response.documents[0]?.voteStatus !== voteStatus) {
    const newUserVoteStatus = await databases.createDocument(
      db,
      voteCollection,
      ID.unique(),
      {
        type,
        typeId,
        votedBy,
        voteStatus,
      }
    );

    console.log(
      "new user vote status created successfully ",
      newUserVoteStatus
    );

    // increase and decrease reputations

    const questionOrAnswer = await databases.getDocument(
      db,
      type == "question" ? questionCollection : answerCollection,
      typeId
    );

    const prefs = await users.getPrefs<UserPrefs>(questionOrAnswer?.authorId);

    // check if vote was present

    if (response.documents[0]) {
      // update user pref based on  current vote status

      // this mean vote status was changed
      const updatedPref = await users.updatePrefs<UserPrefs>(
        questionOrAnswer.authorId,
        {
          reputation:
            voteStatus == "upvoted"
              ? Number(prefs.reputation + 1)
              : Number(prefs.reputation - 1),
        }
      );

      console.log("user reputation updated successfully ", updatedPref);
    } else {
      // this mean new vote was added
      const updatedPref = await users.updatePrefs<UserPrefs>(
        questionOrAnswer.authorId,
        {
          reputation:
            voteStatus == "upvoted"
              ? Number(prefs.reputation + 1)
              : Number(prefs.reputation - 1),
        }
      );

      console.log("user reputation updated successfully ", updatedPref);
    }

    const [upVote, downVote] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.limit(1),
      ]),

      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.limit(1),
      ]),
    ]);

    return NextResponse.json(
      {
        message: response.documents[0]
          ? "voted successfully"
          : "vote status changed   successfully",
        data: {
          document: response.documents[0],
          result: upVote.total - downVote.total,
        },
      },
      {
        status: 201,
      }
    );
  }

  const [upVote, downVote] = await Promise.all([
    databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("voteStatus", "upvoted"),
      Query.limit(1),
    ]),

    databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("voteStatus", "downvoted"),
      Query.limit(1),
    ]),
  ]);

  return NextResponse.json(
    {
      message: "voted withdrawn successfully",
      data: {
        document: null,
        result: upVote.total - downVote.total,
      },
    },
    {
      status: 201,
    }
  );
}
