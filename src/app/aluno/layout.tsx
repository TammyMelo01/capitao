import { StudentShell } from "@/components/student/StudentShell";

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>;
}
