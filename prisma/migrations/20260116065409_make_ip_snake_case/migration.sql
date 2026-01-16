/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `visitors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ip_address]` on the table `visitors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "visitors_ipAddress_key";

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "ipAddress",
ADD COLUMN     "ip_address" TEXT NOT NULL DEFAULT 'unknown';

-- CreateIndex
CREATE UNIQUE INDEX "visitors_ip_address_key" ON "visitors"("ip_address");
