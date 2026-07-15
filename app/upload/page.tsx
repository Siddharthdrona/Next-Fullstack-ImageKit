import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import Header from "../components/Header";
import VideoUploadForm from "../components/VideoUploadForm";

export default async function UploadPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/upload");
  }

  return (
    <>
      <Header showThemeToggle={false} />

      <main className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900">
              Upload New Video
            </h1>

            <p className="mt-2 text-slate-600">
              Share your content securely using ImageKit.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <VideoUploadForm />
          </div>
        </div>
      </main>
    </>
  );
}
