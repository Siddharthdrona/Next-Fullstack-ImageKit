import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        404 error
      </p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-base text-gray-500">
        The page you&aposre looking for doesn&apost exist or may have been moved.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Go home
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
