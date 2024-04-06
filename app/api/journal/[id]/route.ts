import { analyze } from '@/util/ai'
import { getUserByClerkId } from '@/util/auth'
import { prisma } from '@/util/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()

  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updatedEntry.content)
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: analysis,
    create: {
      entryId: updatedEntry.id,
      // userId: user.id,
      ...analysis,
    },
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
