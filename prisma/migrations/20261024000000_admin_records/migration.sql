CREATE TABLE "admin_record" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "module" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Draft',
  "priority" TEXT NOT NULL DEFAULT 'Normal',
  "data" JSONB NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);

CREATE INDEX "admin_record_module_updated_at_idx" ON "admin_record"("module", "updated_at");
