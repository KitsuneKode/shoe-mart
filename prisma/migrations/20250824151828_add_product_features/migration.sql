-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "colorCount" INTEGER,
ADD COLUMN     "isBestSeller" BOOLEAN NOT NULL DEFAULT false;
