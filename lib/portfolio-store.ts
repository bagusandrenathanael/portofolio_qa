import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { portfolioContent } from "../db/schema";
import { defaultPortfolioContent, type PortfolioContent } from "./portfolio-content";
import { portfolioContentSchema } from "./content-schema";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const [row] = await getDb().select().from(portfolioContent).where(eq(portfolioContent.id, "main")).limit(1);
    if (!row) return defaultPortfolioContent;
    const parsed = portfolioContentSchema.safeParse(JSON.parse(row.document));
    return parsed.success ? parsed.data : defaultPortfolioContent;
  } catch {
    return defaultPortfolioContent;
  }
}

export async function savePortfolioContent(content: PortfolioContent, userId: string) {
  const now = new Date().toISOString();
  await getDb().insert(portfolioContent).values({
    id: "main",
    document: JSON.stringify(content),
    updatedAt: now,
    updatedBy: userId,
  }).onConflictDoUpdate({
    target: portfolioContent.id,
    set: { document: JSON.stringify(content), updatedAt: now, updatedBy: userId },
  });
  return now;
}
