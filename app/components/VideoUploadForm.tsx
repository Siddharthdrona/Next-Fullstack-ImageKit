"use client";

import { useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

interface UploadResponse {
  url?: string;
  filePath?: string;
}

type FileUploadProps = {
  fileType: "video" | "image";
  onSuccess: (res: UploadResponse) => void;
  onProgress?: (progress: number) => void;
};

const TypedFileUpload = FileUpload as ComponentType<FileUploadProps>;

export default function VideoUploadForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (uploadRes: UploadResponse) => {
    setVideoUrl(uploadRes.filePath || uploadRes.url || "");
  };

  const handleThumbnailUpload = (uploadRes: UploadResponse) => {
    setThumbnailUrl(uploadRes.filePath || uploadRes.url || "");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!videoUrl) {
      alert("Please upload a video.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to upload video");
      }

      alert("Video uploaded successfully!");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to upload video.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Upload a video
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a title, description, video file, and thumbnail.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="space-y-6 p-6 sm:p-8">
            {/* Title */}
            <div>
              <label
                htmlFor="video-title"
                className="mb-1.5 block text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                id="video-title"
                type="text"
                placeholder="e.g. How to build a Next.js app"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
              <p className="mt-1 text-right text-xs text-gray-400">
                {title.length}/100
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="video-description"
                className="mb-1.5 block text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="video-description"
                rows={4}
                placeholder="What's this video about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
                className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
              <p className="mt-1 text-right text-xs text-gray-400">
                {description.length}/1000
              </p>
            </div>

            {/* Uploads */}
            <div className="space-y-5">
              {/* Video upload */}
              <div>
                <span className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M23 7l-7 5 7 5V7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Video file
                </span>

                <div
                  className={`rounded-xl border-2 border-dashed p-4 transition ${
                    videoUrl
                      ? "border-green-300 bg-green-50/50"
                      : "border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
                  }`}
                >
                  <TypedFileUpload
                    fileType="video"
                    onSuccess={handleVideoUpload}
                    onProgress={setVideoProgress}
                  />

                  {videoProgress > 0 && videoProgress < 100 && !videoUrl && (
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500">
                        Uploading… {videoProgress}%
                      </p>
                    </div>
                  )}

                  {videoUrl && (
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-700">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="shrink-0"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Video uploaded
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail upload */}
              <div>
                <span className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fuchsia-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path
                      d="M21 15l-5-5L5 21"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Thumbnail
                </span>

                <div
                  className={`rounded-xl border-2 border-dashed p-4 transition ${
                    thumbnailUrl
                      ? "border-green-300 bg-green-50/50"
                      : "border-gray-300 bg-gray-50 hover:border-fuchsia-300 hover:bg-fuchsia-50/40"
                  }`}
                >
                  <TypedFileUpload
                    fileType="image"
                    onSuccess={handleThumbnailUpload}
                    onProgress={setThumbnailProgress}
                  />

                  {thumbnailProgress > 0 &&
                    thumbnailProgress < 100 &&
                    !thumbnailUrl && (
                      <div className="mt-3">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-fuchsia-600 transition-all duration-300"
                            style={{ width: `${thumbnailProgress}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-gray-500">
                          Uploading… {thumbnailProgress}%
                        </p>
                      </div>
                    )}

                  {thumbnailUrl && (
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-700">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="shrink-0"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Thumbnail uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer / submit */}
          <div className="flex items-center justify-end gap-3 rounded-b-2xl border-t border-gray-100 bg-gray-50/60 px-6 py-4 sm:px-8">
            <button
              type="submit"
              disabled={
                loading ||
                !title.trim() ||
                !description.trim() ||
                !videoUrl ||
                !thumbnailUrl
              }
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading && (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? "Uploading…" : "Upload video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
