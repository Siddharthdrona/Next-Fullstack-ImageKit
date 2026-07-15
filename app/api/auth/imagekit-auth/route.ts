import { getUploadAuthParams } from "@imagekit/next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authParams = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    });

    return Response.json({
      ...authParams,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit Auth Error:", error);

    return Response.json(
      {
        error: "Failed to generate ImageKit authentication parameters",
      },
      {
        status: 500,
      },
    );
  }
}
