import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const portfolioContent = sqliteTable("portfolio_content", {
  id: text("id").primaryKey(),
  document: text("document").notNull(),
  updatedAt: text("updated_at").notNull(),
  updatedBy: text("updated_by").notNull(),
});
