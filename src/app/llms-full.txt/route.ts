import { buildLlmsFullTxt } from "@/lib/llms";

// Same 5-minute freshness as the product pages it summarises.
export const revalidate = 300;

export async function GET() {
  return new Response(await buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
