"use client";

import { upload } from "@imagekit/next";
import { useRef, useState } from "react";

interface ImageKitAuth {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}

interface UploadResponse {
  url?: string;
  filePath?: string;
}

interface FileUploadProps {
  fileType: "video" | "image";
  onSuccess: (res: UploadResponse) => void;
  onProgress?: (progress: number) => void;
}

export default function FileUpload({
  fileType,
  onSuccess,
  onProgress,
}: FileUploadProps) {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = fileType === "video" ? "video/*" : "image/*";

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setFileName(file.name);
    setProgress(0);
    onProgress?.(0);

    try {
      setUploading(true);

      // Fetch ImageKit authentication parameters
      const authResponse = await fetch("/api/auth/imagekit-auth");

      if (!authResponse.ok) {
        throw new Error("Failed to get ImageKit authentication");
      }

      const auth: ImageKitAuth = await authResponse.json();

      // Upload file to ImageKit
      const response = await upload({
        file,
        fileName: file.name,
        publicKey: auth.publicKey,
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percentage = Math.round((event.loaded / event.total) * 100);
            setProgress(percentage);
            onProgress?.(percentage);
          }
        },
      });

      onProgress?.(100);
      onSuccess({
        url: response.url ?? undefined,
        filePath: response.filePath ?? undefined,
      });
    } catch (err) {
      console.error("Upload Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload file. Try again.",
      );
      setFileName(null);
      onProgress?.(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full cursor-pointer text-sm text-gray-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white file:px-3.5 file:py-2 file:text-sm file:font-semibold file:text-gray-700 file:shadow-sm file:ring-1 file:ring-gray-300 hover:file:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {fileName && !error && (
        <p className="mt-2 truncate text-xs text-gray-500">{fileName}</p>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
