"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { materia: "Português", dominio: 64 },
  { materia: "Penal", dominio: 82 },
  { materia: "Proc. Penal", dominio: 71 },
  { materia: "Informática", dominio: 45 },
  { materia: "Constitucional", dominio: 76 },
  { materia: "Humanos", dominio: 69 }
];

export function RadarMasteryChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="materia" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Tooltip />
          <Radar dataKey="dominio" fill="#1d4ed8" fillOpacity={0.25} stroke="#1d4ed8" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
