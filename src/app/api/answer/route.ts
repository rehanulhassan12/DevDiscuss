import { NextRequest, NextResponse } from "next/server";
import { databases, users } from "@/models/server/config";
import { db, answerCollection } from "@/models/name";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";

export async function POST(req: NextRequest) {
  try {
    const { questionId, answer, authorId } = await req.json();

    if (
      !questionId ||
      !answer ||
      !authorId ||
      !questionId.trim() ||
      !answer.trim() ||
      !authorId.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        questionId: questionId,
        authorId: authorId,
      }
    );

    const prefs = await users.getPrefs<UserPrefs>(authorId);

    console.log("user preference document is ", prefs);

    // increase user reputaion

    const updatedpref = await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });

    console.log("updated user preference document is ", updatedpref);

    return NextResponse.json({
      status: 201,
      message: "Answer created successfully",
      data: response,
    });
  } catch (error: any) {
    console.log("error in creating answer", error);
    return NextResponse.json(
      { error: error?.message || "error creating answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { answerId } = await req.json();

  if (!answerId || !answerId.trim()) {
    return NextResponse.json(
      { error: "Please fill all the fields" },
      { status: 400 }
    );
  }

  try {
    const answer = await databases.getDocument(db, answerCollection, answerId);

    if (!answer) {
      return NextResponse.json({ error: "Answer not found" }, { status: 400 });
    }

    console.log("answer found  ", answer);

    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    console.log("deleted answer response is ", response);

    /// decrease user reputation

    const prefs = await users.getPrefs<UserPrefs>(answer.authorId);

    console.log("user preference document is ", prefs);

    const updatedpref = await users.updatePrefs(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    console.log("updated user preference document is ", updatedpref);

    return NextResponse.json({
      status: 200,
      message: "Answer deleted successfully",
      data: response,
    });
  } catch (error: any) {
    console.log("error in deleting answer", error);
    return NextResponse.json(
      { error: error?.message || "error deleting answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}
