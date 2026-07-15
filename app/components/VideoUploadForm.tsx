"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

interface UploadResponse {
  url: string;
  filePath: string;
}

export default function VideoUploadForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (res: unknown) => {
    const uploadRes = res as UploadResponse;
    setVideoUrl(uploadRes.filePath || uploadRes.url);
  };

  const handleThumbnailUpload = (res: unknown) => {
    const uploadRes = res as UploadResponse;
    setThumbnailUrl(uploadRes.filePath || uploadRes.url);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    if (!videoUrl) {
      alert("Please upload a video.");
      return;
    }

    if (!thumbnailUrl) {
      alert("Please upload a thumbnail.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
          controls: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert("Video uploaded successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setProgress(0);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to upload video.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Upload New Video
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">Title</label>

          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            required
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Upload Video
          </label>

          <FileUpload
            fileType="video"
            onSuccess={handleVideoUpload}
            onProgress={setProgress}
          />

          {progress > 0 && (
            <div className="mt-4">
              <progress
                className="progress progress-primary w-full"
                value={progress}
                max={100}
              />

              <p className="mt-2 text-sm text-slate-600">
                {progress}% Uploaded
              </p>
            </div>
          )}

          {videoUrl && (
            <p className="mt-3 text-sm font-medium text-green-600">
              ✅ Video uploaded successfully
            </p>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Upload Thumbnail
          </label>

          <FileUpload fileType="image" onSuccess={handleThumbnailUpload} />

          {thumbnailUrl && (
            <p className="mt-3 text-sm font-medium text-green-600">
              ✅ Thumbnail uploaded successfully
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            loading ||
            !title.trim() ||
            !description.trim() ||
            !videoUrl ||
            !thumbnailUrl
          }
          className="w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}
