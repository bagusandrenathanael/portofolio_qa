CREATE TABLE "content_relation" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "relation" TEXT NOT NULL,
  "source_id" TEXT NOT NULL,
  "target_id" TEXT NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "content_relation_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "admin_record" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "content_relation_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "admin_record" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "content_relation_relation_source_id_target_id_key" ON "content_relation"("relation", "source_id", "target_id");
CREATE INDEX "content_relation_target_id_relation_idx" ON "content_relation"("target_id", "relation");
