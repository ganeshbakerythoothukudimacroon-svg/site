import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="label-tracked text-[color:var(--gold-400)]">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-[color:var(--text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="glow-gold-hover rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          Go Home
        </Link>
        <Link href="/shop" className="glass-button rounded-full px-5 py-2.5 text-sm font-semibold text-[color:var(--text-primary)]">
          Shop Products
        </Link>
      </div>
    </div>
  );
}
