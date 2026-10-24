import { getPortfolioContent } from "../../../lib/portfolio-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const { siteSettings, ...publicContent } = await getPortfolioContent();
  void siteSettings;
  return Response.json(publicContent, {
    headers: { "Cache-Control": "no-store" },
  });
}
