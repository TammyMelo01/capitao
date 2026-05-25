import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
};

export function ProgressCard({ title, value, description, icon }: Props) {
  return (
    <article className="card">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <span className="rounded-xl bg-blue-50 p-2 text-police">{icon}</span>
      </div>
      <strong className="text-2xl font-black">{value}</strong>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </article>
  );
}
