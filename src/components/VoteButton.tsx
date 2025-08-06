"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { databases } from '@/models/client/config'
import { db, voteCollection } from '@/models/name'
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react'
import { ID, Models, Query } from 'appwrite'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/Auth'

function VoteButton({ type, id, upVote, downVote, className }:
  {
    className?: string, type: "question" | "answer", id: string,
    upVote: Models.DocumentList<Models.Document>,
    downVote: Models.DocumentList<Models.Document>
  }) {


  const [votedDocument, setVotedDocument] = React.useState<Models.Document | null>()
  const [voteResult, setVoteResult] = React.useState<number>(upVote.total - downVote.total)

  const { user } = useAuthStore()
  const router = useRouter()

  React.useEffect(() => {
    (async () => {
      try {
        if (user) {
          const response = await databases.listDocuments(
            db,
            voteCollection,
            [
              Query.equal("type", type),
              Query.equal("typeId", id),
              Query.equal("votedBy", user.$id),
            ]
          )
          setVotedDocument(response.documents.length > 0 ? response.documents[0] : null)
        }

      } catch (error: any) {
        console.log("error in getting user data", error);

      }
    })()
  }, [type, id, user])


  const toogleUpVote = async () => {

    if (!user) return router.push("/login")


    if (votedDocument === undefined) return

    try {

      const response = await fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify({
          votedBy: user.$id,
          voteStatus: "upvoted",
          type: type,
          typeId: id
        })
      })


      if (!response.ok) return
      const data = await response.json()
      setVoteResult(() => data.data.result)
      setVotedDocument(data.data.document)

    } catch (error: any) {
      console.log("error in getting user data", error);
      window.alert(error?.message || "error in getting vote data");
    }





  }
  const toggleDownVote = async () => {

    if (!user) return router.push("/login")

    if (votedDocument === undefined) return

    try {

      const response = await fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify({
          votedBy: user.$id,
          voteStatus: "downvoted",
          type: type,
          typeId: id
        })
      })


      if (!response.ok) return
      const data = await response.json()
      setVoteResult(() => data.data.result)
      setVotedDocument(data.data.document)

    } catch (error: any) {
      console.log("error in getting user data", error);
      window.alert(error?.message || "error in getting vote data");
    }

  }
  return (
    <div className={cn("flex shrink-0 flex-col items-center justify-start gap-y-4", className)}>
      <button
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border p-1 duration-200 hover:bg-white/10",
          votedDocument && votedDocument.voteStatus === "upvoted"
            ? "border-orange-500 text-orange-500"
            : "border-white/30"
        )}
        onClick={toogleUpVote}
      >
        <IconCaretUpFilled />
      </button>
      <span>{voteResult}</span>
      <button
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border p-1 duration-200 hover:bg-white/10",
          votedDocument && votedDocument.voteStatus === "downvoted"
            ? "border-orange-500 text-orange-500"
            : "border-white/30"
        )}
        onClick={toggleDownVote}
      >
        <IconCaretDownFilled />
      </button>
    </div>
  );

}




export default VoteButton
