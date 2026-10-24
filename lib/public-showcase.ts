import { getPrisma } from "./prisma";

export type PublicQaRecord = {
  id: string;
  module: "test-case" | "bug-report" | "api-test" | "automation" | "performance";
  title: string;
  status: string;
  priority: string;
  project: string;
  details: Record<string, string>;
};

const publicModules = ["test-case", "bug-report", "api-test", "automation", "performance"] as const;
const stringValue = (value: unknown) => typeof value === "string" ? value.trim().slice(0, 500) : "";

/** Only explicitly opted-in records reach the public portfolio. Sensitive raw payloads and evidence are omitted. */
export async function getPublicQaShowcases(): Promise<PublicQaRecord[]> {
  try {
    const rows = await getPrisma().adminRecord.findMany({
      where: { module: { in: [...publicModules] } },
      orderBy: { updatedAt: "desc" },
      take: 250,
    });

    const orderedRows = rows.sort((a, b) => {
      const left = a.data && typeof a.data === "object" && !Array.isArray(a.data) ? a.data as Record<string, unknown> : {};
      const right = b.data && typeof b.data === "object" && !Array.isArray(b.data) ? b.data as Record<string, unknown> : {};
      return (Number(left.sortOrder) || 0) - (Number(right.sortOrder) || 0);
    });
    return orderedRows.flatMap((row) => {
      if (!publicModules.includes(row.module as typeof publicModules[number])) return [];
      const data = row.data && typeof row.data === "object" && !Array.isArray(row.data)
        ? row.data as Record<string, unknown>
        : {};
      if (data.showcase !== true && data.showcase !== "true") return [];
      if (data.visible === false || data.visible === "false") return [];

      const details: Record<string, string> = { project: stringValue(data.project) };
      if (row.module === "bug-report") {
        details.severity = stringValue(data.severity);
        details.environment = stringValue(data.environment);
      } else if (row.module === "api-test") {
        details.method = stringValue(data.method);
        details.endpoint = stringValue(data.endpoint);
        details.validation = stringValue(data.validation);
      } else if (row.module === "automation") {
        details.framework = stringValue(data.framework);
        details.repository = stringValue(data.repository);
      } else if (row.module === "performance") {
        details.scenario = stringValue(data.scenario);
        details.virtualUsers = stringValue(data.virtualUsers);
        details.responseTime = stringValue(data.responseTime);
        details.throughput = stringValue(data.throughput);
        details.errorRate = stringValue(data.errorRate);
      }

      return [{
        id: row.id,
        module: row.module as PublicQaRecord["module"],
        title: row.title,
        status: row.status,
        priority: row.priority,
        project: details.project,
        details,
      }];
    });
  } catch {
    // The public profile stays available even when the optional QA showcase database is offline.
    return [];
  }
}
