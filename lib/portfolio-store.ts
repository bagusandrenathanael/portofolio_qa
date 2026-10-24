import { getPrisma } from "./prisma";
import { defaultPortfolioContent, type PortfolioContent } from "./portfolio-content";
import { portfolioContentSchema } from "./content-schema";
import { Prisma } from "@prisma/client";

export async function getPortfolioContent(strict = false): Promise<PortfolioContent> {
  try {
    const row = await getPrisma().portfolioContent.findUnique({ where: { id: "main" } });
    if (!row) return defaultPortfolioContent;
    const parsed = portfolioContentSchema.safeParse(row.document);
    if (!parsed.success) throw new Error("Stored portfolio content is invalid.");
    return parsed.data;
  } catch {
    if (strict) throw new Error("Konten database tidak dapat dimuat. Periksa konfigurasi dan koneksi Turso.");
    return defaultPortfolioContent;
  }
}

export async function savePortfolioContent(content: PortfolioContent, userId: string) {
  const now = new Date().toISOString();
  await getPrisma().portfolioContent.upsert({
    where: { id: "main" },
    create: { id: "main", document: content as Prisma.InputJsonValue, updatedAt: new Date(now), updatedBy: userId },
    update: { document: content as Prisma.InputJsonValue, updatedAt: new Date(now), updatedBy: userId },
  });
  return now;
}
