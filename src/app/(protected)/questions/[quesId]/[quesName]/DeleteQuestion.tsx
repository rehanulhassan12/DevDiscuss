"use client"
import { databases } from '@/models/client/config';
import { db, questionCollection } from '@/models/name';
import { useAuthStore } from '@/store/Auth';
import { IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'
import React from 'react'

function DeleteQuestion({
  questionId,
  authorId
}: {
  questionId: string,
  authorId: string
}) {

  const router = useRouter();
  const { user } = useAuthStore()

  const deleteQuestion = async () => {

    try {
      await databases.deleteDocument(db, questionCollection, questionId);
      router.push("/questions");
    } catch (error: any) {
      console.log("error in deleting question", error);
      window.alert(error?.message || "error in deleting question");


    }


  }

  return (
    user?.$id === authorId && <button
      className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 p-1 text-red-500 duration-200 hover:bg-red-500/10"
      onClick={deleteQuestion}><IconTrash /></button>
  )
}



export default DeleteQuestion