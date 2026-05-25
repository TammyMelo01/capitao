"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { dia: "Seg", acertos: 64, aulas: 40 },
  { dia: "Ter", acertos: 68, aulas: 52 },
  { dia: "Qua", acertos: 72, aulas: 63 },
  { dia: "Qui", acertos: 78, aulas: 70 },
  { dia: "Sex", acertos: 81, aulas: 76 }
];

export function StudyProgressPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4"><p className="text-sm font-semibold text-blue-700">Evolução</p><h2 className="text-xl font-black">Acertos e aulas</h2></div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="dia" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="acertos" stroke="#1d4ed8" strokeWidth={3} />
            <Line type="monotone" dataKey="aulas" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
