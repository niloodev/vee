import Link from "next/link";

import { shellNav } from "@/modules/shell/shell.constants";

export function ShellPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-12">
      <h1 className="text-3xl font-semibold tracking-tight">vee</h1>
      <nav className="flex gap-4">
        {shellNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-black/10 px-6 py-3 text-lg font-medium transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
