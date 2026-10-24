CREATE TABLE "portfolio_content" (
    "id" TEXT NOT NULL,
    "document" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "portfolio_content_pkey" PRIMARY KEY ("id")
);
