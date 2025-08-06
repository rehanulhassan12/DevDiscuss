import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/client/config";
import React from "react";
import EditQuestion from "./EditQuestion";

// Define the prop type explicitly
type PageProps = {
  params: Promise<{ quesId: string; quesName: string }>;
};

export default async function Page({ params }: PageProps) {
  const { quesId } = await params;
  const question = await databases.getDocument(db, questionCollection, quesId);
  return <EditQuestion question={question} />;
}

