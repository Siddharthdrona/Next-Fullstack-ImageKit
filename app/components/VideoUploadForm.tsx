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
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Upload New Video
          </h1>

          <p className="mt-3 text-slate-500">
            Share your content by uploading a video and thumbnail
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Video Title
            </label>

            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
              w-full rounded-xl border border-slate-300 
              bg-slate-50 px-4 py-3 text-slate-900
              outline-none transition
              focus:border-violet-500 
              focus:bg-white
              focus:ring-4 focus:ring-violet-100
            "
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Describe your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
              w-full resize-none rounded-xl border border-slate-300
              bg-slate-50 px-4 py-3 text-slate-900
              outline-none transition
              focus:border-violet-500
              focus:bg-white
              focus:ring-4 focus:ring-violet-100
            "
              required
            />
          </div>

          {/* Upload Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Video */}
            <div
              className="
            rounded-2xl border border-dashed 
            border-violet-300 bg-violet-50/40 p-5
          "
            >
              <label className="mb-3 block text-sm font-bold text-slate-700">
                Upload Video
              </label>

              <TypedFileUpload
                fileType="video"
                onSuccess={handleVideoUpload}
                onProgress={setVideoProgress}
              />

              {videoProgress > 0 && (
                <div className="mt-5">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-violet-600 transition-all"
                      style={{
                        width: `${videoProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {videoProgress}% uploaded
                  </p>
                </div>
              )}

              {videoUrl && (
                <p className="mt-4 text-sm font-semibold text-green-600">
                  ✓ Video uploaded successfully
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div
              className="
            rounded-2xl border border-dashed 
            border-violet-300 bg-violet-50/40 p-5
          "
            >
              <label className="mb-3 block text-sm font-bold text-slate-700">
                Upload Thumbnail
              </label>

              <TypedFileUpload
                fileType="image"
                onSuccess={handleThumbnailUpload}
                onProgress={setThumbnailProgress}
              />

              {thumbnailProgress > 0 && (
                <div className="mt-5">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-violet-600 transition-all"
                      style={{
                        width: `${thumbnailProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {thumbnailProgress}% uploaded
                  </p>
                </div>
              )}

              {thumbnailUrl && (
                <p className="mt-4 text-sm font-semibold text-green-600">
                  ✓ Thumbnail uploaded successfully
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading ||
              !title.trim() ||
              !description.trim() ||
              !videoUrl ||
              !thumbnailUrl
            }
            className="
            w-full rounded-xl 
            bg-linear-to-r from-violet-600 to-indigo-600
            py-3.5 text-lg font-bold text-white
            shadow-lg shadow-violet-200
            transition-all duration-300
            hover:scale-[1.01]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:bg-slate-400
            disabled:shadow-none
          "
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
}
