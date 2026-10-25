import { getPrisma } from "./prisma";

const modules = ["project", "experience", "education", "skill", "testimonial", "certification", "contact", "blog", "evidence"] as const;
export type PublicContentModule = typeof modules[number];
export type PublicContentRecord = { id: string; module: PublicContentModule; title: string; data: Record<string, unknown>; skillIds: string[]; projectIds: string[] };

/** Only published, explicitly visible structured content is returned to public routes. */
export async function getPublicContentRecords(): Promise<PublicContentRecord[]> {
  try {
    const rows = await getPrisma().adminRecord.findMany({
      where: { module: { in: [...modules] }, status: "Published" },
      orderBy: [{ updatedAt: "desc" }],
      take: 500,
      include: { relationsFrom: { include: { target: true } } },
    });
    return rows.flatMap((row) => {
      if (!modules.includes(row.module as PublicContentModule)) return [];
      const raw = row.data && typeof row.data === "object" && !Array.isArray(row.data) ? row.data as Record<string, unknown> : {};
      if (raw.visible !== true && raw.visible !== "true") return [];
      const allowed = new Set([
        "slug", "summary", "summaryEn", "description", "descriptionEn", "context", "contextEn", "strategy", "strategyEn", "result", "resultEn", "titleEn", "thumbnail", "gallery", "category", "categoryEn", "tags", "demoUrl", "repoUrl", "date", "featured", "sortOrder", "company", "role", "startDate", "endDate", "current", "logo", "institution", "degree", "startYear", "endYear", "level", "icon", "name", "position", "photo", "quote", "sourceUrl", "issuer", "issuedAt", "credentialUrl", "image", "platform", "url", "readTime", "readTimeEn", "excerpt", "excerptEn", "body", "bodyEn", "before", "after", "notes", "seoTitle", "seoDescription",
      ]);
      const data = Object.fromEntries(Object.entries(raw).filter(([key, value]) => allowed.has(key) && (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || (Array.isArray(value) && value.every((item) => typeof item === "string")))));
      const skillIds = row.relationsFrom.flatMap((relation) => {
        const target = relation.target;
        if (!relation.relation.endsWith("-skill") || target.module !== "skill" || target.status !== "Published") return [];
        const targetData = target.data && typeof target.data === "object" && !Array.isArray(target.data) ? target.data as Record<string, unknown> : {};
        return targetData.visible === true || targetData.visible === "true" ? [target.id] : [];
      });
      const projectIds = row.relationsFrom.flatMap((relation) => {
        const target = relation.target;
        if (!relation.relation.endsWith("-project") || target.module !== "project" || target.status !== "Published") return [];
        const targetData = target.data && typeof target.data === "object" && !Array.isArray(target.data) ? target.data as Record<string, unknown> : {};
        return targetData.visible === true || targetData.visible === "true" ? [target.id] : [];
      });
      return [{ id: row.id, module: row.module as PublicContentModule, title: row.title, data, skillIds, projectIds }];
    });
  } catch {
    return [];
  }
}
