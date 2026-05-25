import type { ReactNode } from "react";

type Props = { title: string; value: string; description: string; icon: ReactNode };

export function StudentStatCard({ title, value, description, icon }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">{title}</span>
        <span className="rounded-xl bg-blue-50 p-2 text-blue-700">{icon}</span>
      </div>
      <strong className="text-3xl font-black">{value}</strong>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </article>
  );
}
