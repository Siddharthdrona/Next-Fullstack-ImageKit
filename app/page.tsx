import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <span className="inline-block rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
          🚀 Full Stack Project
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
          ImageKit & Next.js
          <br />
          Fullstack Application
        </h1>

        <p className="mt-6 text-lg text-zinc-400 leading-8">
          Build, upload, optimize, and manage images seamlessly with
          <span className="font-semibold text-white"> ImageKit</span>,
          <span className="font-semibold text-white"> Next.js</span>,
          authentication, and a modern full-stack architecture.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Get Started
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-900"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}