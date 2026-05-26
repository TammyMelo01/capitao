"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProfileSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("profile") === "camila" ? "camila" : "tammy";

  function changeProfile(profile: "tammy" | "camila") {
    localStorage.setItem("capitao:activeProfile", profile);
    router.push((`${pathname}?profile=${profile}`) as any);
  }

  return (
    <div className="flex w-fit gap-2 rounded-2xl bg-slate-100 p-1">
      <button
        onClick={() => changeProfile("tammy")}
        className={`rounded-xl px-4 py-2 text-sm font-bold ${
          active === "tammy"
            ? "bg-white text-blue-700 shadow-sm"
            : "text-slate-600"
        }`}
      >
        Tammy
      </button>

      <button
        onClick={() => changeProfile("camila")}
        className={`rounded-xl px-4 py-2 text-sm font-bold ${
          active === "camila"
            ? "bg-white text-blue-700 shadow-sm"
            : "text-slate-600"
        }`}
      >
        Camila
      </button>
    </div>
  );
}
