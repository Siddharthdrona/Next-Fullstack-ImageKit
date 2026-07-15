import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "../lib/auth";
import { connectToDatabase } from "../lib/db";
import Video from "../models/Video";

import Header from "./components/Header";
import VideoFeed from "./components/VideoFeed";

export default async function Home() {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

  return (
    <>
      <Header showThemeToggle />

      <main className="min-h-screen bg-background transition-colors duration-300">
        {/* Hero */}
        <section className="bg-linear-to-br from-violet-700 via-violet-600 to-indigo-700 py-20 text-white transition-colors duration-300 dark:from-slate-950 dark:via-violet-950 dark:to-slate-900">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-5xl font-bold tracking-tight">
              AI Powered Video Platform
            </h1>

            <p className="mt-6 text-lg text-violet-100 dark:text-slate-300">
              Upload, manage and stream videos securely with Next.js, ImageKit
              and MongoDB.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              {session ? (
                <Link
                  href="/upload"
                  className="rounded-xl bg-surface px-6 py-3 font-semibold text-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Upload Video
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl bg-surface px-6 py-3 font-semibold text-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Videos */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Latest Videos
          </h2>

          <VideoFeed videos={JSON.parse(JSON.stringify(videos))} />
        </section>
      </main>
    </>
  );
}
