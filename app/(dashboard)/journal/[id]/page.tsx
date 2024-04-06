import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/util/auth'
import { prisma } from '@/util/db'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function EntryPage({ params }) {
  const entry = await getEntry(params.id)

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}
