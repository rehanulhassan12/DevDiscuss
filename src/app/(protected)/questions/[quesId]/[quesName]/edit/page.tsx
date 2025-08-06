import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/client/config";
import React from "react";
import EditQuestion from "./EditQuestion";

// Define the prop type explicitly
type Props = {
  params: {
    quesId: string;
    quesName: string;
  };
};

export default async function Page({ params }: Props) {
  const question = await databases.getDocument(db, questionCollection, params.quesId);
  return <EditQuestion question={question} />;
}
