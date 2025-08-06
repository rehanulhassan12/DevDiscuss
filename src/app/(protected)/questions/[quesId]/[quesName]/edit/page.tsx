import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/client/config";
import React from 'react'
import EditQuestion from "./EditQuestion";
async function page({ params }: { params: { quesId: string, quesName: string } }) {
  const question = await databases.getDocument(db, questionCollection, params.quesId);


  return <EditQuestion question={question} />;

}

export default page
