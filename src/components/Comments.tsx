"use client"
import React from 'react'
import { Models, ID } from 'appwrite'
import { useAuthStore } from '@/store/Auth'
import { databases } from '@/models/client/config'
import { commentCollection, db } from '@/models/name'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import convertDateToRelativeTime from '@/utils/reletiveTime'
import slugify from 'slugify'
import { IconTrash } from '@tabler/icons-react'
function Comments({
  comments,
  type,
  typeId,
  className
}: {
  comments: Models.DocumentList<Models.Document>,
  type: "question" | "answer",
  typeId: string,
  className?: string

}) {

  const [comment, setComment] = React.useState(comments)
  const [newComment, setNewComment] = React.useState("")
  const { user } = useAuthStore()

  async function addComment(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    if (!newComment) return

    try {

      const response = await databases.createDocument(db, commentCollection, ID.unique(), {
        content: newComment,
        authorId: user?.$id,
        typeId: typeId,
        type: type
      })

      setNewComment(() => "")
      setComment((prev) => ({
        total: prev.total + 1,
        documents: [{ ...response, author: user }, ...prev.documents]
      }))


    } catch (error: any) {
      console.log("error in adding comment", error);
      window.alert(error?.message || "error in adding comment");
    }
  }

  async function deleteComment(commentId: string) {

    if (!user || !comments || commentId === undefined) return

    try {
      await databases.deleteDocument(db, commentCollection, commentId);
      setComment((prev) => ({
        total: prev.total - 1,
        documents: prev.documents.filter((comment) => comment.$id !== commentId),
      }));

    } catch (error: any) {
      console.log("error in deleting comment", error);
      window.alert(error?.message || "error in deleting comment");

    }



  }





  return (
    <div className={cn("flex flex-col gap-2 pl-4", className)}>

      {
        comments.documents.map((comment) => (
          <React.Fragment key={comment.$id}>

            <hr className="border-white/40" />

            <div className="flex gap-2">
              <p className="text-sm">
                {comment.content} -{" "}
                <Link href={`/users/${comment.authorId}/${slugify(comment.author.name)}`} className="text-orange-500 hover:text-orange-600">
                  {comment.author.name}
                </Link>
                <span className='opacity-60'>
                  {convertDateToRelativeTime(new Date(comment.$createdAt))}
                </span>
              </p>
              {
                user && user.$id === comment.authorId && (
                  <button onClick={() => deleteComment(comment.$id)} className="shrink-0 text-red-500 hover:text-red-600">
                    <IconTrash />
                  </button>
                )
              }

            </div>



          </React.Fragment>
        ))
      }
      <hr className="border-white/40" />

      <form onSubmit={addComment} className='flex items-center gap-2'>
        <textarea

          className="w-full rounded-md border border-white/20 bg-white/10 p-2 outline-none"
          rows={1}
          placeholder='Add a comment'
          value={newComment}
          onChange={(e) => setNewComment(() => e.target.value)}
        />
        <button className="shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600" >
          Add Comment
        </button>
      </form>

    </div>
  )
}

export default Comments
