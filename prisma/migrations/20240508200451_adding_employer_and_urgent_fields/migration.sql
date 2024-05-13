/*
  Warnings:

  - Added the required column `employer_logo_url` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employer_title` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "employer_logo_url" TEXT NOT NULL,
ADD COLUMN     "employer_title" TEXT NOT NULL,
ADD COLUMN     "urgent_hiring" BOOLEAN NOT NULL DEFAULT false;
