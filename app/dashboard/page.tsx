"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { UploadCloud, Video, HardDrive, LogOut } from "lucide-react";

import Header from "../components/Header";
import VideoFeed from "../components/VideoFeed";
import { IVideo } from "@/models/Video";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");

        if (!res.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* Top Section */}

        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Welcome</h1>

              <p className="mt-2 text-slate-500">{session?.user?.email}</p>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div> */}

          {/* Statistics */}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Videos</p>

                  <h2 className="mt-2 text-4xl font-bold">{videos.length}</h2>
                </div>

                <Video className="text-violet-600" size={40} />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Storage</p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {videos.length * 100} MB
                  </h2>
                </div>

                <HardDrive className="text-green-600" size={40} />
              </div>
            </div>
          </div>

          {/* Upload */}

          <div className="mt-10 rounded-2xl bg-white p-10 shadow">
            <div className="text-center">
              <UploadCloud size={60} className="mx-auto text-violet-600" />

              <h2 className="mt-5 text-3xl font-bold">Upload New Video</h2>

              <p className="mt-3 text-gray-500">
                Upload MP4, MOV and other supported formats.
              </p>

              <Link
                href="/upload"
                className="mt-8 inline-block rounded-xl bg-violet-600 px-8 py-3 text-white hover:bg-violet-700"
              >
                Upload Video
              </Link>
            </div>
          </div>

          {/* Recent Uploads */}

          <div className="mt-12 rounded-2xl bg-white p-8 shadow">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Recent Uploads</h2>

              <Link href="/" className="text-violet-600 hover:underline">
                View All
              </Link>
            </div>

            {loading ? (
              <div className="py-20 text-center">Loading videos...</div>
            ) : (
              <VideoFeed videos={videos} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
