import { GridBackground } from "@/shared/components/molecules";

export function MediaPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GridBackground />
      <main className="relative flex flex-1 flex-col gap-4 p-12">
        <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
      </main>
    </div>
  );
}
