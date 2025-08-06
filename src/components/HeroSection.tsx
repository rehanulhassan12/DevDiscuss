import React from 'react'
import HeroParallex from './ui/HeroParallex'
import HeroSectionHeader from './HeroHeader'
import { databases } from '@/models/server/config'
import { Query } from 'node-appwrite'
import slugify from 'slugify'
import { storage } from '@/models/client/config'
import { db, questionCollection, questionsAttachmentBucket } from '@/models/name'
async function HeroSection() {

  const questions = await databases.listDocuments
    (db,
      questionCollection,
      [
        Query.limit(15),
        Query.orderDesc("$createdAt"),
      ]);


  return (
    <HeroParallex
      Header={<HeroSectionHeader />}
      products={questions.documents.map((question) => ({
        title: question.title,
        link: `/questions/${slugify(question.title)}`,
        thumbnail: storage.getFileView(questionsAttachmentBucket, question.attachmentId),
      }))}

    />
  )
}

export default HeroSection
