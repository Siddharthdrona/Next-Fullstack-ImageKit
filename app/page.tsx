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
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-linear-to-r from-violet-700 to-indigo-700 py-20 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-5xl font-bold">AI Powered Video Platform</h1>

            <p className="mt-6 text-lg text-violet-100">
              Upload, manage and stream videos securely with Next.js, ImageKit
              and MongoDB.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              {session ? (
                <Link
                  href="/upload"
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-violet-700"
                >
                  Upload Video
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-violet-700"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-lg border border-white px-6 py-3"
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
          <h2 className="mb-8 text-3xl font-bold">Latest Videos</h2>

          <VideoFeed videos={JSON.parse(JSON.stringify(videos))} />
        </section>
      </main>
    </>
  );
}
