import { HistoryChart } from '@/components/HistoryChart'
import { getUserByClerkId } from '@/util/auth'
import { prisma } from '@/util/db'

const getData = async () => {
  const user = await getUserByClerkId()
  const analysis = await prisma.analysis.findMany({
    where: {
      entry: {
        userId: user.id,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  const sum = analysis.reduce(
    (acc, { sentimentScore }) => acc + sentimentScore,
    0
  )
  const avg = Math.round(sum / analysis.length)
  return { analysis, avg }
}

export default async function HistoryPage() {
  const { avg, analysis } = await getData()
  console.log(analysis)

  return (
    <div className="h-full">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="h-full">
        <HistoryChart data={analysis} />
      </div>
    </div>
  )
}
