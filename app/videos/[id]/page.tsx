import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { ArrowLeft, Calendar, Eye, Heart, Share2, Tag, User } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoPage({ params }: Props) {
  await connectToDatabase();

  const { id } = await params;

  const video = await Video.findById(id).lean();

  if (!video) {
    notFound();
  }

  const uploadedDate = video.createdAt
    ? new Date(video.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Today";

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-x-1 hover:bg-slate-100 hover:shadow-md"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Video */}
            <div className="overflow-hidden rounded-3xl bg-black shadow-2xl">
              <video
                src={`${process.env.NEXT_PUBLIC_URL_ENDPOINT}${video.videoUrl}`}
                controls
                className="aspect-video w-full"
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                {video.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  {video.views ?? 0} views
                </div>

                <div className="flex items-center gap-2">
                  <Heart size={18} />
                  {video.likes ?? 0} likes
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {uploadedDate}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">
                <Heart size={18} />
                Like
              </button>

              <button className="flex items-center gap-2 rounded-full border bg-white px-5 py-3 transition hover:bg-slate-100">
                <Share2 size={18} />
                Share
              </button>

              <button className="rounded-full border bg-white px-5 py-3 transition hover:bg-slate-100">
                Save
              </button>
            </div>

            {/* Description */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Description</h2>

              <p className="leading-8 whitespace-pre-wrap text-slate-700">
                {video.description}
              </p>

              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  Category:
                  <span className="rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-700">
                    {video.category ?? "General"}
                  </span>
                </div>

                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Creator */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
                  <User size={28} className="text-violet-600" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Video Creator</h3>

                  <p className="text-sm text-slate-500">Uploaded by Creator</p>
                </div>
              </div>

              <button className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700">
                Subscribe
              </button>
            </div>

            {/* Statistics */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold">Statistics</h3>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span>Views</span>
                  <span className="font-semibold">{video.views ?? 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Likes</span>
                  <span className="font-semibold">{video.likes ?? 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Visibility</span>
                  <span className="font-semibold">
                    {video.isPublic ? "Public" : "Private"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold">{video.duration ?? 0}s</span>
                </div>
              </div>
            </div>

            {/* Comments Placeholder */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Comments</h3>

              <p className="text-sm text-slate-500">
                Comments feature will be available soon.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
