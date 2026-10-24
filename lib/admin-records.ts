export const adminModules = ["experience", "education", "project", "skill", "testimonial", "certification", "contact", "message", "test-case", "bug-report", "api-test", "automation", "performance", "evidence", "blog", "setting"] as const;

const relationPlans: Record<string, { field: string; relation: string; targetModule: string }[]> = {
  project: [{ field: "skillIds", relation: "project-skill", targetModule: "skill" }],
  experience: [
    { field: "skillIds", relation: "experience-skill", targetModule: "skill" },
    { field: "projectIds", relation: "experience-project", targetModule: "project" },
  ],
  evidence: [{ field: "projectIds", relation: "evidence-project", targetModule: "project" }],
};

export async function syncRecordRelations(tx: import("@prisma/client").Prisma.TransactionClient, id: string, module: string, data: Record<string, unknown>) {
  const plans = relationPlans[module] ?? [];
  for (const plan of plans) {
    const ids = Array.isArray(data[plan.field]) ? [...new Set((data[plan.field] as unknown[]).filter((value): value is string => typeof value === "string" && value.length > 0))] : [];
    if (ids.length > 200) throw new Error("Relasi melebihi batas 200 item.");
    if (ids.length) {
      const targets = await tx.adminRecord.findMany({ where: { id: { in: ids }, module: plan.targetModule }, select: { id: true } });
      if (targets.length !== ids.length) throw new Error("Ada pilihan relasi yang tidak valid.");
    }
    await tx.contentRelation.deleteMany({ where: { relation: plan.relation, sourceId: id } });
    if (ids.length) await tx.contentRelation.createMany({ data: ids.map((targetId) => ({ relation: plan.relation, sourceId: id, targetId })) });
  }
}
