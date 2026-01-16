/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress]` on the table `visitors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ipAddress` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "ipAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "visitors_ipAddress_key" ON "visitors"("ipAddress");
