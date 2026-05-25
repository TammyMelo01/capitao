"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { semana: "S1", score: 42, acertos: 55 },
  { semana: "S2", score: 50, acertos: 61 },
  { semana: "S3", score: 59, acertos: 68 },
  { semana: "S4", score: 67, acertos: 73 },
  { semana: "S5", score: 74, acertos: 81 }
];

export function ApprovalLineChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="semana" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" strokeWidth={3} />
          <Line type="monotone" dataKey="acertos" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
