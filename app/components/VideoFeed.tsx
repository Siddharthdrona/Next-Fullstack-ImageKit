"use client";

import { VideoOff } from "lucide-react";
import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
  loading?: boolean;
}

export default function VideoFeed({ videos, loading = false }: VideoFeedProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-2xl border bg-white shadow"
          >
            <div className="aspect-9/16 bg-slate-200" />

            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <VideoOff size={70} className="mb-4 text-slate-400" />

        <h2 className="text-2xl font-bold text-slate-700">No Videos Found</h2>

        <p className="mt-2 max-w-md text-slate-500">
          There are no uploaded videos yet. Be the first to upload one!
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoComponent
          key={video._id?.toString() ?? video.videoUrl}
          video={video}
        />
      ))}
    </section>
  );
}
