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
        We spilled something. Give it another try &mdash; or stop by the
        shop and we&apos;ll make it right.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={reset}
          className="px-6 py-2 border border-amber/40 text-amber text-xs uppercase tracking-widest-plus rounded-sm hover:border-amber transition-colors"
        >
          Try Again
        </button>
        <a
          href="tel:+12064578690"
          className="px-6 py-2 text-ivory/40 text-xs uppercase tracking-widest-plus hover:text-amber transition-colors"
        >
          Call the Shop
        </a>
      </div>
    </div>
  );
}
