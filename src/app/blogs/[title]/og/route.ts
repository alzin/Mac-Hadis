import { NextRequest } from "next/server";
import sharp from "sharp";

// services
import { getBlogByTitle } from "@/services/blogs";

// Node runtime is required for sharp (not Edge).
export const runtime = "nodejs";

interface IParams {
  params: Promise<{ title: string }>;
}

/**
 * Open Graph image route.
 *
 * Social crawlers (notably Facebook) reject blog cover images that ship with
 * an embedded ICC color profile, reporting them as "corrupt or invalid
 * format". This route fetches the original S3 image, strips all metadata /
 * ICC profile via sharp, resizes it to the standard 1200x630 social card,
 * and serves a clean baseline JPEG from an ASCII-safe mac-hadis.com URL.
 */
export async function GET(_req: NextRequest, { params }: IParams) {
  const { title } = await params;

  const data = await getBlogByTitle(title);
  if (!data?.imageSrc) {
    return new Response("Not found", { status: 404 });
  }

  // Normalize the URL so it is correctly percent-encoded whether the source
  // value is raw (contains Japanese characters) or already encoded.
  // NOTE: encodeURI alone is NOT idempotent — it re-encodes "%" into "%25",
  // double-encoding an already-encoded URL. Decoding first fixes both cases.
  let imageSrc = data.imageSrc;
  try {
    imageSrc = encodeURI(decodeURI(data.imageSrc));
  } catch {
    /* keep the original value if it cannot be decoded */
  }

  const upstream = await fetch(imageSrc);
  if (!upstream.ok) {
    return new Response("Upstream image error", { status: 502 });
  }

  const input = Buffer.from(await upstream.arrayBuffer());

  // sharp drops the ICC profile / EXIF metadata by default (no .withMetadata()).
  const output = await sharp(input)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, progressive: false, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(output), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
