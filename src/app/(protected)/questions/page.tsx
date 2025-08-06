import React from "react";
import { Query } from "node-appwrite";
import { db, questionCollection, answerCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import QuestionCard from "../../../components/ui/QuestionCard";
import Search from "../../../components/Search";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Pagination from "@/components/Pagination";



export default async function Page({ searchParams }: { searchParams: { page?: string, search?: string, tag?: string } }) {
  searchParams.page ||= "1";

  const queries = [
    Query.limit(20),
    Query.offset((parseInt(searchParams.page) - 1) * 20),
    Query.orderDesc("$createdAt"),
  ]

  if (searchParams.tag) queries.push(Query.equal("tags", searchParams.tag));

  if (searchParams.search) {
    queries.push(
      Query.or(
        [
          Query.search("title", searchParams.search),
          Query.search("content", searchParams.search),
        ]
      )
    )
  }

  const questions = await databases.listDocuments(db, questionCollection, queries);

  questions.documents = await Promise.all(
    questions.documents.map(async (question) => {
      const [author, answers, votes] = await Promise.all([
        users.get<UserPrefs>(question.authorId),
        databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", question.$id),
          Query.limit(1),
        ]),
        databases.listDocuments(db, "votes", [
          Query.equal("type", "question"),
          Query.equal("typeId", question.$id),
          Query.limit(1),
        ]),
      ]);

      return {
        ...question,
        totalAnswers: answers.total,
        totalVotes: votes.total,
        author: {
          $id: author.$id,
          reputation: author.prefs.reputation,
          name: author.name,
        }


      };

    })
  )


  return (
    <div className="container mx-auto px-4 pb-20 pt-36" >
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Questions</h1>
        <Link href='/questions/ask'>

          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Ask a question
            </span>
          </ShimmerButton>

        </Link>
      </div>

      <div className="mb-4">
        <Search />
      </div>
      <div className="mb-4">
        <p>{questions.total} questions</p>
      </div>

      <div className="mb-4 max-w-3xl space-y-6">

        {questions.documents.map((question) => (
          <QuestionCard key={question.$id} question={question} />
        ))}

      </div>

      <Pagination total={questions.total} limit={20} />


    </div>
  )


} 