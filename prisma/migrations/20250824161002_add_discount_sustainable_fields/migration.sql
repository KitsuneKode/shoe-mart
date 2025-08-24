-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "isSustainable" BOOLEAN NOT NULL DEFAULT false;
