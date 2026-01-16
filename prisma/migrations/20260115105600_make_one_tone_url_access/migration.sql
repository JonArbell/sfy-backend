/*
  Warnings:

  - You are about to drop the column `urlId` on the `url_access` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url_id]` on the table `url_access` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url_id` to the `url_access` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "url_access" DROP CONSTRAINT "url_access_urlId_fkey";

-- AlterTable
ALTER TABLE "url_access" DROP COLUMN "urlId",
ADD COLUMN     "url_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "url_access_url_id_key" ON "url_access"("url_id");

-- AddForeignKey
ALTER TABLE "url_access" ADD CONSTRAINT "url_access_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
