import { Suspense } from "react";
import { StudentShell } from "@/components/student/StudentShell";

export default function AlunoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-6">Carregando...</div>}>
      <StudentShell>{children}</StudentShell>
    </Suspense>
  );
}
