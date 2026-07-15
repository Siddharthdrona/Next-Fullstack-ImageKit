import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";

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

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">{video.title}</h1>

      <video
        src={`${process.env.NEXT_PUBLIC_URL_ENDPOINT}${video.videoUrl}`}
        controls
        className="w-full rounded-lg"
      />

      <p className="mt-6">{video.description}</p>
    </div>
  );
}
