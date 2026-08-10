import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <p
        className="text-[11px] font-semibold tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        404
      </p>
      <h1 className="text-[36px] md:text-[48px] font-semibold tracking-tight text-primary text-center">
        Page not found.
      </h1>
      <p className="text-[16px] text-secondary text-center max-w-[360px]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full px-6 py-3 text-[14px] font-medium text-white no-underline"
        style={{ backgroundColor: "var(--accent)" }}
      >
        Back to Store
      </Link>
    </div>
  );
}
