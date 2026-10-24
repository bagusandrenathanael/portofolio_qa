CREATE TABLE "portfolio_content" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "document" JSONB NOT NULL,
  "updated_at" DATETIME NOT NULL,
  "updated_by" TEXT NOT NULL
);

CREATE TABLE "admin_session" (
  "token_hash" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "credential_version" TEXT NOT NULL,
  "expires_at" DATETIME NOT NULL
);
CREATE INDEX "admin_session_expires_at_idx" ON "admin_session"("expires_at");

CREATE TABLE "login_attempt" (
  "bucket" TEXT NOT NULL PRIMARY KEY,
  "count" INTEGER NOT NULL DEFAULT 0,
  "expires_at" DATETIME NOT NULL
);
CREATE INDEX "login_attempt_expires_at_idx" ON "login_attempt"("expires_at");
