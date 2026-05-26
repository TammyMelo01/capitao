"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  FileText,
  Home,
  ListChecks,
  ShieldCheck,
  Users
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/aluno", label: "Painel", icon: Home },
  { href: "/aluno/perfis", label: "Perfis", icon: Users },
  { href: "/aluno/estudar", label: "Estudar", icon: BookOpen },
  { href: "/aluno/cronograma", label: "Cronograma", icon: CalendarDays },
  { href: "/aluno/questoes", label: "Questões", icon: ListChecks },
  { href: "/aluno/biblioteca", label: "Biblioteca", icon: FileText },
  { href: "/", label: "Dashboard geral", icon: BarChart3 }
];

export function StudentShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const activeProfile = searchParams.get("profile") === "camila" ? "camila" : "tammy";

  function withProfile(href: string) {
    if (href === "/") return href;
    if (href === "/aluno/perfis") return href;

    return `${href}?profile=${activeProfile}`;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <Link href={`/aluno?profile=${activeProfile}`} className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-blue-700 p-3 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <strong className="block text-lg">Capitão</strong>
            <span className="text-sm text-slate-500">Área do aluno</span>
          </div>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={withProfile(item.href)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link href={`/aluno?profile=${activeProfile}`} className="font-black">
            Capitão
          </Link>

          <span className="text-sm text-slate-500">Área do aluno</span>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={withProfile(item.href)}
              className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="lg:pl-72">
        <div className="mx-auto max-w-7xl p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}


