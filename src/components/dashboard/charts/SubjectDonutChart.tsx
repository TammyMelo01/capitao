"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Penal", value: 82 },
  { name: "Português", value: 64 },
  { name: "Informática", value: 45 },
  { name: "Constitucional", value: 76 },
  { name: "Processo Penal", value: 71 }
];

const colors = ["#1d4ed8", "#16a34a", "#f59e0b", "#7c3aed", "#dc2626"];

export function SubjectDonutChart() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col justify-center gap-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              {item.name}
            </span>
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
