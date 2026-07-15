"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: unknown) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
  maxSizeMB?: number;
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
  maxSizeMB = 100,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file: File) => {
    setError("");

    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return false;
    }

    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB} MB.`);
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!validateFile(file)) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const authResponse = await fetch("/api/auth/imagekit-auth");

      if (!authResponse.ok) {
        throw new Error("Failed to fetch ImageKit authentication.");
      }

      const auth = await authResponse.json();

      const response = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,

        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = Math.round((event.loaded / event.total) * 100);

            onProgress(progress);
          }
        },
      });

      onSuccess(response);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);

      if (err instanceof ImageKitAbortError) {
        setError("Upload cancelled.");
      } else if (err instanceof ImageKitInvalidRequestError) {
        setError("Invalid upload request.");
      } else if (err instanceof ImageKitUploadNetworkError) {
        setError("Network error. Please check your connection.");
      } else if (err instanceof ImageKitServerError) {
        setError("ImageKit server error.");
      } else {
        setError("Upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full rounded-lg border border-slate-300 p-2 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-white hover:file:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
      />

      {uploading && (
        <div className="rounded-lg bg-violet-100 p-3 text-sm text-violet-700">
          Uploading...
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
