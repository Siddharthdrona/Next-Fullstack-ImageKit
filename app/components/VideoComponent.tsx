"use client";

import { Video } from "@imagekit/next";
import Link from "next/link";
import { Calendar, Eye, PlayCircle } from "lucide-react";
import { IVideo } from "@/models/Video";

interface Props {
  video: IVideo;
}

export default function VideoComponent({ video }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Video */}
      <Link href={`/videos/${video._id}`}>
        <div
          className="relative overflow-hidden bg-black"
          style={{ aspectRatio: "9 / 16" }}
        >
          {video.videoUrl ? (
            <>
              {/* <Video
                path={video.videoUrl}
                transformation={[
                  {
                    width: "720",
                    height: "1280",
                  },
                ]}
                controls={video.controls}
                className="h-full w-full object-cover"
              /> */}
              <Video
                src={video.videoUrl}
                transformation={[
                  {
                    width: "720",
                    height: "1280",
                  },
                ]}
                controls={video.controls}
                className="h-full w-full object-cover"
              />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition group-hover:opacity-100">
                <PlayCircle size={70} className="text-white drop-shadow-lg" />
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-200 text-slate-500">
              Video unavailable
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="space-y-3 p-4">
        <Link href={`/videos/${video._id}`}>
          <h2 className="line-clamp-2 text-lg font-bold text-slate-900 transition group-hover:text-violet-600">
            {video.title}
          </h2>
        </Link>

        <p className="line-clamp-2 text-sm text-slate-600">
          {video.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {video.createdAt
              ? new Date(video.createdAt).toLocaleDateString("en-GB")
              : "Today"}
          </div>

          <div className="flex items-center gap-1">
            <Eye size={14} />
            {video.views ?? 0} views
          </div>
        </div>
      </div>
    </div>
  );
}
