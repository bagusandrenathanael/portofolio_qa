import { getPortfolioContent } from "../../../lib/portfolio-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getPortfolioContent(), {
    headers: { "Cache-Control": "no-store" },
  });
}
