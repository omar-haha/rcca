import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[color:var(--bg)] z-[9999]">
      <Spinner size={32} className="text-[color:var(--text-muted)] opacity-50" />
    </div>
  );
}
