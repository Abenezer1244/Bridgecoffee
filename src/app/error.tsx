"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-serif text-4xl md:text-6xl text-ivory tracking-tight">
        Something went wrong.
      </h1>
      <p className="mt-4 text-sm text-ivory/40">
        We spilled something. Let&apos;s try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 px-6 py-2 border border-amber/40 text-amber text-xs uppercase tracking-widest-plus rounded-sm hover:border-amber transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
