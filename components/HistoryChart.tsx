'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const CustomToolTip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (!active) return null

  const analysis = payload[0].payload

  return (
    <div className="custom-tooltip relative rounded-lg border border-black/10 bg-white/5 p-8 shadow-md backdrop-blur-md">
      <div
        className="absolute left-2 top-2 h-2 w-2 rounded-full"
        style={{ background: analysis.color }}
      />
      <p className="label text-sm text-black/30">{dateLabel}</p>
      <p className="intro text-xl uppercase">{analysis.mood}</p>
    </div>
  )
}

export function HistoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}
