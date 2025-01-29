import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Ensure environment variables are properly set
if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
  throw new Error("Missing ImageKit environment variables.");
}

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

// Handle GET request to provide ImageKit authentication parameters
export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error: any) {
    console.error("ImageKit Authentication Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
