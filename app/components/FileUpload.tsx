"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

interface ImageKitAuth {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}

export default function FileUpload() {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      // Fetch ImageKit authentication parameters
      const authResponse = await fetch("/api/auth/imagekit-auth");

      if (!authResponse.ok) {
        throw new Error("Failed to get ImageKit authentication");
      }

      const auth: ImageKitAuth = await authResponse.json();

      console.log("ImageKit Auth:", auth);

      // Upload file to ImageKit
      const response = await upload({
        file,

        fileName: file.name,

        // Required public key
        publicKey: auth.publicKey,

        // Authentication
        token: auth.token,

        signature: auth.signature,

        expire: auth.expire,

        onProgress: (event) => {
          if (event.lengthComputable) {
            const percentage = Math.round((event.loaded / event.total) * 100);

            setProgress(percentage);
          }
        },
      });

      console.log("Upload Successful:", response);
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" onChange={handleFileChange} />

      {uploading && <p>Uploading {progress}%</p>}
    </div>
  );
}
