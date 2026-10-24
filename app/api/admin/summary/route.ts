import { getAuthenticatedAdminUser } from "../../../../lib/admin-auth";
import { getPrisma } from "../../../../lib/prisma";
import { getPortfolioContent } from "../../../../lib/portfolio-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!await getAuthenticatedAdminUser()) return Response.json({ error: "Silakan masuk sebagai admin." }, { status: 401 });
  try {
    const [records, content] = await Promise.all([
      getPrisma().adminRecord.findMany({ orderBy: { updatedAt: "desc" }, take: 500 }),
      getPortfolioContent(true),
    ]);
    const cases = records.filter((row) => row.module === "test-case");
    const bugs = records.filter((row) => row.module === "bug-report");
    const automation = records.filter((row) => row.module === "automation");
    const passed = automation.filter((row) => /pass|complete|success/i.test(row.status)).length;
    const finished = automation.filter((row) => /pass|complete|success|fail/i.test(row.status)).length;
    const now = new Date();
    const trend = Array.from({ length: 8 }, (_, index) => {
      const start = new Date(now); start.setDate(now.getDate() - (7 - index) * 7); start.setHours(0, 0, 0, 0);
      const end = new Date(start); end.setDate(start.getDate() + 7);
      const weekCases = cases.filter((record) => record.createdAt >= start && record.createdAt < end);
      return { label: start.toLocaleDateString("en", { day: "numeric", month: "short" }), passed: weekCases.filter((row) => /pass/i.test(row.status)).length, failed: weekCases.filter((row) => /fail/i.test(row.status)).length };
    });
    return Response.json({
      stats: { projects: content.projects.filter((project) => project.isPublished).length, testCases: cases.length, bugReports: bugs.length, automationPassRate: finished ? Math.round((passed / finished) * 1000) / 10 : null },
      testCaseStatus: ["Passed", "Failed", "Blocked", "Not Run"].map((status) => ({ status, count: cases.filter((row) => row.status.toLowerCase() === status.toLowerCase()).length })),
      trend,
      recent: records.slice(0, 8).map(({ id, module, title, status, updatedAt }) => ({ id, module, title, status, updatedAt })),
      recentProjects: content.projects.filter((project) => project.isPublished).slice(-4).reverse().map(({ title, category, tools }) => ({ title, category, tools })),
    });
  } catch {
    return Response.json({ error: "Dashboard belum dapat memuat data. Jalankan migrasi database." }, { status: 503 });
  }
}
