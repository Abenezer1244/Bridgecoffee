import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-serif text-6xl md:text-8xl text-ivory tracking-tight">
        404
      </h1>
      <p className="mt-4 font-serif text-xl text-ivory/60">
        We can&apos;t find this page.
      </p>
      <p className="mt-2 text-sm text-ivory/30">
        You could come by for a latte instead &mdash; we&apos;re at 2150 N 122nd.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-2 border border-amber/40 text-amber text-xs uppercase tracking-widest-plus rounded-sm hover:border-amber transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
