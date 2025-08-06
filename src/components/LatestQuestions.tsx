

import React from 'react'
import { answerCollection, questionCollection, db, voteCollection } from '@/models/name'
import { databases, users } from '@/models/server/config'
import { UserPrefs } from '@/store/Auth'
import QuestionCard from './ui/QuestionCard'
import { Query } from 'node-appwrite'
async function LatestQuestions() {

  const latestQuestions = await databases.listDocuments(
    db,
    questionCollection,
    [Query.orderDesc("$createdAt")]
  );

  console.log("latest questions", latestQuestions);


  latestQuestions.documents = await Promise.all(
    latestQuestions.documents.map(async (question) => {
      const [author, answers, votes] = await Promise.all([
        users.get<UserPrefs>(question.authorId),
        databases.listDocuments(
          db,
          answerCollection,
          [
            Query.equal("questionId", question.$id),

            Query.limit(1),
          ]
        ),
        databases.listDocuments(
          db,
          voteCollection,
          [
            Query.equal("type", "question"),
            Query.equal("typeId", question.$id),
            Query.limit(1),
          ]
        ),
      ])
      return {
        ...question,
        totalAnswers: answers.total,
        totalVotes: votes.total,
        author: {
          $id: author.$id,
          reputation: author.prefs?.reputation,
          name: author.name
        }
      }
    })
  )


  console.log("latest questions", latestQuestions);


  return (
    <div className="space-y-6 m-10">
      {
        latestQuestions.documents.map((question) => (
          <QuestionCard key={question.$id} question={question} />
        ))
      }
    </div>
  )
}

export default LatestQuestions
