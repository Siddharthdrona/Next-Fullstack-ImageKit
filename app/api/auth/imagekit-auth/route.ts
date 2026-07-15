import { getUploadAuthParams } from "@imagekit/next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const authParams = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  });

  return Response.json(authParams);
}